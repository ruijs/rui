/// <reference types="vite/client" />

type PKGConfig<T> = {
  name: string;
  title: string;
  examples: {
    name: string;
    title: string;
    componentRock: T;
  }[];
};
