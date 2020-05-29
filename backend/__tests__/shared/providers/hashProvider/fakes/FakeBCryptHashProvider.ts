import HashProvider from '@shared/providers/hashProvider/models/hashProvider';

class FakeHashProvider implements HashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export default FakeHashProvider;
