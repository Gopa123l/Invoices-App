const {EntitySchema}= require('typeorm');

const InvoiceEntity = new EntitySchema({
    name: 'Invoice',
    columns: {
      invoice_id: {
        type: Number,
        primary: true,
        generated: true,
      },
      description: {
        type: String,
        nullable: true,
      },
      customer_id: {
        type: Number,
      },
      invoice_total: {
        type: Number,
      },
      created_at: {
        type: 'timestamp',
        createDate: true,
      },
    },
    relations: {
      items: {
        target: 'InvoiceItem',
        type: 'one-to-many',
        inverseSide: 'invoice',
      },
      customer: {
        target: 'Customer',
        type: 'many-to-one',
        inverseSide: 'invoices',
      },
    },
  });

module.exports= InvoiceEntity;