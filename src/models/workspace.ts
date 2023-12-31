export type WorkspaceFilters = "all" | "creator" | "editor";

export interface editorsInterface {
  uid: string;
  email: string;
}

interface WorkspaceSecrets {
  json: string;
}

interface WorkspaceCommon {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  editors: editorsInterface[];
}

export type WorkspaceInterface = WorkspaceSecrets & WorkspaceCommon;

interface EditorWorkspace extends WorkspaceCommon {
  role: "editor";
}

interface CreatorWorkspace extends WorkspaceInterface {
  role: "creator";
  verifyURL?: string;
}

export type WorkspaceReadOnly = EditorWorkspace | CreatorWorkspace;
