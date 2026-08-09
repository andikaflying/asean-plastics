export type Opportunity = {
  id: string;
  title: string;
  kind: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  date: string;
  location: string;
  href: string;
};
