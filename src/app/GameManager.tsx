import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { OwnedParcels } from "../pages/OwnedParcels/OwnedParcels";
import { Root } from "../components/Root/Root";
import { incrementMoney, setMoney } from "../features/money/moneySlice";
import {
  selectOwnedParcels,
  setOwnedParcels,
} from "../features/ownedParcels/ownedParcelsSlice";
import { selectParcels, setParcels } from "../features/parcels/parcelsSlice";
import { updateSeconds } from "../features/seconds/secondsSlice";
import {
  increment,
  resetTickCounter,
} from "../features/tickCounter/tickCounterSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { ParcelPage } from "../pages/ParcelPage/ParcelPage";
import { ParcelsMap } from "../pages/ParcelsMap/ParcelsMap";
import { updateLevel } from "../features/level/levelSlice";
import { levels } from "../data/levels";
import { LevelChoice } from "../pages/LevelChoice/LevelChoice";
export const GameManager = () => {
  const parcels = useAppSelector(selectParcels);
  const ownedParcels = useAppSelector(selectOwnedParcels);
  const dispatch = useAppDispatch();

  // Flip state is necessary to force a re-render
  const [flipState, setFlipState] = useState(true);

  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 10);
    restart(time);
  }, [flipState]);

  const firstTimestamp = new Date();
  firstTimestamp.setSeconds(firstTimestamp.getSeconds() + 10);

  const getMoneyEarnedThisTick = () => {
    let moneyEarned = 0;
    ownedParcels.forEach((parcelIndex) => {
      const currentParcel = parcels.find((parcel) => parcel.id === parcelIndex);

      currentParcel!.farmBuildings.forEach((farmBuilding) => {
        moneyEarned += farmBuilding.building.moneyPerTick * farmBuilding.count;
      });
    });

    return moneyEarned;
  };

  const updateMoney = () => {
    dispatch(incrementMoney(getMoneyEarnedThisTick()));
  };

  const updateGame = () => {
    console.log("update game");
    setFlipState(!flipState);
    dispatch(increment());

    // Update the money count
    updateMoney();
  };

  const initializeGame = (level: number) => {
    // Initializes all the game data for a new game, depending on the chosen level

    // Does the level exist ?
    const loadedLevel = levels.find((levelData) => levelData.id === level);

    if (!loadedLevel) {
      console.warn("Level not found");
      return;
    }

    console.warn("Initiating level n°", level);

    // Pausing the timer so there's no side effect
    pause();
    // set the level
    dispatch(updateLevel(level));
    // set the initial money
    dispatch(setMoney(loadedLevel.initialMoney));
    // set the parcels
    dispatch(setParcels(loadedLevel.parcels));
    // set the owned parcels
    dispatch(setOwnedParcels(loadedLevel.ownedParcels));

    // Resetting the tick counter
    dispatch(resetTickCounter());

    // Restarting the timer
    const newTimestamp = new Date();
    newTimestamp.setSeconds(newTimestamp.getSeconds() + 10);
    restart(newTimestamp);
  };

  const { seconds, pause, resume, restart } = useTimer({
    expiryTimestamp: firstTimestamp,
    onExpire: updateGame,
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Root
          timerActions={{
            pause: pause,
            resume: resume,
            restart: restart,
          }}
        />
      ),
      children: [
        {
          path: "/",
          element: <LevelChoice initializeGame={initializeGame} />,
        },
        {
          path: "/map",
          element: <ParcelsMap />,
        },
        {
          path: "/owned-parcels",
          element: <OwnedParcels />,
        },
        {
          path: "/parcel/:parcelId",
          element: <ParcelPage />,
        },
      ],
    },
  ]);

  // Make seconds a global state
  useEffect(() => {
    dispatch(updateSeconds(seconds));
  }, [seconds]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
