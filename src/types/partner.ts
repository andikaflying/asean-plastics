export type Partner = {
  id: string;
  name: string;
  sector: string;
  country: string;
  logo: {
    src: string;
    width: number;
    height: number;
  };
  themes: string[];
};
