const splitFileName = (s: string) => {
  const regex = new RegExp(/^(.+)\.([^.]+)$/);
  const match = regex.exec(s);

  return { name: match?.[1], format: match?.[2] };
};
