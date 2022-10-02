import { Button, Card } from "antd";
import { Link } from "react-router-dom";
import { Parcel } from "../../types/Parcel";
import styles from "./ParcelCard.module.scss";
import cardStyles from "../../styles/CardStyles.module.scss";
export const ParcelCard = ({ parcel }: { parcel: Parcel }) => {
  return (
    <div style={{ height: "100%" }}>
      <Card className={cardStyles.card} title={`Parcel ${parcel.id}`}>
        {" "}
        <Link to={`/parcel/${parcel.id}`}>
          <Button type="primary">Manage this parcel</Button>
        </Link>
      </Card>
    </div>
  );
};
