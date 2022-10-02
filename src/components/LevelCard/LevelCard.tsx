import { Button, Card } from "antd";
import { Level } from "../../types/Level";
import styles from "./LevelCard.module.scss";
export const LevelCard = ({
  level,
  handleChooseLevel,
}: {
  level: Level;
  handleChooseLevel: (level: number) => void;
}) => {
  return (
    <Card title={level.name} className={styles.levelCard}>
      <div className={styles.levelCardContent}>
        <Button type="primary" onClick={() => handleChooseLevel(level.id)}>
          Play this level
        </Button>
      </div>
    </Card>
  );
};
