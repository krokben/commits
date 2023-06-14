export interface Commit {
  id: string;
  message: string;
  author: string;
  date: string;
}

export interface CommitResponseItem {
  node_id: string;
  commit: { message: string; author: { name: string; date: string } };
}
