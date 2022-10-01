import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  increment,
  selectTickCount,
} from './tickCounterSlice';
import styles from './TickCounter.module.scss';
import { useTimer } from 'react-timer-hook';

export const TickCounter = ({ expiryTimestamp } : { expiryTimestamp: Date}) => {
  const tickCount = useAppSelector(selectTickCount);
  const dispatch = useAppDispatch();
  const [flipState, setFlipState] = useState(true);

  useEffect(() => {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 10);
      restart(time);
  }, [flipState])

  const {
      seconds,
      restart,
  } = useTimer({ expiryTimestamp, onExpire: () => { 
    setFlipState(!flipState)
    dispatch(increment()); 
  }
}
);


  return (
    <div className={styles.row}>
    <span className={styles.value}>{seconds}</span>
    <span className={styles.value}>{tickCount}</span>
  </div>
  );
}