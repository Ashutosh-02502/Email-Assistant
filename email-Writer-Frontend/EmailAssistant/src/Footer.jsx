import { Box, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        p: 1.2,
        background: 'linear-gradient(135deg, #edeee1ff 0%, #edeee1ff 100%)',
        boxShadow: '0 -2px 4px -1px rgb(0 0 0 / 0.1)', 
        zIndex: 1000,
        '& .MuiTypography-root': {
          fontSize: '0.9rem'
        }
      }}
    >
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"  // Add this property
        sx={{ 
          px: 2,
          fontWeight: 500  // Optional: make it slightly bolder
        }}
      >
        To download and set up the extension, follow these steps:
      </Typography>

      <Box sx={{ px: 4, mt: 1 }}>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          <strong>1. Download the Extension</strong><br />
          <Link
            href="https://github.com/Ashutosh-02502/Email-Assistant/tree/main/email-writer-Extention"
            target="_blank"
            rel="noopener"
            sx={{
              color: '#3b82f6',
              textDecoration: 'underline',
              '&:hover': { color: '#1e40af' }
            }}
          >
            Click here
          </Link>
          {' '}to access the GitHub repository → Download the email-writer-Extension folder.
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 1 }}>
          <strong>2. Add Extension to Chrome</strong><br />
          Open Chrome and go to{' '}
          <Link
            href="chrome://extensions"
            sx={{
              color: '#3b82f6',
              textDecoration: 'underline',
              '&:hover': { color: '#1e40af' }
            }}
          >
            chrome://extensions
          </Link>
          {' '}→ Enable Developer Mode (top-right corner) → Click on Load Unpacked, navigate to the email-writer-Extension folder, select it, and import.
        </Typography>

        <Typography color="text.secondary">
          <strong>3. Use the Extension in Gmail</strong><br />
          Open{' '}
          <Link
            href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
            target="_blank"
            rel="noopener"
            sx={{
              color: '#3b82f6',
              textDecoration: 'underline',
              '&:hover': { color: '#1e40af' }
            }}
          >
            Gmail
          </Link>
          {' '}→ While composing an email, try{' '}
          <span style={{ 
            backgroundColor: '#8d9fcfff',
            padding: '0 4px',
            borderRadius: '4px'
          }}>
            AI Reply
          </span>.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;