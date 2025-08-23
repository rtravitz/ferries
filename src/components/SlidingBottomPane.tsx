import React from 'react';
import { useTransition, config } from '@react-spring/web';
import BottomPane from './BottomPane';
import { ActivePaneType, type ActivePane } from './ActivePaneWrapper';

interface SlidingBottomPaneProps {
  activePane: ActivePane;
  setActivePane: React.Dispatch<React.SetStateAction<ActivePane>>
}

function SlidingBottomPane({ activePane, setActivePane }: SlidingBottomPaneProps) {
  const transitions = useTransition(activePane, {
    from: { y: 600 },
    enter: { y: 0 },
    leave: { y: 600 },
    config: config.slow,
  });

  return transitions((styles, item) => {
    let headerColor;
    let dockHeader;
    if (item?.type === ActivePaneType.Vessel) {
      headerColor = item.headerColor;
    } else if (item?.type === ActivePaneType.Terminal) {
      dockHeader = item.dockHeader;
      headerColor = item.headerColor;
    }

    return (
      item && (
        <BottomPane
          setActivePane={setActivePane}
          toRender={item.component}
          header={item.header}
          headerColor={headerColor}
          dockHeader={dockHeader}
          transitionStyles={styles}
        />
      )
    );
  });
}

export default SlidingBottomPane;
