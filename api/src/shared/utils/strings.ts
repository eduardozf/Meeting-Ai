interface SplitFilenameResponse {
  name?: string;
  format?: string;
}

/**
 *
 * @param s myFilename.mp4
 * @returns \{ name: "myFilename", format: "mp4" }
 */
function splitFileName(s: string): SplitFilenameResponse {
  const regex = /^(.+)\.([^.]+)$/;
  const match = regex.exec(s);

  return { name: match?.[1], format: match?.[2] };
}

export { splitFileName };
