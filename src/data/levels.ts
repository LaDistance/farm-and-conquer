import { initializeFarmBuildings } from "./farmBuildings";

export const levels = {
  1: {
    name: "Tutorial level",
    description:
      "The tutorial level, made to teach you the basics of the game.",
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
};
