import { Parcel } from "./Parcel";

export type Level = {
  id: number;
  name: string;
  description: string;
  parcels: Parcel[];
  ownedParcels: number[];
};
