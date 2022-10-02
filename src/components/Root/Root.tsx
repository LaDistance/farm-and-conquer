import { Outlet } from "react-router";
import { Navbar } from "../Navbar/Navbar";
import styles from "./Root.module.scss";
export const Root = ({
  timerActions,
}: {
  timerActions: {
    pause: () => void;
    resume: () => void;
    restart: (
      newExpiryTimestamp: Date,
      autoStart?: boolean | undefined
    ) => void;
  };
}) => {
  return (
    <div className={styles.root}>
      <Navbar timerActions={timerActions} />
      <Outlet />
    </div>
  );
};
