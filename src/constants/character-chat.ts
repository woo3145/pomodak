const commonMessages = [
  '저를 클릭해보세요!',
  '날씨가 좋네요~',
  '오늘도 화이팅!',
  '다양한 캐릭터를 수집해보세요!',
  '함께 공부할까요?',
];

export const CHARACTER_CHATS = {
  Visitor: [
    '로그인을 해주세요 ㅜㅜ',
    '로그인 하고 여러 캐릭터를 만나보세요!',
    '로그인 얼마 안걸려요 ㅜㅜ',
  ],
  Normal: [...commonMessages, '뽀모도로 모드를 사용해보세요!'],
  Work: [...commonMessages, '25분이 효율이 가장 좋대요!', '온전히 집중하기!!'],
  Rest: [
    '잠깐 쉬는 시간이에요~',
    '조금만 쉬어요~~',
    '잠깐 머리를 식혀요',
    '지쳤어요 ㅜㅜ',
    '쓰러졌다!!',
    '조금만 쉬고 다시 화이팅해요!',
  ],
};
