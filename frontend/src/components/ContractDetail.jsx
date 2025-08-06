import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  List,
  ListItem,
  Divider,
} from '@chakra-ui/react';
import WorkSubmissionForm from './WorkSubmissionForm.jsx';
import InvoiceForm from './InvoiceForm.jsx';
import '../styles/ContractDetail.css';

export default function ContractDetail({
  contract,
  proposals = [],
  invoices = [],
  workSubmissions = [],
  onSubmitWork,
  onSubmitInvoice,
  onApproveWork,
  onTerminate,
}) {
  if (!contract) {
    return <Box className="contract-detail" p={4}>Select a contract to view details.</Box>;
  }

  return (
    <Box className="contract-detail" borderWidth="1px" borderRadius="md" p={4}>
      <Heading size="md" mb={2}>{contract.title}</Heading>
      <Text mb={2}>{contract.description}</Text>
      <Text mb={4}>Status: {contract.status}</Text>

      {contract.milestones?.length > 0 && (
        <Box mb={4}>
          <Heading size="sm">Milestones</Heading>
          <List spacing={1} mt={2}>
            {contract.milestones.map((m) => (
              <ListItem key={m.id}>
                {m.title} {m.amount ? `- $${m.amount}` : ''} {m.dueDate ? `- ${new Date(m.dueDate).toLocaleDateString()}` : ''}
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {proposals.length > 0 && (
        <Box mb={4}>
          <Heading size="sm">Proposals</Heading>
          <List spacing={1} mt={2}>
            {proposals.map((p) => (
              <ListItem key={p.id}>
                {p.freelancerId} - {p.status}
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {workSubmissions.length > 0 && (
        <Box mb={4}>
          <Heading size="sm">Work Submissions</Heading>
          <List spacing={1} mt={2}>
            {workSubmissions.map((s) => (
              <ListItem key={s.id}>
                <a href={s.workUrl} target="_blank" rel="noopener noreferrer">{s.workUrl}</a> - {s.status}
                {s.status === 'submitted' && onApproveWork && (
                  <Button ml={2} size="xs" colorScheme="green" onClick={() => onApproveWork(contract.id, s.id)}>
                    Approve
                  </Button>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {onSubmitWork && <WorkSubmissionForm onSubmit={(form) => onSubmitWork(contract.id, form)} />}

      {invoices.length > 0 && (
        <Box mt={4}>
          <Heading size="sm">Invoices</Heading>
          <List spacing={1} mt={2}>
            {invoices.map((inv) => (
              <ListItem key={inv.id}>
                ${inv.amount} - {inv.status}
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {onSubmitInvoice && <InvoiceForm onSubmit={(form) => onSubmitInvoice(contract.id, form)} />}

      <Divider my={4} />
      <Button mt={2} colorScheme="red" size="sm" onClick={() => onTerminate(contract.id)}>
        Terminate
      </Button>
    </Box>
  );
}
