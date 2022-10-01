import { OwnedFarmBuilding } from "./OwnedFarmBuilding";

export type Parcel = {
  id: number;
  x: number;
  y: number;
  farmBuildings: OwnedFarmBuilding[];
  soldiers: number;
};
