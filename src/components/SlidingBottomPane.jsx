import React from 'react';
import { useTransition, config } from '@react-spring/web';
import BottomPane from './BottomPane';

function SlidingBottomPane({ activePane, setActivePane }) {
  const transitions = useTransition(activePane, {
    from: { y: 600 },
    enter: { y: 0 },
    leave: { y: 600 },
    config: config.slow,
  });

  return transitions((styles, item) => {
    return (
      item && (
        <BottomPane
          setActivePane={setActivePane}
          toRender={item.component}
          header={item.header}
          headerColor={item.headerColor}
          transitionStyles={styles}
        />
      )
    );
  });
}

export default SlidingBottomPane;
