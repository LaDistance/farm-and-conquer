import { useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
// CSS
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { breakpoints, columns } from "../../data/layouts";

export const ResponsiveGridLayout = ({
  children,
  layouts,
}: {
  children: JSX.Element[];
  layouts: ReactGridLayout.Layouts;
}) => {
  // Grid
  const ResponsiveReactGridLayout = useMemo(
    () => WidthProvider(Responsive),
    []
  );

  return (
    <ResponsiveReactGridLayout
      verticalCompact={true}
      layouts={layouts}
      breakpoints={breakpoints}
      preventCollision={false}
      cols={columns}
      rowHeight={220}
      autoSize={true}
      isDraggable={false}
      isResizable={false}
      margin={{
        lg: [20, 20],
        md: [20, 20],
        sm: [20, 20],
        xs: [20, 20],
        xxs: [20, 20],
      }}
    >
      {children}
    </ResponsiveReactGridLayout>
  );
};
