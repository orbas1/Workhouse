import React, { useEffect, useState } from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import ContractCard from '../components/ContractCard.jsx';
import ContractDetail from '../components/ContractDetail.jsx';
import { getContracts, getContract, terminateContract } from '../api/contracts.js';
import '../styles/ContractManagementPage.css';

export default function ContractManagementPage() {
  const [contracts, setContracts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getContracts();
        setContracts(data);
      } catch (err) {
        console.error('Failed to load contracts', err);
      }
    }
    load();
  }, []);

  async function handleSelect(id) {
    try {
      const data = await getContract(id);
      setSelected(data);
    } catch (err) {
      console.error('Failed to fetch contract', err);
    }
  }

  async function handleTerminate(id) {
    try {
      await terminateContract(id, 'User terminated');
      const data = await getContracts();
      setContracts(data);
      setSelected(null);
    } catch (err) {
      console.error('Failed to terminate contract', err);
    }
  }

  return (
    <Flex className="contract-management" p={4} wrap="wrap">
      <Box flex="1" minW="300px" mr={4}>
        <Heading size="md" mb={4}>Contracts</Heading>
        {contracts.map((c) => (
          <ContractCard key={c.id} contract={c} onSelect={handleSelect} />
        ))}
      </Box>
      <Box flex="2" minW="300px">
        <ContractDetail contract={selected} onTerminate={handleTerminate} />
      </Box>
    </Flex>
  );
}
