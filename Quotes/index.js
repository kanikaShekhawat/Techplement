const express = require('express');
const cors = require('cors'); // Import cors package
const app = express();
const quoteRoutes = require('./routes/routes');
const dbconnect = require('./config/database');
require('dotenv').config();

dbconnect();

const PORT = process.env.PORT || 6000;


app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json());

app.use('/api/quotes', quoteRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
    res.send(`<h1>This is</h1>`);
});
