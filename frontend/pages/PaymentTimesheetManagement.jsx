import { ChakraProvider, Box, Heading, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NavMenu from '../components/NavMenu';
import TimesheetForm from '../components/TimesheetForm';
import TimesheetTable from '../components/TimesheetTable';
import PaymentHistory from '../components/PaymentHistory';
import { fetchPayments } from '../api/payments';
import { fetchTimesheets, logTimesheet } from '../api/timesheets';
import '../styles/PaymentTimesheetManagement.css';

export default function PaymentTimesheetManagement({ agencyId }) {
  const [payments, setPayments] = useState([]);
  const [timesheets, setTimesheets] = useState([]);
  const toast = useToast();

  const loadData = async () => {
    try {
      const [p, t] = await Promise.all([
        fetchPayments(agencyId),
        fetchTimesheets(agencyId),
      ]);
      setPayments(p);
      setTimesheets(t);
    } catch (err) {
      toast({ title: 'Failed to load data', status: 'error' });
    }
  };

  useEffect(() => {
    loadData();
  }, [agencyId]);

  const handleLog = async (form) => {
    try {
      await logTimesheet(agencyId, form);
      toast({ title: 'Timesheet logged', status: 'success' });
      loadData();
    } catch (err) {
      toast({ title: 'Failed to log timesheet', status: 'error' });
    }
  };

  return (
    <ChakraProvider>
      <NavMenu />
      <Box p={4} className="payment-timesheet-page">
        <Heading mb={4}>Payments & Timesheets</Heading>
        <TimesheetForm onSubmit={handleLog} />
        <TimesheetTable timesheets={timesheets} />
        <PaymentHistory payments={payments} />
      </Box>
    </ChakraProvider>
  );
}
