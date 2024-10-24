export interface UserCardData {
  name: string | null;
  faculty: string;
  guild?: "BUDDHA" | "VAJRA" | "PADMA" | "RATNA" | "KARMA";
  age?: number;
  email: string;
  username: string;
  description: string;
  updatedAt?: string;
}
