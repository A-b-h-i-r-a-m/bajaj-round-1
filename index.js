const express= require('express');
const cors = require('cors');
const PORT = 4000;
const app=express();

app.use(cors({
    origin: 'http://localhost:5173' // or the URL where your frontend is hosted
  }));
app.use(express.json());

app.post('/bfhl', async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body

    const { data } = req.body;

    // Check if data is an array
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Data must be an array' });
    }

    const numbers = data.filter(x => !isNaN(x));
    const alphabets = data.filter(x => isNaN(x) && typeof x === 'string' && x.length === 1);
    alphabets.sort();
    let highest_alphabet = alphabets[alphabets.length - 1];

    const response = {
        is_success: true,
        user_id: "Rallabhandi_V_S_L_Abhiram_01042004",
        email: "abhiram_r@srmap.edu.in",
        roll_number: "AP21110010120",
        numbers: (numbers.length > 0) ? numbers : [],
        alphabets: (alphabets.length > 0) ? alphabets : [],
        highest_alphabet: (alphabets.length > 0) ? highest_alphabet : []
    };
    
    res.status(200).json(response);
});

app.get('/bfhl',(req,res) => {
    res.status(200).json({operation_code: 1});
});

app.use(express.static(path.join(__dirname, '../frontend/build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT,() => {
    console.log(`Server running at port: ${PORT}`);
});