import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { increment, selectTickCount } from "./tickCounterSlice";
import styles from "./TickCounter.module.scss";
import { useTimer } from "react-timer-hook";
import { Card } from "antd";

export const TickCounter = ({
  tickCount,
  seconds,
}: {
  tickCount: number;
  seconds: number;
}) => {
  return (
    <Card title="Card title">
      <div className={styles.row}>
        <span className={styles.value}>{seconds}</span>
        <span className={styles.value}>{tickCount}</span>
      </div>
    </Card>
  );
};
