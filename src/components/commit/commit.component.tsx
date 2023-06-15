import { FC } from "react";
import classes from "./commit.module.css";

interface CommitProps {
  message: string;
  author: string;
  date: string;
}

const Commit: FC<CommitProps> = ({ message, author, date }) => (
  <div className={classes.commit}>
    <h4 className={classes.message}>{message}</h4>
    <div className={classes.details}>
      <span className={classes.author}>{author}</span>
      <span className={classes.date}>{new Date(date).toLocaleString()}</span>
    </div>
  </div>
);

export default Commit;
