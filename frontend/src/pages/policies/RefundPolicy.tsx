import { Container, Typography, Paper, Box, Divider } from '@mui/material';
import { AssignmentReturn, Timer, Payment, Security } from '@mui/icons-material';

const RefundPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#303030', mb: 4, textAlign: 'center' }}>
          Refund Policy
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <AssignmentReturn sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              Return Eligibility
            </Typography>
          </Box>
          <Typography paragraph>
            Items are eligible for return within 30 days of delivery if:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Product is unused and in original packaging</li>
            <li>Seal is unbroken (for skincare products)</li>
            <li>Product is defective or damaged upon arrival</li>
            <li>Wrong item was received</li>
          </ul>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Timer sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              Refund Process
            </Typography>
          </Box>
          <Typography paragraph>
            Once we receive your return:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li>We will inspect the item within 24-48 hours</li>
            <li>You will be notified of the refund status</li>
            <li>Approved refunds will be processed within 3-5 business days</li>
            <li>Original shipping fees are non-refundable</li>
          </ul>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Payment sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              Refund Methods
            </Typography>
          </Box>
          <Typography paragraph>
            Refunds will be issued to the original payment method:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Credit/Debit card refunds: 5-7 business days</li>
            <li>Bank transfers: 3-5 business days</li>
            <li>Store credit: Immediate</li>
            <li>Digital wallet refunds: 1-2 business days</li>
          </ul>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Security sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              Non-Returnable Items
            </Typography>
          </Box>
          <Typography paragraph>
            The following items cannot be returned:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Opened or used skincare products</li>
            <li>Sale or clearance items</li>
            <li>Bundle items (unless entire bundle is returned)</li>
            <li>Gift cards</li>
          </ul>
        </Box>

        <Box sx={{ mt: 6, p: 3, bgcolor: '#fafafa', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ color: '#303030', fontWeight: 500, mb: 2 }}>
            Contact Us:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            If you have any questions about our refund policy, please contact our customer support team through the chat or email us at support@tuffybeauty.com
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RefundPolicy; 