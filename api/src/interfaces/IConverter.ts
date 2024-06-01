interface IConverter {
  setFilePath: (path: string) => IConverter;
  setBitrate: (value: number) => IConverter;
  toMp3: () => Promise<IConverterResponse>;
}

interface IConverterResponse {
  id: string;
  filename: string;
}

export type { IConverter, IConverterResponse };
