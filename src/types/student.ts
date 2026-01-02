export interface Student {
  id: string;
  name: string;
  motherName: string;
  fatherName: string;
  age: number;
  belt: string;
  bloodType: string;
  phone: string;
  observations: string;
  address: string;
  enrollmentDate: string;
  monthlyFee: number;
  createdAt?: string;
  updatedAt?: string;
}

export type BeltLevel = 
  | "Faixa Branca"
  | "Branca ponta Amarela"
  | "Amarela"
  | "Amarela ponta Verde"
  | "Verde"
  | "Verde ponta Azul"
  | "Azul"
  | "Azul ponta Vermelha"
  | "Vermelha"
  | "Vermelha ponta Preta"
  | "Preta";

export const BELT_LEVELS: BeltLevel[] = [
  "Faixa Branca",
  "Branca ponta Amarela",
  "Amarela",
  "Amarela ponta Verde",
  "Verde",
  "Verde ponta Azul",
  "Azul",
  "Azul ponta Vermelha",
  "Vermelha",
  "Vermelha ponta Preta",
  "Preta",
];

export const BLOOD_TYPES = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
] as const;

export type BloodType = typeof BLOOD_TYPES[number];
