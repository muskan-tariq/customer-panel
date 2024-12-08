import { Container, Typography, Paper, Box, Divider } from '@mui/material';
import { Gavel, AccountBalance, Warning, Info } from '@mui/icons-material';

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#303030', mb: 4, textAlign: 'center' }}>
          Terms of Service
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Gavel sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              Agreement to Terms
            </Typography>
          </Box>
          <Typography paragraph>
            By accessing or using Tuffy Beauty's services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <AccountBalance sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              Use of Services
            </Typography>
          </Box>
          <Typography paragraph>
            When using our services, you agree to:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Not use the service for any illegal purposes</li>
            <li>Not violate any intellectual property rights</li>
            <li>Not distribute malicious content</li>
          </ul>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Warning sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              Limitations and Liabilities
            </Typography>
          </Box>
          <Typography paragraph>
            Tuffy Beauty shall not be liable for:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Indirect or consequential damages</li>
            <li>Loss of data or profits</li>
            <li>Service interruptions</li>
            <li>Third-party actions</li>
          </ul>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Info sx={{ color: '#FF66C4' }} />
            <Typography variant="h6" sx={{ color: '#303030' }}>
              Changes to Terms
            </Typography>
          </Box>
          <Typography paragraph>
            We reserve the right to:
          </Typography>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Modify or replace these terms at any time</li>
            <li>Change or discontinue services</li>
            <li>Restrict access to certain features</li>
            <li>Limit service availability</li>
          </ul>
        </Box>

        <Box sx={{ mt: 6, p: 3, bgcolor: '#fafafa', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ color: '#303030', fontWeight: 500, mb: 2 }}>
            Contact:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            If you have any questions about these Terms of Service, please contact us at support@tuffybeauty.com
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsOfService; 