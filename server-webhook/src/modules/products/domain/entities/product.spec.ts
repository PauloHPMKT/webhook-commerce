import { Product } from "./Product";

describe('Product entity', () => {
  it('should be defined', () => {
    const sut = Product
    expect(sut).toBeDefined();
  });
});
