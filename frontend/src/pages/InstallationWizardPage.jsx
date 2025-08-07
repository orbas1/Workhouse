import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepNumber,
  StepIcon,
  StepTitle,
  StepSeparator,
  Flex,
  Text,
  List,
  ListItem,
  ListIcon,
  Select,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import {
  getInstallStatus,
  runInstallation,
  checkDatabaseConnection,
  checkPermissions,
} from '../api/install.js';
import { useInstall } from '../context/InstallContext.jsx';
import '../styles/InstallationWizardPage.css';

export default function InstallationWizardPage() {
  const [status, setStatus] = useState(null);
  const [step, setStep] = useState(0);
  const [dbConfig, setDbConfig] = useState({ type: 'postgres', host: '', port: '', user: '', password: '', name: '' });
  const [admin, setAdmin] = useState({ username: '', email: '', password: '' });
  const defaultUrl = typeof window !== 'undefined' && window.env?.APP_URL
    ? window.env.APP_URL
    : window.location.origin;
  const [site, setSite] = useState({ name: '', url: defaultUrl });
  const [permissions, setPermissions] = useState(null);
  const [error, setError] = useState('');
  const [dbCheck, setDbCheck] = useState(null);
  const { refresh } = useInstall();
  const navigate = useNavigate();

  const errorSuggestions = {
    'Admin user already exists': 'Try a different username.',
    'Admin username and password are required': 'Fill in all admin fields.',
  };

  useEffect(() => {
    getInstallStatus()
      .then(setStatus)
      .catch(() => setStatus({ installed: false }));
    checkPermissions()
      .then(setPermissions)
      .catch(() => setPermissions({ ok: false, details: [] }));
  }, []);

  if (status?.installed) {
    return (
      <Box p={6}>
        <Alert status="success">
          <AlertIcon />Application already installed.
        </Alert>
      </Box>
    );
  }

  const validateStep = () => {
    switch (step) {
      case 0:
        // allow moving past the permissions check once it has completed
        return permissions !== null;
      case 1:
        return site.name && site.url;
      case 2:
        return dbConfig.host && dbConfig.user && dbConfig.name;
      case 3:
        return admin.username && admin.email && admin.password;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    setError('');
    if (!validateStep()) {
      setError('Please fill out all required fields.');
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      try {
        await runInstallation({ dbConfig, admin, site });
        await refresh();
        setStep(4);
      } catch (e) {
        const msg = e.response?.data?.error || e.message;
        setError(msg);
      }
    } else {
      navigate('/');
    }
  };

  const handleBack = () => {
    setError('');
    if (step > 0) setStep(step - 1);
  };

  const handleCheckDb = async () => {
    setDbCheck(null);
    setError('');
    try {
      await checkDatabaseConnection(dbConfig);
      setDbCheck('Connection successful!');
    } catch (e) {
      const msg = e.response?.data?.error || e.message;
      setDbCheck(null);
      setError(msg);
    }
  };

  const steps = [
    { title: 'Permissions' },
    { title: 'Site' },
    { title: 'Database' },
    { title: 'Admin' },
    { title: 'Server' },
  ];

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            {permissions ? (
              <>
                {!permissions.ok && (
                  <Alert status="warning" mb={4}>
                    <AlertIcon />
                    Some paths are not writable. Adjust file permissions before continuing.
                  </Alert>
                )}
                <Text mb={2}>Ensure these paths are writable:</Text>
                {permissions.details && permissions.details.length > 0 ? (
                  <List spacing={2}>
                    {permissions.details.map((p, idx) => (
                      <ListItem key={idx} color={p.writable ? 'green.600' : 'red.600'}>
                        <ListIcon as={p.writable ? CheckCircleIcon : WarningIcon} />
                        {p.path}
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Text>No permission details available.</Text>
                )}
              </>
            ) : (
              <Text>Checking permissions...</Text>
            )}
          </>
        );
      case 1:
        return (
          <>
            <FormControl isRequired>
              <FormLabel>Site Name</FormLabel>
              <Input value={site.name} onChange={e => setSite({ ...site, name: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Site URL</FormLabel>
              <Input value={site.url} onChange={e => setSite({ ...site, url: e.target.value })} />
            </FormControl>
          </>
        );
      case 2:
        return (
          <>
            <FormControl isRequired>
              <FormLabel>Database Type</FormLabel>
              <Select value={dbConfig.type} onChange={e => setDbConfig({ ...dbConfig, type: e.target.value })}>
                <option value="postgres">PostgreSQL</option>
                <option value="mysql">MySQL</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Database Host</FormLabel>
              <Input value={dbConfig.host} onChange={e => setDbConfig({ ...dbConfig, host: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Database Port</FormLabel>
              <Input value={dbConfig.port} onChange={e => setDbConfig({ ...dbConfig, port: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Database User</FormLabel>
              <Input value={dbConfig.user} onChange={e => setDbConfig({ ...dbConfig, user: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Database Password</FormLabel>
              <Input type="password" value={dbConfig.password} onChange={e => setDbConfig({ ...dbConfig, password: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Database Name</FormLabel>
              <Input value={dbConfig.name} onChange={e => setDbConfig({ ...dbConfig, name: e.target.value })} />
            </FormControl>
            <Button mt={4} colorScheme="blue" onClick={handleCheckDb}>
              Check Connection
            </Button>
            {dbCheck && (
              <Alert status="success" mt={4}>
                <AlertIcon />
                {dbCheck}
              </Alert>
            )}
          </>
        );
      case 3:
        return (
          <>
            <FormControl isRequired>
              <FormLabel>Admin Username</FormLabel>
              <Input value={admin.username} onChange={e => setAdmin({ ...admin, username: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Admin Email</FormLabel>
              <Input value={admin.email} onChange={e => setAdmin({ ...admin, email: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Admin Password</FormLabel>
              <Input type="password" value={admin.password} onChange={e => setAdmin({ ...admin, password: e.target.value })} />
            </FormControl>
          </>
        );
      case 4: {
        const port = window.location.port || '3000';
        let domain = site.url;
        try {
          domain = new URL(site.url).hostname;
        } catch (e) {
          // ignore
        }
        return (
          <>
            <Text mb={2}>Installation complete! Configure your web server using the examples below.</Text>
            <Text fontWeight="bold" mt={2}>Nginx</Text>
            <Box as="pre" bg="gray.50" p={4} fontSize="sm" overflowX="auto">
              {`server {
  listen 80;
  server_name ${domain};

  location / {
    proxy_pass http://localhost:${port};
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}`}
            </Box>
            <Text fontWeight="bold" mt={4}>Apache</Text>
            <Box as="pre" bg="gray.50" p={4} fontSize="sm" overflowX="auto">
              {`<VirtualHost *:80>
  ServerName ${domain}
  ProxyPreserveHost On
  ProxyPass / http://localhost:${port}/
  ProxyPassReverse / http://localhost:${port}/
</VirtualHost>`}
            </Box>
            <Text mt={4} fontSize="sm">Sample configs are also available in <code>config/</code> for later reference.</Text>
          </>
        );
      }
      default:
        return null;
    }
  };

  const suggestion = errorSuggestions[error] || '';

  return (
    <Box className="installation-wizard" p={6} bgGradient="linear(to-r, blue.50, blue.100)" borderWidth="1px" borderColor="blue.200" borderRadius="md" shadow="md">
      <Heading mb={6} color="blue.700">
        Workhouse Setup Wizard
      </Heading>
      <Stepper index={step} colorScheme="blue" mb={6}>
        {steps.map((s, idx) => (
          <Step key={idx}>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{s.title}</StepTitle>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          <Box>
            <Text>{error}</Text>
            {suggestion && <Text mt={1} fontSize="sm">{suggestion}</Text>}
          </Box>
        </Alert>
      )}
      <VStack spacing={4} align="stretch">
        {renderStep()}
      </VStack>
      <Flex mt={6} justify="space-between">
        <Button onClick={handleBack} isDisabled={step === 0} colorScheme="blue" variant="outline">
          Back
        </Button>
        <Button colorScheme="blue" onClick={handleNext} isDisabled={!validateStep()}>
          {step < 3 ? 'Next' : step === 3 ? 'Finish' : 'Go to site'}
        </Button>
      </Flex>
    </Box>
  );
}
