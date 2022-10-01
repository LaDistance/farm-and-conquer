import { $CombinedState } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectMoney } from "../../features/money/moneySlice";
import { selectSeconds } from "../../features/seconds/secondsSlice";
import { SecondsCounter } from "../SecondsCounter/SecondsCounter";
import styles from "./Navbar.module.scss";
export const Navbar = () => {
  const money = useAppSelector(selectMoney);
  const seconds = useAppSelector(selectSeconds);

  return (
    <div className={styles.navbar}>
      <Link to="/">Home</Link>
      <Link to="/owned-parcels">Owned parcels</Link>
      <Link to="/map">Map</Link>
      <span>Current balance : {money} pognons.</span>
      <SecondsCounter />
    </div>
  );
};
