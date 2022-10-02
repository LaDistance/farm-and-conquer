import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectParcels,
  setBuildingCount,
} from "../../features/parcels/parcelsSlice";
import { decrementMoney, selectMoney } from "../../features/money/moneySlice";
import { Building } from "../../components/Building/Building";
import { Responsive, WidthProvider } from "react-grid-layout";

import { useEffect, useMemo } from "react";
import { breakpoints, columns, getLayouts } from "../../data/layouts";

// CSS
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import styles from "./ParcelPage.module.scss";
export const ParcelPage = () => {
  // Hooks
  const { parcelId } = useParams<{ parcelId: string }>();
  const parcels = useAppSelector(selectParcels);
  const money = useAppSelector(selectMoney);
  const dispatch = useAppDispatch();

  // Grid
  const ResponsiveReactGridLayout = useMemo(
    () => WidthProvider(Responsive),
    []
  );
  useEffect(() => {
    console.log("Re-render parcel page");
  }, []);

  // Conditional rendering of the page
  if (!parcelId) {
    return <div>Invalid parcel id</div>;
  }
  const parcel = parcels.find(
    (parcel) => parcel.id === Number.parseInt(parcelId)
  );

  if (!parcel) {
    return <div>This parcel does not exist.</div>;
  }

  // Functions
  const buyBuilding = (id: number, currentBalance: number) => {
    const farmBuildings = parcel.farmBuildings;
    const building = farmBuildings.find(
      (building) => building.building.id === id
    );

    if (building && building.building.price <= currentBalance) {
      // Pay the money
      dispatch(decrementMoney(building.building.price));

      // Add the building to the parcel
      dispatch(
        setBuildingCount({
          parcelId: parcel.id,
          buildingId: id,
          count: building.count + 1,
        })
      );
    } else {
      console.log("Not enough money");
    }
  };

  return (
    <div>
      <ResponsiveReactGridLayout
        verticalCompact={true}
        layouts={getLayouts(parcel.farmBuildings)}
        breakpoints={breakpoints}
        preventCollision={false}
        cols={columns}
        rowHeight={200}
        autoSize={true}
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
        {parcel.farmBuildings.map((building) => (
          <div className={styles.gridItem} key={building.building.id}>
            <Building
              title={building.building.name}
              count={building.count}
              handleBuy={() => buyBuilding(building.building.id, money)}
            />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};
