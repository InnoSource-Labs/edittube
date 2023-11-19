export interface VideoInterface {
  id: string;
  created_at: number;
  updated_at: number;
  workspaceId: string;
  title: string;
  description: string;
  url: string;
  uploadedBy: string;
  status: "pending" | "approved" | "rejected";
}
