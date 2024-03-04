const {EntitySchema}= require('typeorm');

const ItemEntity = new EntitySchema({
  name: 'Item',
  columns: {
    item_id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
    },
  },
});

module.exports= ItemEntity;