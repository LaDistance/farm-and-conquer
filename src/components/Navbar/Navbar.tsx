import { Button, Divider } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLevel, updateLevel } from "../../features/level/levelSlice";
import { selectMoney, setMoney } from "../../features/money/moneySlice";
import {
  selectOwnedParcels,
  setOwnedParcels,
} from "../../features/ownedParcels/ownedParcelsSlice";
import { selectParcels, setParcels } from "../../features/parcels/parcelsSlice";

import { loadState, saveState } from "../../util/util";
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
  const parcels = useAppSelector(selectParcels);
  const ownedParcels = useAppSelector(selectOwnedParcels);
  const level = useAppSelector(selectLevel);

  const dispatch = useAppDispatch();

  const handlePlayButton = () => {
    if (paused) {
      timerActions.resume();
    } else {
      timerActions.pause();
    }
    setPaused(!paused);
  };

  const handleSaveGame = () => {
    const state = {
      money,
      parcels,
      ownedParcels,
      level,
    };
    saveState(state);
    console.log("Game saved", state);
  };

  const handleLoadGame = () => {
    const state = loadState();
    if (state) {
      console.log("Game loaded : ", state);
      dispatch(setMoney(state.money));
      dispatch(setParcels(state.parcels));
      dispatch(setOwnedParcels(state.ownedParcels));
      dispatch(updateLevel(state.level));
    }
  };
  return (
    <div className={styles.navbar}>
      <Link to="/">Home</Link>
      {level !== 0 ? (
        <>
          <Link to="/owned-parcels">Owned parcels</Link>
          <Link to="/map">Map</Link>
        </>
      ) : (
        <></>
      )}
      <Divider />
      {level !== 0 ? <span>Current level : {level}</span> : <></>}
      <span>Current balance : {money} pognons.</span>
      <SecondsCounter />
      <Button
        className={styles.button}
        type="primary"
        onClick={handlePlayButton}
      >
        {paused ? "Play" : "Pause"}
      </Button>
      <Button className={styles.button} type="primary" onClick={handleSaveGame}>
        Save game
      </Button>
      <Button className={styles.button} type="primary" onClick={handleLoadGame}>
        Load game
      </Button>
    </div>
  );
};
