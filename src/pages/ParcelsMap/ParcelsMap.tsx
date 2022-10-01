import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectParcels } from "../../features/parcels/parcelsSlice";

export const ParcelsMap = () => {
  const parcels = useAppSelector(selectParcels);
  const dispatch = useAppDispatch();

  return (
    <div>
      <span>ParcelsMap</span>
    </div>
  );
};
