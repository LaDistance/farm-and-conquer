import { Button, Card } from "antd";
import { Parcel } from "../../types/Parcel";
import styles from "./ParcelMapCard.module.scss";

export const ParcelMapCard = ({
  parcel,
  owner,
}: {
  parcel: Parcel;
  owner: number;
}) => {
  return (
    <div style={{ height: "100%" }}>
      <Card className={styles.parcelMapCard} title={`Parcel ${parcel.id}`}>
        <div className={styles.parcelMapCardContent}>
          <div className={styles.info}>
            <span>Current soldiers : {parcel.soldiers} </span>
          </div>
          <div className={styles.buttons}>
            {owner === 1 ? (
              <Button type="primary">Manage this parcel</Button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
