import { Card } from "antd";
import { Parcel } from "../types/Parcel";

export const ParcelCard = ({ parcel }: { parcel: Parcel }) => {
  return <Card title={`Parcel ${parcel.id}`}></Card>;
};
