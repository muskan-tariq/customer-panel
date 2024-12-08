import { Container, Typography, Paper, Box, Divider } from '@mui/material';
import { Security, DataUsage, Lock, Shield } from '@mui/icons-material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#303030', mb: 4, textAlign: 'center' }}>
          Privacy Policy
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <DataUsage sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              Information We Collect
            </Typography>
          </Box>
          <Typography paragraph>
            We collect the following types of information:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Name and contact information</li>
            <li>Shipping and billing addresses</li>
            <li>Payment information</li>
            <li>Shopping preferences and history</li>
            <li>Device and browser information</li>
          </ul>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Lock sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              How We Use Your Information
            </Typography>
          </Box>
          <Typography paragraph>
            Your information helps us to:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Process and fulfill your orders</li>
            <li>Provide customer support</li>
            <li>Send order updates and notifications</li>
            <li>Improve our products and services</li>
            <li>Personalize your shopping experience</li>
          </ul>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Security sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              Data Security
            </Typography>
          </Box>
          <Typography paragraph>
            We protect your data through:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Secure SSL encryption</li>
            <li>Regular security audits</li>
            <li>Limited access to personal information</li>
            <li>Secure payment processing</li>
          </ul>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Shield sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              Your Rights
            </Typography>
          </Box>
          <Typography paragraph>
            You have the right to:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Access your personal data</li>
            <li>Request data correction or deletion</li>
            <li>Opt-out of marketing communications</li>
            <li>Request data portability</li>
          </ul>
        </Box>

        <Box sx={{ mt: 6, p: 3, bgcolor: '#fafafa', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ color: '#303030', fontWeight: 500, mb: 2 }}>
            Updates to Privacy Policy:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We may update this privacy policy from time to time. Any changes will be posted on this page with a revised effective date. Please review this policy periodically to stay informed about how we protect your personal information.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy; 