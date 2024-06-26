import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { formatTime } from '@/lib/date-format';
import { CDN_IMAGES } from '@/constants/cdn-images';

interface FinishSectionAlarmProps {
  earnedPoints: number;
}

export const FinishSectionAlarm = ({
  earnedPoints,
}: FinishSectionAlarmProps) => {
  const timerMode = useTimerOptionsStore((state) => state.timerMode);
  const pomodoroTime = useTimerOptionsStore((state) => state.pomodoroTime);
  const sectionCount = useTimerOptionsStore((state) => state.sectionCount);
  const duration = useTimerStateStore((state) => state.duration);

  const totalStudyTime =
    timerMode === 'normal' ? duration : pomodoroTime * sectionCount * 60;

  return (
    <div className={'w-full h-1/2 flex flex-col items-center justify-end'}>
      <Fireworks autorun={{ speed: 1, duration: 2000 }} />
      <img
        src={CDN_IMAGES.mascot.finish}
        alt="main"
        className={'w-1/2 aspect-square'}
      />
      {totalStudyTime < 60 ? (
        <div className="w-2/3 mx-auto text-center">
          <p>이야~~ {totalStudyTime}초나 집중하다니 정말 대단해!!!</p>
        </div>
      ) : (
        <div className="w-2/3 mx-auto text-center">
          <p>총 {formatTime(totalStudyTime)} 만큼 집중했습니다!</p>
          <p>충분한 휴식을 취해주세요.</p>
          <br />
          <p>{earnedPoints} 포인트를 획득했습니다.</p>
        </div>
      )}
    </div>
  );
};
