import { useCommit } from "../../hooks/commits.hooks";
import { Commit } from "../../models/commit.model";
import StatusBoundary from "../status/status.component";
import classes from "./commit-details.module.css";

const Author = ({ avatar, author }: { avatar: string; author: string }) => (
  <figure className={classes.author}>
    <img
      className={classes.authorImage}
      src={avatar}
      alt={`Avatar of ${author}`}
    />
    <figcaption className={classes.authorName}>{author}</figcaption>
  </figure>
);

const Stats = ({ stats }: { stats: Commit["stats"] }) => (
  <ul className={classes.stats}>
    {Object.entries(stats).map(([stat, value]) => (
      <li>
        {stat}: {value}
      </li>
    ))}
  </ul>
);

const FileStat = ({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: number | string;
  valueClassName?: string;
}) => (
  <li className={classes.fileStat}>
    {label}:{" "}
    <span className={valueClassName ?? classes.fileStatValue}>{value}</span>
  </li>
);

const Files = ({ files }: { files: Commit["files"] }) => (
  <ul className={classes.files}>
    {files.map(({ filename, status, additions, deletions }) => (
      <li>
        <h4 className={classes.filename}>filename: {filename}</h4>
        <ul className={classes.fileStats}>
          <FileStat label="Status" value={status} />
          <FileStat label="Additions" value={additions} />
          <FileStat
            label="Deletions"
            value={deletions}
            valueClassName={`${classes.fileStatValue} ${classes.fileStatValueDeletion}`}
          />
        </ul>
      </li>
    ))}
  </ul>
);

const CommitDetails = () => {
  const [commit, status] = useCommit();
  console.log(commit);

  return (
    <StatusBoundary status={status}>
      {commit && (
        <div className={classes.commitDetails}>
          <h2>{commit.message}</h2>
          <div className={classes.header}>
            <div>
              <Author avatar={commit.avatar} author={commit.author} />
              <p className={classes.date}>
                {new Date(commit.date).toLocaleString()}
              </p>
            </div>
            <div>
              <h4 className={classes.statsHeader}>Stats:</h4>
              <Stats stats={commit.stats} />
            </div>
          </div>
          <h4>Changed files ({commit.files.length}):</h4>
          <Files files={commit.files} />
        </div>
      )}
    </StatusBoundary>
  );
};

export default CommitDetails;
