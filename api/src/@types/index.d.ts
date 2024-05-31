interface IConverter {
  setFilePath: (path: string) => IConverter;
  toMp3: (bitrate?: number) => Promise<string>;
}

interface ITranscriber {
  toText: () => Promise<string>;
}

interface IChat {
  sendContextTextFile: () => Promise<void>;
}

interface IIDGenerator {
  generate: () => string;
}

interface IHashGenerator {
  generate: (data: string) => Promise<string>;
  compare: (data: string, toCompare: string) => Promise<boolean>;
}
