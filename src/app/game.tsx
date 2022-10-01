import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { incrementMoney, selectMoney } from "../features/money/moneySlice";
import { selectOwnedParcels } from "../features/ownedParcels/ownedParcelsSlice";
import { selectParcels } from "../features/parcels/parcelsSlice";
import { TickCounter } from "../features/tickCounter/TickCounter";
import {
  increment,
  selectTickCount,
} from "../features/tickCounter/tickCounterSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

export const GameManager = () => {
  const tickCount = useAppSelector(selectTickCount);
  const money = useAppSelector(selectMoney);
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

  const { seconds, restart } = useTimer({
    expiryTimestamp: firstTimestamp,
    onExpire: updateGame,
  });

  return (
    <div>
      <TickCounter tickCount={tickCount} seconds={seconds} />
      <span>You have {money} dollars.</span>
    </div>
  );
};
