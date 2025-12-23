import useMeasure from 'react-use-measure';
import { useDrag } from '@use-gesture/react';
import { a, useSpring, config, SpringValue } from '@react-spring/web';
import type { ActivePane } from './ActivePaneWrapper';

interface BottomPaneProps {
  header: string;
  setActivePane: React.Dispatch<React.SetStateAction<ActivePane>>
  headerColor?: string;
  dockHeader?: boolean;
  toRender: React.ReactElement;
  transitionStyles: { y: SpringValue<number> };
}

export default function BottomPane({ header, headerColor, toRender, setActivePane, transitionStyles, dockHeader }: BottomPaneProps) {
  const color = headerColor || 'bg-ferry-green';
  const paneRounded = dockHeader ? '' : 'md:rounded-lg';

  const [ref, { height }] = useMeasure();
  const [{ y }, api] = useSpring(() => ({ y: height }));

  const open = ({ canceled }: { canceled: boolean }) => {
    api.start({ y: 0, immediate: false, config: canceled ? config.wobbly : config.stiff });
  };
  const close = (velocity = 0) => {
    api.start({ y: height, immediate: false, config: { ...config.stiff, velocity } });
    setTimeout(() => {
      setActivePane(null);
    }, 100);
  };

  const bind = useDrag(
    ({ last, down, velocity: [, vy], movement: [, my], cancel, canceled }) => {
      if (my < -60) {
        cancel();
      }

      if (last) {
        const shouldClose = my > 0 && (my > height * 0.5 || vy > 0.6);
        shouldClose ? close(vy) : open({ canceled });
      } else {
        api.start({ y: down ? my : 0, immediate: down });
      }
    },
    {
      axis: 'y',
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    },
  );

  const ferryPaneHeader = (
    <>
      <div className={`${color} bg-center bg-contain bg-no-repeat h-20 flex flew-row justify-center items-center`}>
        <h1 className={`font-sans font-bold text-xl text-gray-200 mt-6 text-center`}>{header}</h1>
      </div>
    </>
  );

  const terminalPaneHeader = (
    <>
      <div className={`bg-green-brand py-2 md:rounded-t-lg flex flew-row justify-center items-center`}>
        <h1 className={`font-sans font-bold text-xl text-gray-200 text-center`}>{header}</h1>
      </div>
    </>
  );

  const toShowPane = dockHeader ? terminalPaneHeader : ferryPaneHeader;

  return (
    <a.section
      className="fixed -bottom-20 z-[900] w-full md:max-w-md md:inset-x-0 md:mx-auto"
      style={{ ...transitionStyles }}
    >
      <a.div ref={ref} {...bind()} style={{ y, touchAction: 'none' }}>
        {toShowPane}
        <div className={`${paneRounded} overflow-hidden`}>{toRender}</div>
        <div className="h-20 bg-gray-transparent-200" />
      </a.div>
    </a.section>
  );
}
