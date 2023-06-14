import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Commit, CommitResponseItem } from "../models/commit.model";
import { Status } from "../models/status.model";

type CommitsUtils = [commits: Commit[], status: Status];
type CommitUtils = [commit: Commit | undefined, status: Status];

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

      if (response.status === 404) {
        setStatus(Status.NotFound);
        return;
      }

      const items: CommitResponseItem[] = await response.json();

      setCommits(
        items.map(({ sha, commit, author, stats, files }) => ({
          id: sha,
          message: commit.message,
          author: author.login,
          avatar: author.avatar,
          date: commit.author.date,
          stats: stats,
          files: files,
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

export const useCommit = (): CommitUtils => {
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [commit, setCommit] = useState<Commit>();
  const { id } = useParams();

  const fetchAndSetCommits = useCallback(async () => {
    const env = import.meta.env;

    try {
      setStatus(Status.Fetching);
      const response = await fetch(
        `https://api.github.com/repos/${env.VITE_OWNER}/${env.VITE_REPO}/commits/${id}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching commit.");
      }

      if (response.status === 404) {
        setStatus(Status.NotFound);
        return;
      }

      const { sha, commit, author, stats, files }: CommitResponseItem =
        await response.json();

      setCommit({
        id: sha,
        message: commit.message,
        author: author.login,
        avatar: author.avatar,
        date: commit.author.date,
        stats: stats,
        files: files,
      });

      setStatus(Status.Success);
    } catch (error) {
      console.error(error);
      setStatus(Status.Fail);
    }
  }, [id]);

  useEffect(() => {
    fetchAndSetCommits();
  }, [fetchAndSetCommits]);

  return [commit, status];
};
