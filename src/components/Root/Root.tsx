import { Outlet } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { selectMoney } from "../../features/money/moneySlice";
import { selectSeconds } from "../../features/seconds/secondsSlice";
import { TickCounter } from "../../features/tickCounter/TickCounter";
import { selectTickCount } from "../../features/tickCounter/tickCounterSlice";
import { Navbar } from "../Navbar/Navbar";
import styles from "./Root.module.scss";
export const Root = () => {
  return (
    <div className={styles.root}>
      <Navbar />
      <Outlet />
    </div>
  );
};
