import { useCommit } from "../../hooks/commits.hooks";
import StatusBoundary from "../status/status.component";

const CommitDetails = () => {
  const [commit, status] = useCommit();

  return (
    <StatusBoundary status={status}>
      {commit && (
        <div>
          <h2>{commit.message}</h2>
          <figure>
            <img src={commit.avatar} alt={`Avatar of ${commit.author}`} />
            <figcaption>{commit.author}</figcaption>
          </figure>
          <p>{commit.date}</p>
          <h4>Stats:</h4>
          <ul>
            {Object.entries(commit.stats)
              .reduce(
                (acc, [stat, value]) => [...acc, { stat, value }],
                [] as { stat: string; value: number }[]
              )
              .map(({ stat, value }) => (
                <li>
                  {stat}: {value}
                </li>
              ))}
          </ul>
          <h4>Changed files:</h4>
          <h5>Total: ${commit.files.length}</h5>
          <ul>
            {commit.files.map(({ filename, status, additions, deletions }) => (
              <li>
                <ul>
                  <li>filename: {filename}</li>
                  <li>status: {status}</li>
                  <li>additions: {additions}</li>
                  <li>deletions: {deletions}</li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </StatusBoundary>
  );
};

export default CommitDetails;
