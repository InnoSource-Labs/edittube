type ViedoStatus = "pending" | "approved" | "rejected";

export interface VideoInterface {
  _id: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: string;
  title: string;
  description: string;
  url: string;
  publicId: string;
  uploadedBy: string;
  status: ViedoStatus;
}

export type VideoFilters = ViedoStatus | "all";
