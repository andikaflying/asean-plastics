export type HeroSlide = {
  id: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  title: string;
  subtitle: string;
};

export type OfferPillar = {
  id: string;
  title: string;
  description: string;
  icon: {
    src: string;
    width: number;
    height: number;
  };
  href?: string;
  ctaLabel?: string;
};
