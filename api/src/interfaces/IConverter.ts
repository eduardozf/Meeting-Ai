interface IConverter {
  setFilePath: (path: string) => IConverter;
  toMp3: (bitrate?: number) => Promise<string>;
}

export type { IConverter };
