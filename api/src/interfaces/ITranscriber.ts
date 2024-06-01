interface ITranscriber {
  setFile: (fileName: string) => ITranscriber;
  audioToText: () => Promise<ITranscriberResponse>;
}

interface ITranscriberResponse {
  id: string;
  filename: string;
  transcription: string;
}

export type { ITranscriber, ITranscriberResponse };
