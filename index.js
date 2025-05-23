const express = require('express');
const cors = require('cors');
require('./src/db/connection');
const noteRoutes = require('./src/routes/noteRoutes');
const todoRoutes = require('./src/routes/todoRoutes');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type']
}));
  
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API 🎉");
});

app.use('/notes', noteRoutes);
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 5008;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
