export type TrainingCourse = {
  id: string;
  title: string;
  category: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  durationMinutes: number;
  href: string;
};
