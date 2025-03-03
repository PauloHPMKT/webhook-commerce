import { MongoProductRepository } from './mongo-product-repository';
import { MongoHelper } from './helpers/mongo-client';
import { Product } from '../../../domain/entities/Product';
import { CreateProductModel } from '../../../domain/models/product';
import { ObjectId } from 'mongodb';

const makeSut = (): MongoProductRepository => {
  return new MongoProductRepository();
};

describe('AccountRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    const accountsCollection = MongoHelper.getCollection('products');
    await accountsCollection.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return a product on success', async () => {
    const sut = makeSut();
    const createdAt = new Date('2025-09-01');
    const productId = new ObjectId().toHexString();
    const productData: CreateProductModel.Repository = {
      id: productId,
      code: 'any_code',
      name: 'any_name',
      brand: 'any_brand',
      description: 'any_description',
      price: 10,
      quantity: 10,
      images: null,
      discount: null,
      category: [],
      status: 'active' as CreateProductModel.Status,
      createdAt,
    };

    const product = await sut.create(productData);

    expect(product).toBeTruthy();
    expect(product.id).toBeTruthy();
    expect(product.name).toBe('any_name');
    expect(product.brand).toBe('any_brand');
    expect(product.description).toBe('any_description');
    expect(product.price).toEqual(10);
    expect(product.quantity).toEqual(10);
    expect(product.code).toBe('any_code');
    expect(product.images).toBeNull();
    expect(product.status).toBe('active');
    expect(product.discount).toBeNull();
    expect(product.category).toEqual([]);
    expect(product.createdAt).toEqual(createdAt);
  });
});
