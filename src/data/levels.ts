import { Layout, Layouts } from "react-grid-layout";
import { Level } from "../types/Level";
import { initializeFarmBuildings } from "./farmBuildings";
import { columns } from "./layouts";
import { initializeWarBuildings } from "./warBuildings";

export const levels: Level[] = [
  {
    id: 1,
    name: "Tutorial level",
    description:
      "The tutorial level, made to teach you the basics of the game.",
    initialMoney: 1000,
    // Add a win condition
    parcels: [
      {
        id: 1,
        x: 1,
        y: 1,
        farmBuildings: initializeFarmBuildings(),
        warBuildings: initializeWarBuildings(),
        soldiers: 2000,
        owner: 1,
      },
      {
        id: 2,
        x: 2,
        y: 1,
        farmBuildings: initializeFarmBuildings(),
        warBuildings: initializeWarBuildings(),
        soldiers: 2000,
        owner: 0,
      },
      {
        id: 3,
        x: 2,
        y: 2,
        farmBuildings: initializeFarmBuildings(),
        warBuildings: initializeWarBuildings(),
        soldiers: 2000,
        owner: 0,
      },
      {
        id: 4,
        x: 3,
        y: 2,
        farmBuildings: initializeFarmBuildings(),
        warBuildings: initializeWarBuildings(),
        soldiers: 2000,
        owner: 0,
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
