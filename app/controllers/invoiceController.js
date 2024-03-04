const getConnection= require('../database');

exports.createInvoice = async (req, res) => {
    try {
      const { description, customer_id, invoice_total, items } = req.body;
      const connection = await getConnection();
      
      await connection.transaction(async transactionalEntityManager => {
        const invoiceResult = await transactionalEntityManager.query(
          'INSERT INTO invoices (description, customer_id, invoice_total) VALUES ($1, $2, $3) RETURNING *',
          [description, customer_id, invoice_total]
        );
        
        const { invoice_id } = invoiceResult[0];
        for (const item of items) {
          await transactionalEntityManager.query(
            'INSERT INTO invoice_items (invoice_id, item_id, item_totals) VALUES ($1, $2, $3)',
            [invoice_id, item.item_id, item.item_totals]
          );
        }
        const createdInvoice = await transactionalEntityManager.query(
          `SELECT i.*, ii.* FROM invoices i
          INNER JOIN invoice_items ii ON i.invoice_id = ii.invoice_id
          WHERE i.invoice_id = $1`,
          [invoice_id]
        );
  
        res.status(201).json({ message: 'Invoice created successfully', invoice: createdInvoice });
      });
    } catch (error) {
      console.error('Error creating invoice:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getInvoiceById = async (req, res) => {
    try {
      const { id } = req.params.invoiceId;
      const connection = await getConnection();  
      const invoice = await connection.query(
        `SELECT i.*, ii.* FROM invoices i
        INNER JOIN invoice_items ii ON i.invoice_id = ii.invoice_id
        WHERE i.invoice_id = $1`,
        [id]
      );
  
      if (invoice.length > 0) {
        res.status(200).json({ invoice: invoice.rows });
      } else {
        res.status(404).json({ message: 'Invoice not found' });
      }
    } catch (error) {
      console.error('Error fetching invoice:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  