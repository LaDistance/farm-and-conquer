import { Parcel } from "./Parcel";

export type Level = {
  id: number;
  name: string;
  description: string;
  initialMoney: number;
  parcels: Parcel[];
  ownedParcels: number[];
};
