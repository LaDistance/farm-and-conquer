import { FarmBuilding } from "../types/FarmBuilding";

export const farmBuildings: FarmBuilding[] = [
  {
    id: 1,
    name: "Small farm",
    moneyPerTick: 20,
    price: 100,
  },
  {
    id: 2,
    name: "Barn",
    moneyPerTick: 1_100,
    price: 5_000,
  },
  {
    id: 3,
    name: "Mill",
    moneyPerTick: 2_500,
    price: 10_000,
  },
  {
    id: 4,
    name: "Bakery",
    moneyPerTick: 5_500,
    price: 20_000,
  },
  {
    id: 5,
    name: "Hunter's Lodge",
    moneyPerTick: 30_000,
    price: 100_000,
  },
];

export const initializeFarmBuildings = () => {
  return farmBuildings.map((farmBuilding) => ({
    building: farmBuilding,
    count: 0,
  }));
};
