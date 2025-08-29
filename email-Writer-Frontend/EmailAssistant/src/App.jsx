import { useState } from 'react'
import './App.css'
import { Box, Button, CircularProgress, Container, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography, Paper, ThemeProvider, createTheme } from '@mui/material';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
       emailContent,
       tone 
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate eamil reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

    return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography 
            variant='h3' 
            component="h1" 
            gutterBottom
            sx={{
              textAlign: 'center',
              color: 'primary.main',
              fontWeight: 600,
              mb: 4
            }}>
            Email Reply Generator
          </Typography>

          <Box sx={{ mx: 2 }}>
            <TextField 
              fullWidth
              multiline
              rows={6}
              variant='outlined'
              label="Original Email Content"
              value={emailContent || ''}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                }
              }}/>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Tone (Optional)</InputLabel>
              <Select
                value={tone || ''}
                label="Tone (Optional)"
                onChange={(e) => setTone(e.target.value)}
                sx={{
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                }}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant='contained'
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              fullWidth
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 500,
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                }
              }}>
              {loading ? <CircularProgress size={24} color="inherit"/> : "Generate Reply"}
            </Button>
          </Box>

          {error && (
            <Typography 
              color='error' 
              sx={{ 
                mt: 2,
                textAlign: 'center',
                fontWeight: 500
              }}>
              {error}
            </Typography>
          )}

          {generatedReply && (
            <Paper 
              elevation={2} 
              sx={{ 
                mt: 4, 
                p: 3,
                backgroundColor: '#f8f9fa'
              }}>
              <Typography 
                variant='h6' 
                gutterBottom
                sx={{
                  color: 'primary.main',
                  fontWeight: 500,
                  mb: 2
                }}>
                Generated Reply:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant='outlined'
                value={generatedReply || ''}
                inputProps={{ readOnly: true }}
                sx={{
                  backgroundColor: '#ffffff',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.12)',
                    },
                  }
                }}/>
              
              <Button
                variant='outlined'
                startIcon={<ContentCopyIcon />}
                sx={{ 
                  mt: 2,
                  px: 3,
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  }
                }}
                onClick={() => navigator.clipboard.writeText(generatedReply)}>
                Copy to Clipboard
              </Button>
            </Paper>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default App