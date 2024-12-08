import { Container, Typography, Paper, Box, Divider } from '@mui/material';
import { LocalShipping, Schedule, Payment, Info } from '@mui/icons-material';

const ShippingPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#303030', mb: 4, textAlign: 'center' }}>
          Shipping Policy
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <LocalShipping sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              Shipping Methods
            </Typography>
          </Box>
          <Typography paragraph>
            We offer the following shipping options:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Standard Shipping (5-7 business days)</li>
            <li>Express Shipping (2-3 business days)</li>
            <li>Next Day Delivery (order before 2 PM)</li>
            <li>International Shipping (10-15 business days)</li>
          </ul>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Schedule sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              Processing Time
            </Typography>
          </Box>
          <Typography paragraph>
            Order processing information:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Orders are processed within 24-48 hours</li>
            <li>Orders placed on weekends process on Monday</li>
            <li>Holiday periods may have longer processing times</li>
            <li>You'll receive tracking information via email</li>
          </ul>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Payment sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              Shipping Costs
            </Typography>
          </Box>
          <Typography paragraph>
            Our shipping rates:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Free shipping on orders over $50 (domestic)</li>
            <li>Standard Shipping: $5.99</li>
            <li>Express Shipping: $12.99</li>
            <li>Next Day Delivery: $19.99</li>
          </ul>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Info sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              Additional Information
            </Typography>
          </Box>
          <Typography paragraph>
            Important shipping details:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Tracking numbers are provided for all orders</li>
            <li>We ship to all 50 US states and select countries</li>
            <li>PO boxes and military addresses are accepted</li>
            <li>Signature may be required for high-value orders</li>
          </ul>
        </Box>

        <Box sx={{ mt: 6, p: 3, bgcolor: '#fafafa', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ color: '#303030', fontWeight: 500, mb: 2 }}>
            Contact Us:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            If you have any questions about shipping, please contact our customer support team through the chat or email us at support@tuffybeauty.com
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ShippingPolicy; 