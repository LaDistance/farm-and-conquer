import { OwnedFarmBuilding } from "../types/OwnedFarmBuilding";

export const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

export const columns = { lg: 10, md: 8, sm: 4, xs: 2, xxs: 2 };

export const getLayout = (cols: number, farmBuildings: OwnedFarmBuilding[]) => {
  const layout = farmBuildings.map((farmBuilding, index) => ({
    i: farmBuilding.building.id.toString(),
    x: (index * 2) % cols,
    y: (index * 2) / cols,
    w: 2,
    h: 1,
  }));
  return layout;
};

export const getLayouts = (farmBuildings: OwnedFarmBuilding[]) => {
  const layouts = {
    lg: getLayout(columns.lg, farmBuildings),
    md: getLayout(columns.md, farmBuildings),
    sm: getLayout(columns.sm, farmBuildings),
    xs: getLayout(columns.xs, farmBuildings),
    xxs: getLayout(columns.xxs, farmBuildings),
  };
  return layouts;
};
