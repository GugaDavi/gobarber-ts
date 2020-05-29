import StorageProvider from '@shared/providers/storageProvider/models/StorageProvider';

class FakeStorageProvider implements StorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  public async delete(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file
    );

    this.storage.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;
