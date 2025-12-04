import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000; 


// server static fules from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// basic routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'venu.html'));
});

// Start Server 
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    
})