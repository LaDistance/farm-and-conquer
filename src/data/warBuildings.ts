import { WarBuilding } from "../types/WarBuilding";

export const warBuildings: WarBuilding[] = [
  {
    id: 1,
    name: "Barracks",
    costPerTick: 20,
    soldiers: 20,
    price: 100,
  },
  {
    id: 2,
    name: "Small fort",
    costPerTick: 1_100,
    soldiers: 1_100,
    price: 5_000,
  },
  {
    id: 3,
    name: "Bastion",
    costPerTick: 2_500,
    soldiers: 2_500,
    price: 10_000,
  },
  {
    id: 4,
    name: "Bunker",
    costPerTick: 5_500,
    soldiers: 5_500,
    price: 20_000,
  },
  {
    id: 5,
    name: "Huge war camp",
    costPerTick: 30_000,
    soldiers: 30_000,
    price: 100_000,
  },
];

export const initializeWarBuildings = () => {
  return warBuildings.map((warBuilding) => ({
    building: warBuilding,
    count: 0,
  }));
};
