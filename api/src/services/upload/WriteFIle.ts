import fs from 'fs';

type WriteFileProps = {
  filename: string;
  content: string | Buffer;
  format: string;
};

class WriteFile {
  async local({ filename, content, format }: WriteFileProps) {
    const path = './storage';
    const fileWithFormat = `${filename}.${format}`;
    const fullPath = `${path}/${fileWithFormat}`;

    fs.writeFileSync(fullPath, content, 'utf-8');
  }
}

export default WriteFile;
