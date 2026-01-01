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
