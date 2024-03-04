const { createConnection } = require('typeorm');
const itemSchema = require('./entities/items.js');
const invoiceSchema = require('./entities/invoices.js');
const invoiceItemSchema = require('./entities/invoiceItems.js');
const customerSchema = require('./entities/customers.js');


let connection;

const connectToDatabase = async () => {
  try {
    if (!connection) {
      connection = await createConnection({
        type: "postgres",
        host: "localhost",
        port: "5432",
        username: "postgres",
        password: "TRSABCGG",
        database: "TEST1",
        entities: [itemSchema, invoiceItemSchema, invoiceSchema,customerSchema],
        synchronize: true,
        logging: true
      });
      console.log('Connected to the database');
    }
    return connection;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

const getConnection = () => {
  if (!connection) {
    throw new Error('Database connection has not been established yet');
  }
  return connection;
};

module.exports =  {connectToDatabase, getConnection};
