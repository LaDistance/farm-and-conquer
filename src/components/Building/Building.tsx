import { Card } from "antd";
import styles from "./Building.module.scss";
export const Building = ({
  title,
  count,
}: {
  title: string;
  count: number;
}) => {
  return (
    <div>
      <Card className={styles.buildingCard} title={title}>
        <div>Logo</div>
        <span>Owned : {count}</span>
        <div>Buttons</div>
      </Card>
    </div>
  );
};
