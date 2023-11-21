export interface editorsInterface {
  uid: string;
  email: string;
}

export interface WorkspaceInterface {
  id: string;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  clientId: string;
  clientSecret: string;
  editorIds: editorsInterface[];
}
