import { useState } from 'react'
import './App.css'
import { Box, Button, CircularProgress, Container, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography, Paper, ThemeProvider, createTheme } from '@mui/material';
import axios from 'axios';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const theme = createTheme({
  palette: {
    primary: {
      main: '#334155',
    },
    secondary: {
      main: '#475569',
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
      const response = await axios.post("https://gemini-email-assistant.onrender.com/api/email/generate", {
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
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #edeee1ff 0%, #edeee1ff 100%)',
        py: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(180deg, #a78f54ff 0%, transparent 100%)',
          zIndex: 0
        }
      }}>
        <Container maxWidth="md" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
          <Paper elevation={8} sx={{ 
            p: 4, 
            borderRadius: 4,
            background: 'linear-gradient(to bottom, #ffffff, #f8fafc)',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: 'linear-gradient(90deg, #cbf900ff, #475569)',
            }
          }}>
            <Typography 
              variant='h3' 
              component="h1" 
              gutterBottom
              sx={{
                textAlign: 'center',
                color: '#3d3d3aec',
                fontWeight: 700,
                mb: 4,
                letterSpacing: '-0.5px',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #334155, #475569)',
                  borderRadius: '2px'
                }
              }}>
              Email Reply Generator
            </Typography>

            <Box sx={{ 
              mx: 2,
              '& .MuiTextField-root, & .MuiFormControl-root': {
                background: '#ffffff',
                borderRadius: 2,
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)'
                }
              }
            }}>
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
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(90deg, #3d3d3aec, #475569)',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 8px -1px rgb(0 0 0 / 0.2)',
                  }
                }}>
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CircularProgress 
                      size={24} 
                      color="inherit" 
                      sx={{
                        animation: 'pulse 1.5s ease-in-out infinite',
                        '@keyframes pulse': {
                          '0%': { opacity: 0.6 },
                          '50%': { opacity: 1 },
                          '100%': { opacity: 0.6 }
                        }
                      }}
                    />
                    <Typography>Generating...</Typography>
                  </Box>
                ) : "Generate Reply"}
              </Button>
            </Box>

            {error && (
              <Typography 
                color='error' 
                sx={{ 
                  mt: 2,
                  textAlign: 'center',
                  fontWeight: 500,
                  background: '#fee2e2',
                  py: 1,
                  px: 2,
                  borderRadius: 1
                }}>
                {error}
              </Typography>
            )}

            {generatedReply && (
              <Paper 
                elevation={3} 
                sx={{ 
                  mt: 4, 
                  p: 3,
                  background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)',
                  borderRadius: 3,
                  border: '1px solid rgba(51, 65, 85, 0.1)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(180deg, #334155, #475569)',
                    borderRadius: '4px 0 0 4px'
                  }
                }}>
                <Typography 
                  variant='h6' 
                  gutterBottom
                  sx={{
                    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: 600,
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
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(59, 130, 246, 0.5)',
                      }
                    }
                  }}/>
                
                <Button
                  variant='outlined'
                  startIcon={<ContentCopyIcon />}
                  sx={{ 
                    mt: 2,
                    px: 4,
                    py: 1,
                    borderColor: '#334155',
                    color: '#334155',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #334155, #475569)',
                      color: 'white',
                      borderColor: 'transparent',
                      transform: 'translateY(-2px)'
                    }
                  }}
                  onClick={() => navigator.clipboard.writeText(generatedReply)}>
                  Copy to Clipboard
                </Button>
              </Paper>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App