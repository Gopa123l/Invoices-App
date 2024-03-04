const {EntitySchema}= require('typeorm');

const InvoiceItemEntity = new EntitySchema({
    name: 'InvoiceItem',
    columns: {
      invoiceItems_id: {
        type: Number,
        primary: true,
        generated: true,
      },
      invoice_id: {
        type: Number,
      },
      item_id: {
        type: Number,
      },
      item_totals: {
        type: Number,
      },
      created_at: {
        type: 'timestamp',
        createDate: true,
      },
    },
    relations: {
        invoice: {
          target: 'Invoice',
          type: 'many-to-one',
          inverseSide: 'items',
        },
    },
});

module.exports= InvoiceItemEntity