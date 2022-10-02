import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addParcelSoldiers,
  selectParcels,
  setFarmBuildingCount,
  setWarBuildingCount,
} from "../../features/parcels/parcelsSlice";
import { decrementMoney, selectMoney } from "../../features/money/moneySlice";
import { FarmBuilding } from "../../components/FarmBuilding/FarmBuilding";

import { useEffect } from "react";
import {
  getFarmBuildingsLayout,
  getLayouts,
  getWarBuildingsLayout,
} from "../../data/layouts";

// CSS
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import styles from "./ParcelPage.module.scss";
import pageStyles from "../../styles/PageStyles.module.scss";
import { ResponsiveGridLayout } from "../../components/ResponsiveGridLayout/ResponsiveGridLayout";
import { Divider } from "antd";
import { WarBuilding } from "../../components/WarBuilding/WarBuilding";
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
  const buyFarmBuilding = (id: number, currentBalance: number) => {
    const farmBuildings = parcel.farmBuildings;
    const building = farmBuildings.find(
      (building) => building.building.id === id
    );

    if (building && building.building.price <= currentBalance) {
      // Pay the money
      dispatch(decrementMoney(building.building.price));

      // Add the building to the parcel
      dispatch(
        setFarmBuildingCount({
          parcelId: parcel.id,
          buildingId: id,
          count: building.count + 1,
        })
      );
    } else {
      console.log("Not enough money");
    }
  };

  const buyWarBuilding = (id: number, currentBalance: number) => {
    const warBuildings = parcel.warBuildings;
    const building = warBuildings.find(
      (building) => building.building.id === id
    );

    if (building && building.building.price <= currentBalance) {
      // Pay the money
      dispatch(decrementMoney(building.building.price));

      // Add the building to the parcel
      dispatch(
        setWarBuildingCount({
          parcelId: parcel.id,
          buildingId: id,
          count: building.count + 1,
        })
      );
      dispatch(
        addParcelSoldiers({
          id: parcel.id,
          soldiers: building.building.soldiers,
        })
      );
    } else {
      console.log("Not enough money");
    }
  };
  return (
    <div className={pageStyles.page}>
      <div>Parcel management bar</div>
      <Divider />
      <div>
        <h3>Farm buildings</h3>
        <ResponsiveGridLayout
          layouts={getLayouts(parcel.farmBuildings, getFarmBuildingsLayout)}
        >
          {parcel.farmBuildings.map((building) => (
            <div className={styles.gridItem} key={building.building.id}>
              <FarmBuilding
                title={building.building.name}
                count={building.count}
                price={building.building.price}
                individualIncome={building.building.moneyPerTick}
                income={building.building.moneyPerTick * building.count}
                disabled={building.building.price > money}
                handleBuy={() => buyFarmBuilding(building.building.id, money)}
              />
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
      <Divider />
      <div>
        <h3>War buildings</h3>
        <ResponsiveGridLayout
          layouts={getLayouts(parcel.warBuildings, getWarBuildingsLayout)}
        >
          {parcel.warBuildings.map((building) => (
            <div className={styles.gridItem} key={building.building.id}>
              <WarBuilding
                title={building.building.name}
                count={building.count}
                price={building.building.price}
                soldiers={building.building.soldiers}
                individualCost={building.building.costPerTick}
                costPerTurn={building.building.costPerTick * building.count}
                disabled={building.building.price > money}
                handleBuy={() => buyWarBuilding(building.building.id, money)}
              />
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};
