import { FC } from "react";
import { Link } from "react-router-dom";
import { useCommits } from "../../hooks/commits.hooks";
import StatusBoundary from "../status/status.component";
import classes from "./commits.module.css";
import Commit from "../commit/commit.component";

const Commits: FC = () => {
  const [commits, status] = useCommits();

  return (
    <StatusBoundary status={status}>
      <ul className={classes.commits}>
        {commits.map(({ id, message, author, date }) => (
          <li key={id}>
            <Link to={`commits/${id}`}>
              <Commit message={message} author={author} date={date} />
            </Link>
          </li>
        ))}
      </ul>
    </StatusBoundary>
  );
};

export default Commits;
