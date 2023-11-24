export interface VideoInterface {
  _id: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: string;
  title: string;
  description: string;
  url: string;
  uploadedBy: string;
  status: "pending" | "approved" | "rejected";
}

export type VideoFilters = "pending" | "approved" | "rejected" | "all";