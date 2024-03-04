const express = require('express');
const bodyParser = require('body-parser');
const {connectToDatabase} = require('./database');
const invoiceRoute= require('./routes/invoiceRoute.js')

const app = express();
const PORT =  3001;

app.use(bodyParser.json());
app.use(express.json());

const startServer = async () => {
    try {
      await connectToDatabase();
  
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });  
      
      app.use('/api/invoices', invoiceRoute)
  
      app.get('/', async (req, res) => {
        console.log('SOMEONE HITTING BASE URL');
        res.send('Application running Successfully');
      });
    } catch (error) {
      console.error('Unable to start the server:', error);
    }
};

startServer();