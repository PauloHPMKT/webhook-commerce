import { ObjectId } from "mongodb";
import { CreateProductRepository } from "../../../data/protocols/create-product-repository";
import { CreateProductModel } from "../../../domain/models/product";
import { MongoHelper } from "../../../../../shared/infra/db/mongo-client";

export class MongoProductRepository implements CreateProductRepository {
  async create(data: CreateProductModel.Repository): Promise<CreateProductModel.Repository> {
    const productCollection = MongoHelper.getCollection('products');
    const productData = {
      ...data,
      _id: new ObjectId(data.id),
    };
    delete productData.id;
    await productCollection.insertOne(productData);
    const product = await productCollection.findOne({ _id: productData._id });

    return MongoHelper.map(product);
  }
}
