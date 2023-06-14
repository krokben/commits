import { useCallback, useEffect, useState } from "react";
import { Commit, CommitResponseItem } from "../models/commit.model";
import { Status } from "../models/status.model";

type CommitsUtils = [commits: Commit[], status: Status];

export const useCommits = (): CommitsUtils => {
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [commits, setCommits] = useState<Commit[]>([]);

  const fetchAndSetCommits = useCallback(async () => {
    const env = import.meta.env;

    try {
      setStatus(Status.Fetching);
      const response = await fetch(
        `https://api.github.com/repos/${env.VITE_OWNER}/${env.VITE_REPO}/commits`
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching commits.");
      }

      const items: CommitResponseItem[] = await response.json();

      setCommits(
        items.map(({ node_id, commit }) => ({
          id: node_id,
          message: commit.message,
          author: commit.author.name,
          date: commit.author.date,
        }))
      );

      setStatus(Status.Success);
    } catch (error) {
      console.error(error);
      setStatus(Status.Fail);
    }
  }, []);

  useEffect(() => {
    fetchAndSetCommits();
  }, [fetchAndSetCommits]);

  return [commits, status];
};
