import { Button, Card } from "antd";
import styles from "./WarBuilding.module.scss";
export const WarBuilding = ({
  title,
  count,
  price,
  soldiers,
  individualCost,
  costPerTurn,
  disabled,
  handleBuy,
}: {
  title: string;
  count: number;
  price: number;
  soldiers: number;
  individualCost: number;
  costPerTurn: number;
  disabled: boolean;
  handleBuy: () => void;
}) => {
  return (
    <div style={{ height: "100%" }}>
      <Card className={styles.buildingCard} title={title}>
        <div className={styles.info}>
          <span>Owned : {count}</span>
          <span>Soldiers per building : {soldiers}</span>
          <span>Cost per turn per building : {individualCost} </span>
          <span>Total Cost per turn : {costPerTurn} </span>
        </div>
        <div className={styles.buttons}>
          <Button type="primary" disabled={disabled} onClick={handleBuy}>
            Buy for {price} pognons !
          </Button>
        </div>
      </Card>
    </div>
  );
};
