interface IHashGenerator {
  generate: (data: string) => Promise<string>;
  compare: (data: string, toCompare: string) => Promise<boolean>;
}

export type { IHashGenerator };
