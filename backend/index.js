const connectToMongo = require('./db');
const express = require('express');

connectToMongo();
const app = express();
const port = 4000;

app.use(express.json());

//Defined Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})