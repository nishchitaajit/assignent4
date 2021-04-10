const { getDb, getNextSequence } = require('./db.js');

async function getProduct(_, { id }) {
  const db = getDb();
  const product = await db.collection('products').findOne({ id });
  return product;
}

async function productList() {
  const db = getDb();
  const inventoryDB = await db.collection('products').find({}).toArray();
  return inventoryDB;
}

async function productAdd(_, { product }) {
  const db = getDb();
  const newProduct = product;
  newProduct.id = await getNextSequence('products');
  const result = await db.collection('products').insertOne(product);
  const savedProduct = await db.collection('products')
    .findOne({ _id: result.insertedId });
  return savedProduct;
}

async function productUpdate(_, { id, changes }) {
  const db = getDb();
  await db.collection('products').updateOne({ id }, { $set: changes });
  const savedProduct = await db.collection('products').findOne({ id });
  return savedProduct;
}

async function remove(_, { id }) {
  const db = getDb();
  const product = await db.collection('products').findOne({ id });
  if (!product) return false;
  product.deleted = new Date();
  let result = await db.collection('deleted_products').insertOne(product);
  if (result.insertedId) {
    result = await db.collection('products').removeOne({ id });
    return result.deletedCount === 1;
  }
  return false;
}

module.exports = {
  productList,
  productAdd,
  getProduct,
  productUpdate,
  remove,
};
