import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectParcels } from "../../features/parcels/parcelsSlice";
import pageStyles from "../../styles/PageStyles.module.scss";
export const ParcelsMap = () => {
  const parcels = useAppSelector(selectParcels);
  const dispatch = useAppDispatch();

  return (
    <div className={pageStyles.page}>
      <h1>ParcelsMap</h1>
    </div>
  );
};
