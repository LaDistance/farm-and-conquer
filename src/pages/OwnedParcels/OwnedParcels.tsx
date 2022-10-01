import { useAppSelector } from "../../app/hooks";
import { selectOwnedParcels } from "../../features/ownedParcels/ownedParcelsSlice";
import { selectParcels } from "../../features/parcels/parcelsSlice";
import { ParcelCard } from "../../components/Parcel";

export const OwnedParcels = () => {
  const parcels = useAppSelector(selectParcels);
  const ownedParcels = useAppSelector(selectOwnedParcels);

  return (
    <div>
      {ownedParcels.map((parcelIndex) => (
        <ParcelCard
          parcel={parcels.find((parcel) => parcel.id === parcelIndex)!}
        />
      ))}
    </div>
  );
};
