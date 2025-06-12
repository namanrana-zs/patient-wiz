declare module 'emoji-dictionary' {
  const emoji: {
    getUnicode: (name: string) => string;
    getName: (unicode: string) => string;
    names: () => string[];
  };
  export default emoji;
}
