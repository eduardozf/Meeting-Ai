import fs from 'fs';

class GetFileContent {
  public asText(path: string): string {
    const text = fs.readFileSync(path, 'utf8');
    return text;
  }

  public asStream(path: string): fs.ReadStream {
    const stream = fs.createReadStream(path);
    return stream;
  }
}

export default GetFileContent;
