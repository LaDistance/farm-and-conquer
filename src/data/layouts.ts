import { OwnedFarmBuilding } from "../types/OwnedFarmBuilding";
import { Parcel } from "../types/Parcel";

export const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

export const columns = { lg: 10, md: 8, sm: 4, xs: 2, xxs: 2 };

export const getFarmBuildingsLayout = (
  cols: number,
  farmBuildings: OwnedFarmBuilding[]
) => {
  const layout = farmBuildings.map((farmBuilding, index) => ({
    i: farmBuilding.building.id.toString(),
    x: (index * 2) % cols,
    y: (index * 2) / cols,
    w: 2,
    h: 1,
  }));
  return layout;
};

export const getLayouts = (
  array: any[],
  func: typeof getFarmBuildingsLayout | typeof getParcelsLayout
) => {
  const layouts = {
    lg: func(columns.lg, array),
    md: func(columns.md, array),
    sm: func(columns.sm, array),
    xs: func(columns.xs, array),
    xxs: func(columns.xxs, array),
  };
  return layouts;
};

export const getParcelsLayout = (cols: number, parcels: Parcel[]) => {
  console.warn("getParcelsLayout", parcels);
  const layout = parcels.map((parcel, index) => ({
    i: parcel.id.toString(),
    x: (index * 2) % cols,
    y: (index * 2) / cols,
    w: 2,
    h: 1,
  }));
  return layout;
};
