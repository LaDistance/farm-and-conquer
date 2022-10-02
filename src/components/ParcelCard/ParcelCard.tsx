import { Button, Card } from "antd";
import { Link } from "react-router-dom";
import { Parcel } from "../../types/Parcel";

export const ParcelCard = ({ parcel }: { parcel: Parcel }) => {
  return (
    <Card title={`Parcel ${parcel.id}`}>
      {" "}
      <Link to={`/parcel/${parcel.id}`}>
        <Button>Manage this parcel</Button>
      </Link>
    </Card>
  );
};
