const productsMocks = require("../utils/mocks/products");
const MongoLib = require("../lib/mongo");

class ProductsService {
  constructor() {
    this.collection = "products";
    this.mongoDB = new MongoLib();
  }

  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const products = await this.mongoDB.getAll(this.collection, query);

    //return Promise.resolve(productsMocks);
    return products || [];
  }

  async getProduct({ productId }) {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || {};
  }

  async createProduct({ product }) {
    const createProductId = await this.mongoDB.create(this.collection, product);
    return createProductId;
    //return Promise.resolve(productsMocks[0]);
  }

  async updateProduct({ productId, product }) {
    const updatedProductId = await this.mongoDB.update(
      this.collection,
      productId,
      product
    );

    return updatedProductId;
    //return Promise.resolve(productsMocks[0]);
  }

  async deleteProduct({ productId }) {
    const deletedProductId = await this.mongoDB.delete(
      this.collection,
      productId
    );

    return deletedProductId;

    //return Promise.resolve(productsMocks[0]);
  }
}

module.exports = ProductsService;
