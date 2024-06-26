import { CDN_IMAGES } from '@/constants/cdn-images';

interface EndWorkAlarmProps {
  earnedPoints: number;
}

export const EndWorkAlarm = ({ earnedPoints }: EndWorkAlarmProps) => {
  return (
    <div className={'w-full h-1/2 flex flex-col items-center justify-end'}>
      <img
        src={CDN_IMAGES.mascot.exhausted}
        alt="main"
        className={'w-1/2 aspect-square'}
      />

      <div className="w-2/3 mx-auto text-center">
        <p>닭이 지쳤습니다.</p>
        <p>조금 휴식을 취해주세요.</p>
        <br />
        <p>{earnedPoints} 포인트를 획득했습니다.</p>
      </div>
    </div>
  );
};
