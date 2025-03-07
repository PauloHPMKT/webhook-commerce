import { ObjectId } from "mongodb";
import { MongoHelper } from "../../../../../shared/infra/db/mongo-client";
import { CreateCartRepository } from "../../../data/protocols/create-cart-repository";
import { CreateCartModel } from "../../../domain/models/create-cart.model";
import { UpdateCartRepository } from "../../../data/protocols/update-cart-repository";
import { FindCartByCustomerRepository } from "../../../data/protocols/find-cart-by-customer-repository";
import { FindCartModel } from "../../../domain/models/find-cart-model";

export class MongoCartRepository implements
  CreateCartRepository,
  UpdateCartRepository,
  FindCartByCustomerRepository
{
  async create(cart: CreateCartModel.Params): Promise<CreateCartModel.Result> {
    const cartCollection = MongoHelper.getCollection('carts');
    const cartData = {
      ...cart,
      userId: new ObjectId(cart.userId),
      _id: new ObjectId(cart.id),
    };
    delete cartData.id;
    await cartCollection.insertOne(cartData);
    const cartResult = await cartCollection.findOne({ _id: cartData._id });
    return MongoHelper.map(cartResult);
  }

  async findById(customerId: string): Promise<FindCartModel.Result> {
    console.log('customerId', customerId);
    const cartCollection = MongoHelper.getCollection('carts');
    const cart = await cartCollection.findOne({ userId: new ObjectId(customerId) });
    return MongoHelper.map(cart);
  }

  async update(cart: any): Promise<any> {
    const cartCollection = MongoHelper.getCollection('carts');
    const cartId = { _id: ObjectId.createFromHexString(cart.id) };
    await cartCollection.updateOne(
      cartId,
      {
        $set: cart,
      }
    );
    const cartResult = await cartCollection.findOne(cartId);
    return MongoHelper.map(cartResult);
  }
}
