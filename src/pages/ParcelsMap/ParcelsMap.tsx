import { useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ParcelCard } from "../../components/Parcel";
import { selectParcels } from "../../features/parcels/parcelsSlice";
import pageStyles from "../../styles/PageStyles.module.scss";
export const ParcelsMap = () => {
  const parcels = useAppSelector(selectParcels);
  const dispatch = useAppDispatch();

  const ResponsiveReactGridLayout = useMemo(
    () => WidthProvider(Responsive),
    []
  );

  return (
    <div className={pageStyles.page}>
      <ResponsiveReactGridLayout
        compactType={null}
        breakpoints={{ lg: 0 }}
        preventCollision={false}
        cols={{ lg: 12 }}
        rowHeight={200}
        isDraggable={false}
        isResizable={false}
        margin={{
          lg: [20, 20],
          md: [20, 20],
          sm: [20, 20],
          xs: [20, 20],
          xxs: [20, 20],
        }}
      >
        {parcels.map((parcel) => (
          <div
            key={parcel.id}
            data-grid={{ x: parcel.x * 2, y: parcel.y, w: 2, h: 1 }}
          >
            <ParcelCard parcel={parcel} />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};
