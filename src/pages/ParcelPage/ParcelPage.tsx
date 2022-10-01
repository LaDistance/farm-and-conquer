import { Button } from "antd";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectParcelFarmBuildings,
  selectParcels,
  setParcelFarmBuildings,
} from "../../features/parcels/parcelsSlice";
import { farmBuildings } from "../../data/farmBuildings";
import { decrementMoney, selectMoney } from "../../features/money/moneySlice";
import { Building } from "../../components/Building/Building";

export const ParcelPage = () => {
  const { parcelId } = useParams<{ parcelId: string }>();
  const parcels = useAppSelector(selectParcels);
  const money = useAppSelector(selectMoney);

  const dispatch = useAppDispatch();
  if (!parcelId) {
    return <div>Invalid parcel id</div>;
  }
  const parcel = parcels.find(
    (parcel) => parcel.id === Number.parseInt(parcelId)
  );

  if (!parcel) {
    return <div>This parcel does not exist.</div>;
  }

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
        setParcelFarmBuildings({
          id: parcel.id,
          farmBuildings: [
            ...farmBuildings,
            {
              building: building.building,
              count: building.count + 1,
            },
          ],
        })
      );
    } else {
      console.log("Not enough money");
    }
  };

  return (
    <div>
      <span>Parcel n°{parcel.id}</span>
      <span>The Parcel UI will be here.</span>
      {parcel.farmBuildings.map((building) => (
        <Building title={building.building.name} count={building.count} />
      ))}
      <Button type="primary" onClick={() => buyBuilding(1, money)}>
        Buy a small farm
      </Button>
    </div>
  );
};
