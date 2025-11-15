const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// POST endpoint for form submission
app.post('/post', (req, res) => {
  const { title, body } = req.body;
  
  // Validate input
  if (!title || !body) {
    return res.status(400).json({ 
      success: false, 
      message: 'Title and body are required' 
    });
  }
  
  // Log the received data (in a real app, you'd save to database)
  console.log('Received post:', { title, body });
  
  // Return success response
  res.status(200).json({ 
    success: true, 
    message: 'Post submitted successfully!',
    data: { title, body }
  });
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

