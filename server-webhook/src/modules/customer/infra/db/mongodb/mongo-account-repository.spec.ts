import { ObjectId } from 'mongodb';
import { MongoHelper } from '../../../../../shared/infra/db/mongo-client';
import { Customer } from '../../../domain/enitites/Customer';
import { MongoAccountRepository } from './mongo-account-repository';


const makeSut = (): SutTypes => {
  const sut = new MongoAccountRepository();
  return {
    sut
  };
};

interface SutTypes {
  sut: MongoAccountRepository;
}

describe('MongoAccountRepository', () => {
  let created_at: Date;

  beforeAll(async () => {
    created_at = new Date('2025-09-01');
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    const accountsCollection = MongoHelper.getCollection('accounts');
    await accountsCollection.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return an account on success', async () => {
    const { sut } = makeSut();
    const customerId = new ObjectId().toHexString();
    const account = await sut.add({
      id: customerId,
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      isActive: true,
      role: 'customer' as Customer.Role, // escedendo limite arquitetural
      avatar: null,
      created_at,
    });
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('valid_name');
    expect(account.email).toBe('valid_email');
    expect(account.password).toBe('valid_password');
    expect(account.isActive).toBe(true);
    expect(account.role).toBe('customer');
    expect(account.avatar).toBeNull();
    expect(account.created_at).toBeInstanceOf(Date);
  });
});
