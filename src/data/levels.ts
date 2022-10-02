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
  {
    id: 2,
    name: "Second level",
    description: "Can you manage all of these at once ?",
    initialMoney: 1000,
    // Add a win condition
    parcels: [
      {
        id: 1,
        x: 0,
        y: 0,
        farmBuildings: initializeFarmBuildings(),
        warBuildings: initializeWarBuildings(),
        soldiers: 0,
        owner: 1,
      },
      {
        id: 2,
        x: 0,
        y: 1,
        farmBuildings: initializeFarmBuildings(),
        warBuildings: initializeWarBuildings(),
        soldiers: 20_000,
        owner: 0,
      },
      {
        id: 3,
        x: 0,
        y: 2,
        farmBuildings: initializeFarmBuildings(),
        warBuildings: initializeWarBuildings(),
        soldiers: 2000,
        owner: 0,
      },
      {
        id: 4,
        x: 0,
        y: 3,
        farmBuildings: initializeFarmBuildings(),
        warBuildings: initializeWarBuildings(),
        soldiers: 2000,
        owner: 0,
      },
      {
        id: 5,
        x: 1,
        y: 3,
        farmBuildings: initializeFarmBuildings(),
        warBuildings: initializeWarBuildings(),
        soldiers: 2000,
        owner: 0,
      },
      {
        id: 6,
        x: 2,
        y: 3,
        farmBuildings: initializeFarmBuildings(),
        warBuildings: initializeWarBuildings(),
        soldiers: 20_000,
        owner: 0,
      },
      {
        id: 7,
        x: 2,
        y: 2,
        farmBuildings: initializeFarmBuildings(),
        warBuildings: initializeWarBuildings(),
        soldiers: 2000,
        owner: 0,
      },
      {
        id: 8,
        x: 2,
        y: 1,
        farmBuildings: initializeFarmBuildings(),
        warBuildings: initializeWarBuildings(),
        soldiers: 2000,
        owner: 0,
      },
      {
        id: 9,
        x: 2,
        y: 0,
        farmBuildings: initializeFarmBuildings(),
        warBuildings: initializeWarBuildings(),
        soldiers: 2000,
        owner: 0,
      },
      {
        id: 10,
        x: 3,
        y: 0,
        farmBuildings: initializeFarmBuildings(),
        warBuildings: initializeWarBuildings(),
        soldiers: 20_000,
        owner: 0,
      },
      {
        id: 11,
        x: 4,
        y: 0,
        farmBuildings: initializeFarmBuildings(),
        warBuildings: initializeWarBuildings(),
        soldiers: 100_000,
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
