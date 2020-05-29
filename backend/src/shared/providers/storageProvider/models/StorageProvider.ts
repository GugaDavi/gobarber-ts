export default interface StorageProvider {
  saveFile(file: string): Promise<string>;
  delete(file: string): Promise<void>;
}
