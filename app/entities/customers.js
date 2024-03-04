const {EntitySchema}= require('typeorm');

const CustomerEntity = new EntitySchema({
    name: 'Customer',
    columns: {
      customer_id: {
        type: Number,
        primary: true,
        generated: true,
      },
      customer_name: {
        type:'varchar'
      }
    },
    relations: {
        invoices: {
          target: 'Invoice',
          type: 'one-to-many',
          inverseSide: 'customer',
        },
    },
});

module.exports= CustomerEntity;

