interface ITranscriber {
  toText: () => Promise<string>;
}

export type { ITranscriber };
