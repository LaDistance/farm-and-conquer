import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { OwnedParcels } from "../pages/OwnedParcels/OwnedParcels";
import { Root } from "../components/Root/Root";
import { incrementMoney } from "../features/money/moneySlice";
import { selectOwnedParcels } from "../features/ownedParcels/ownedParcelsSlice";
import { selectParcels } from "../features/parcels/parcelsSlice";
import { updateSeconds } from "../features/seconds/secondsSlice";
import { increment } from "../features/tickCounter/tickCounterSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { ParcelPage } from "../pages/ParcelPage/ParcelPage";
import { ParcelsMap } from "../pages/ParcelsMap/ParcelsMap";
import { Button } from "antd";

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

  const { seconds, pause, resume, restart } = useTimer({
    expiryTimestamp: firstTimestamp,
    onExpire: updateGame,
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
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
      <Button type="primary" onClick={() => pause()}>
        Pause the timer
      </Button>
      <Button type="primary" onClick={() => resume()}>
        Resume the timer
      </Button>
      <RouterProvider router={router} />
    </div>
  );
};
