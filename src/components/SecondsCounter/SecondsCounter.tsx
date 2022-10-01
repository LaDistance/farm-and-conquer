import { useAppSelector } from "../../app/hooks";
import { selectSeconds } from "../../features/seconds/secondsSlice";

export const SecondsCounter = () => {
  const seconds = useAppSelector(selectSeconds);
  return <span>Seconds : {seconds} </span>;
};
