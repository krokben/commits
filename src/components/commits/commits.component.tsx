import { FC } from "react";
import { useCommits } from "../../hooks/commits.hooks";
import StatusBoundary from "../status/status.component";

const Commits: FC = () => {
  const [commits, status] = useCommits();

  return (
    <StatusBoundary status={status}>
      <ul>
        {commits.map(({ id, message, author, date }) => (
          <li key={id}>
            {message} {author} {date}
          </li>
        ))}
      </ul>
    </StatusBoundary>
  );
};

export default Commits;
