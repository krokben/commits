import { ReactNode } from "react";
import { Status } from "../../models/status.model";

const StatusBoundary = ({
  children,
  status,
}: {
  children: ReactNode;
  status: Status;
}) =>
  status === Status.Idle ? (
    <></>
  ) : status === Status.Fetching ? (
    <p>Fetching data...</p>
  ) : status === Status.Fail ? (
    <p>Something went wrong.</p>
  ) : (
    <>{children}</>
  );

export default StatusBoundary;
