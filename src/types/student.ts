export interface Student {
  id: string;
  name: string;
  age: number;
  belt: string;
  phone: string;
  email: string;
  enrollmentDate: string;
}

export type BeltLevel = 
  | "Branca"
  | "Amarela"
  | "Verde"
  | "Azul"
  | "Vermelha"
  | "Preta";

export const BELT_LEVELS: BeltLevel[] = [
  "Branca",
  "Amarela",
  "Verde",
  "Azul",
  "Vermelha",
  "Preta",
];
