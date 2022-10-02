import { Button } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectMoney } from "../../features/money/moneySlice";
import { SecondsCounter } from "../SecondsCounter/SecondsCounter";
import styles from "./Navbar.module.scss";
export const Navbar = ({
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
  const [paused, setPaused] = useState(false);
  const money = useAppSelector(selectMoney);

  const handlePlayButton = () => {
    if (paused) {
      timerActions.resume();
    } else {
      timerActions.pause();
    }
    setPaused(!paused);
  };
  return (
    <div className={styles.navbar}>
      <Link to="/">Home</Link>
      <Link to="/owned-parcels">Owned parcels</Link>
      <Link to="/map">Map</Link>
      <span>Current balance : {money} pognons.</span>
      <SecondsCounter />
      <Button type="primary" onClick={handlePlayButton}>
        {paused ? "Play" : "Pause"}
      </Button>
    </div>
  );
};
