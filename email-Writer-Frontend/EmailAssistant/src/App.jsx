
import { useState } from 'react'
import './App.css'

function App() {
  const [emailContent, SetEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  return (
    <Container maxWidth>

    </Container>

  )
}

export default App
