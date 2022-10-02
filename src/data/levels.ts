import { Layout, Layouts } from "react-grid-layout";
import { Level } from "../types/Level";
import { initializeFarmBuildings } from "./farmBuildings";
import { columns } from "./layouts";

export const levels = [
  {
    id: 1,
    name: "Tutorial level",
    description:
      "The tutorial level, made to teach you the basics of the game.",
    initialMoney: 1000,
    parcels: [
      {
        id: 1,
        x: 0,
        y: 1,
        farmBuildings: initializeFarmBuildings(),
        soldiers: 0,
      },
    ],
    ownedParcels: [1],
  },
];

const getLayout = (cols: number, levels: Level[]): Layout[] => {
  const layout = levels.map((level, index) => ({
    i: level.id.toString(),
    x: (index * 2) % cols,
    y: (index * 2) / cols,
    w: 2,
    h: 1,
  }));
  return layout;
};

export const getLevelsLayouts = (levels: Level[]): Layouts => {
  const layouts = {
    lg: getLayout(columns.lg, levels),
    md: getLayout(columns.md, levels),
    sm: getLayout(columns.sm, levels),
    xs: getLayout(columns.xs, levels),
    xxs: getLayout(columns.xxs, levels),
  };
  return layouts;
};
