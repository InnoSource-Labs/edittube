export interface UserInterface {
  id: string;
  created_at: number;
  updated_at: number;
  name: string;
  email: string;
  email_verified: boolean;
  role: "creator" | "editor";
}
