const express = require('express');
const cors = require('cors');
require('./db/connection');
const noteRoutes = require('./routes/noteRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.use(cors({
    origin: '*', // أو حط localhost و netlify مباشرة لو حبيت تخصّصهم
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));
  
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API 🎉");
});

app.use('/notes', noteRoutes);
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
