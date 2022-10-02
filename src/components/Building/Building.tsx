import { Button, Card } from "antd";
import styles from "./Building.module.scss";
export const Building = ({
  title,
  count,
  handleBuy,
}: {
  title: string;
  count: number;
  handleBuy: () => void;
}) => {
  return (
    <div style={{ height: "100%" }}>
      <Card className={styles.buildingCard} title={title}>
        <div>Logo</div>
        <span>Owned : {count}</span>
        <div>
          <Button onClick={handleBuy}>Buy</Button>
        </div>
      </Card>
    </div>
  );
};
