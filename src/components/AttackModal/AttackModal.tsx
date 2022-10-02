import {
  Button,
  Divider,
  InputNumber,
  Modal,
  Radio,
  RadioChangeEvent,
  Space,
} from "antd";
import { Dispatch, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectParcels,
  setParcelSoldiers,
} from "../../features/parcels/parcelsSlice";
import { Parcel } from "../../types/Parcel";
import { getUserParcelsNextTo } from "../../util/util";
import styles from "./AttackModal.module.scss";
export const AttackModal = ({
  isModalOpen,
  setModalOpen,
  attackedParcel,
  setAttackedParcel,
}: {
  isModalOpen: boolean;
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
  attackedParcel: Parcel | null;
  setAttackedParcel: Dispatch<React.SetStateAction<Parcel | null>>;
}) => {
  const [confirmation, setConfirmation] = useState(false);
  const [soldiersToSend, setSoldiersToSend] = useState(0);
  const [parcelToSendFrom, setParcelToSendFrom] = useState<Parcel | null>();
  const parcels = useAppSelector(selectParcels);
  const dispatch = useAppDispatch();
  if (!attackedParcel) return <></>;

  const availableParcelsToAttackFrom = getUserParcelsNextTo(
    attackedParcel,
    parcels
  );
  const onParcelSelect = (e: RadioChangeEvent) => {
    setParcelToSendFrom(e.target.value);
  };

  const onSoldiersInputChange = (value: number | null): void | undefined => {
    if (value && value > 0 && value < parcelToSendFrom!.soldiers) {
      setSoldiersToSend(value);
    }
  };

  const handleAttackButton = () => {
    // Calculate the result of the attack
    // Win or lose ?
    const win =
      Math.random() * (soldiersToSend / attackedParcel.soldiers) > 0.5;

    // If lose:
    if (!win) {
      // wipe out the soldiers of the attacking parcel
      dispatch(setParcelSoldiers({ id: parcelToSendFrom!.id, soldiers: 0 }));
      // Kill part of the soldiers of the attacked parcel
      dispatch(
        setParcelSoldiers({
          id: attackedParcel.id,
          soldiers: attackedParcel.soldiers - soldiersToSend,
        })
      );
    }
    // if win
    else {
      // Remove the soldiers from the attacking parcel
      dispatch(
        setParcelSoldiers({
          id: parcelToSendFrom!.id,
          soldiers: parcelToSendFrom!.soldiers - soldiersToSend,
        })
      );
      // Set the soldiers of the attacked parcel to the soldiers sent - the ones killed
      dispatch(
        setParcelSoldiers({
          id: attackedParcel.id,
          soldiers: soldiersToSend - attackedParcel.soldiers,
        })
      );
      // Set the owner of the attacked parcel to the owner of the attacking parcel
      dispatch(
        setParcelOwner({
          id: attackedParcel.id,
          owner: parcelToSendFrom!.owner,
        })
      );
    }
  };
  return (
    <Modal
      title="Attack this parcel"
      open={isModalOpen}
      onCancel={() => {
        setAttackedParcel(null);
        setConfirmation(false);
        setModalOpen(false);
      }}
      footer={[]}
    >
      <div className={styles.attackModal}>
        {!confirmation ? (
          <>
            <p>Are you sure you want to attack this parcel ?</p>
            <Button type="primary" danger onClick={() => setConfirmation(true)}>
              Yes, I want to attack this parcel.
            </Button>
          </>
        ) : (
          <>
            <p> Which parcel do you want to attack from ?</p>
            <Radio.Group onChange={onParcelSelect} value={parcelToSendFrom}>
              <Space direction="vertical">
                {availableParcelsToAttackFrom.map((parcel) => (
                  <Radio value={parcel}>Parcel n°{parcel.id}</Radio>
                ))}
              </Space>
            </Radio.Group>
            {parcelToSendFrom && (
              <>
                <Divider />
                <p>How many soldiers do you want to send ?</p>
                <InputNumber
                  value={soldiersToSend}
                  onChange={onSoldiersInputChange}
                  max={parcelToSendFrom.soldiers}
                  min={1}
                />
                <Divider />
                <Button type="primary" danger onClick={handleAttackButton}>
                  Attack
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};
function setParcelOwner(arg0: { id: number; owner: number }): any {
  throw new Error("Function not implemented.");
}
