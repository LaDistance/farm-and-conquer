import { useAppSelector } from "../../app/hooks";
import { selectOwnedParcels } from "../../features/ownedParcels/ownedParcelsSlice";
import { selectParcels } from "../../features/parcels/parcelsSlice";
import { ParcelCard } from "../../components/ParcelCard/ParcelCard";
import pageStyles from "../../styles/PageStyles.module.scss";
import { ResponsiveGridLayout } from "../../components/ResponsiveGridLayout/ResponsiveGridLayout";
import { getLayouts, getParcelsLayout } from "../../data/layouts";
import { useMemo } from "react";

export const OwnedParcels = () => {
  const parcels = useAppSelector(selectParcels);
  const ownedParcels = useAppSelector(selectOwnedParcels);

  const layouts = useMemo(
    () =>
      getLayouts(
        ownedParcels.map((ownedParcelId) =>
          parcels.find((parcel) => parcel.id === ownedParcelId)
        ),
        getParcelsLayout
      ),
    [ownedParcels, parcels]
  );
  return (
    <div className={pageStyles.page}>
      <ResponsiveGridLayout layouts={layouts}>
        {ownedParcels.map((parcelIndex) => (
          <div key={parcelIndex}>
            <ParcelCard
              parcel={parcels.find((parcel) => parcel.id === parcelIndex)!}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};
