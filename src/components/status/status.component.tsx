import { ReactNode } from "react";
import { Status } from "../../models/status.model";

const StatusBoundary = ({
  children,
  status,
}: {
  children: ReactNode;
  status: Status;
}) => {
  if (status === Status.Idle) {
    return <></>;
  }
  if (status === Status.Fetching) {
    return <p>Fetching data...</p>;
  }
  if (status === Status.Fail) {
    return <p>Something went wrong.</p>;
  }
  if (status === Status.NotFound) {
    return <p>Not found.</p>;
  }
  return <>{children}</>;
};

export default StatusBoundary;
