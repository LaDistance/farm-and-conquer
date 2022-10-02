import styles from "./LevelChoice.module.scss";
import pageStyles from "../../styles/PageStyles.module.scss";
import { getLevelsLayouts, levels } from "../../data/levels";
import { LevelCard } from "../../components/LevelCard/LevelCard";
import { ResponsiveGridLayout } from "../../components/ResponsiveGridLayout/ResponsiveGridLayout";

export const LevelChoice = ({
  initializeGame,
}: {
  initializeGame: (level: number) => void;
}) => {
  const handleChooseLevel = (level: number) => {
    initializeGame(level);
  };
  return (
    <div className={pageStyles.page}>
      <h1>Level choice</h1>
      <div className={styles.levels}>
        <ResponsiveGridLayout layouts={getLevelsLayouts(levels)}>
          {levels.map((level) => (
            <div key={level.id}>
              <LevelCard level={level} handleChooseLevel={handleChooseLevel} />
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};
