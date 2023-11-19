export interface WorkspaceInterface {
  id: string;
  created_at: number;
  updated_at: number;
  creatorId: string;
  clientId: string;
  clientSecret: string;
  editorIds: string[];
}
