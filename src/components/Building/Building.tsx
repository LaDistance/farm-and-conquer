import { Button, Card } from "antd";
import styles from "./Building.module.scss";
export const Building = ({
  title,
  count,
  price,
  individualIncome,
  income,
  disabled,
  handleBuy,
}: {
  title: string;
  count: number;
  price: number;
  individualIncome: number;
  income: number;
  disabled: boolean;
  handleBuy: () => void;
}) => {
  return (
    <div style={{ height: "100%" }}>
      <Card className={styles.buildingCard} title={title}>
        <div className={styles.info}>
          <span>Owned : {count}</span>
          <span>Income per building : {individualIncome} </span>
          <span>Total income per turn : {income} </span>
        </div>
        <div className={styles.buttons}>
          <Button disabled={disabled} onClick={handleBuy}>
            Buy for {price} pognons !
          </Button>
        </div>
      </Card>
    </div>
  );
};
