import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectParcels,
  setBuildingCount,
} from "../../features/parcels/parcelsSlice";
import { decrementMoney, selectMoney } from "../../features/money/moneySlice";
import { Building } from "../../components/Building/Building";

import { useEffect } from "react";
import { getLayouts } from "../../data/layouts";

// CSS
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import styles from "./ParcelPage.module.scss";
import pageStyles from "../../styles/PageStyles.module.scss";
import { ResponsiveGridLayout } from "../../components/ResponsiveGridLayout/ResponsiveGridLayout";
export const ParcelPage = () => {
  // Hooks
  const { parcelId } = useParams<{ parcelId: string }>();
  const parcels = useAppSelector(selectParcels);
  const money = useAppSelector(selectMoney);
  const dispatch = useAppDispatch();

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
    <div className={pageStyles.page}>
      <ResponsiveGridLayout layouts={getLayouts(parcel.farmBuildings)}>
        {parcel.farmBuildings.map((building) => (
          <div className={styles.gridItem} key={building.building.id}>
            <Building
              title={building.building.name}
              count={building.count}
              price={building.building.price}
              individualIncome={building.building.moneyPerTick}
              income={building.building.moneyPerTick * building.count}
              disabled={building.building.price > money}
              handleBuy={() => buyBuilding(building.building.id, money)}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};
