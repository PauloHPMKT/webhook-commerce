export interface FindCustomerRepository {
  findByEmail(email: string): Promise<boolean>;
}
