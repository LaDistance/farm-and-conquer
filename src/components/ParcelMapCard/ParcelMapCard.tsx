import { Button, Card, Modal } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Parcel } from "../../types/Parcel";
import { AttackModal } from "../AttackModal/AttackModal";
import styles from "./ParcelMapCard.module.scss";

export const ParcelMapCard = ({
  parcel,
  owner,
  isNeighbor,
}: {
  parcel: Parcel;
  owner: number;
  isNeighbor: boolean;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [attackedParcel, setAttackedParcel] = useState<Parcel | null>(null);
  const handleAttackButton = () => {
    // Open the attack modal
    setAttackedParcel(parcel);
    setModalOpen(true);
  };
  return (
    <>
      <div style={{ height: "100%" }}>
        <Card className={styles.parcelMapCard} title={`Parcel ${parcel.id}`}>
          <div className={styles.parcelMapCardContent}>
            <div className={styles.info}>
              <span>Current soldiers : {parcel.soldiers} </span>
            </div>
            <div className={styles.buttons}>
              {owner === 1 ? (
                <Link to={`/parcel/${parcel.id}`}>
                  <Button type="primary">Manage this parcel</Button>
                </Link>
              ) : isNeighbor ? (
                <>
                  <Button type="primary" danger onClick={handleAttackButton}>
                    Attack this parcel
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Card>
      </div>
      <AttackModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        attackedParcel={attackedParcel}
        setAttackedParcel={setAttackedParcel}
      />
    </>
  );
};
