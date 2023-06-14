import { FC } from "react";
import { Link } from "react-router-dom";
import { useCommits } from "../../hooks/commits.hooks";
import StatusBoundary from "../status/status.component";

const Commits: FC = () => {
  const [commits, status] = useCommits();

  return (
    <StatusBoundary status={status}>
      <ul>
        {commits.map(({ id, message, author, date }) => (
          <li key={id}>
            <Link to={`commits/${id}`}>
              {message} {author} {date}
            </Link>
          </li>
        ))}
      </ul>
    </StatusBoundary>
  );
};

export default Commits;
