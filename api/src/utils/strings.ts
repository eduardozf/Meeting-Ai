interface SplitFilenameResponse {
  name?: string;
  format?: string;
}

function splitFileName(s: string): SplitFilenameResponse {
  const regex = /^(.+)\.([^.]+)$/;
  const match = regex.exec(s);

  return { name: match?.[1], format: match?.[2] };
}

export { splitFileName };
