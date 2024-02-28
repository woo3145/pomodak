import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { BASE_URL, KAKAO_REST_API_KEY } from '@/constants/constants';
// import { cn } from '@/lib/utils';
// import KakaoLogin from 'react-kakao-login';

export const KakaoLoginButton = () => {
  const REDIRECT_URL = `${BASE_URL}/auth/login/callback/kakao`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  //   return (
  //     <KakaoLogin
  //       token={KAKAO_REST_API_KEY}
  //       onSuccess={(res) => console.log(res)}
  //       onFail={(err) => console.log(err)}
  //       style={{ width: '100%' }}
  //       children={
  //         <div
  //           className={cn(
  //             buttonVariants({ variant: 'ghost' }),
  //             'w-full h-12 gap-4 bg-[#FEE500] hover:bg-[#FEE500]/80'
  //           )}
  //         >
  //           <Icons.kakao className="w-6 h-6" />
  //           <p className="text-black">카카오 로그인</p>
  //         </div>
  //       }
  //     />
  //   );

  return (
    <Button
      variant={'outline'}
      className="w-full h-12 gap-4 bg-[#FEE500] hover:bg-[#FEE500]/80"
      onClick={handleLogin}
    >
      <Icons.kakao className="w-6 h-6" />
      <p className="text-black">카카오 로그인</p>
    </Button>
  );
};
