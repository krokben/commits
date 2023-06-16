export interface Commit {
  id: string;
  message: string;
  author: string;
  avatar: string;
  date: string;
  stats: {
    total: number;
    additions: number;
    deletions: number;
  };
  files: {
    filename: string;
    status: string;
    additions: number;
    deletions: number;
  }[];
}

export interface CommitResponseItem {
  sha: string;
  commit: {
    message: string;
    author: { date: string };
  };
  author: { login: string; avatar_url: string };
  stats: {
    total: number;
    additions: number;
    deletions: number;
  };
  files: {
    filename: string;
    status: string;
    additions: number;
    deletions: number;
  }[];
}
