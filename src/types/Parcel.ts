import { OwnedFarmBuilding } from "./OwnedFarmBuilding";
import { OwnedWarBuilding } from "./OwnedWarBuilding";

export type Parcel = {
  id: number;
  x: number;
  y: number;
  farmBuildings: OwnedFarmBuilding[];
  warBuildings: OwnedWarBuilding[];
  soldiers: number;
  owner: number;
};
