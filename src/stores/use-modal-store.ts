import { create } from 'zustand';

import type { ICharacter } from '@/types/models/character.model';
import type { IConsumableItemInventory, Item } from '@/types/models/item.model';
import type { IPalette } from '@/types/models/palette.model';

interface ModalState<T = undefined> {
  isOpen: boolean;
  data?: T;
}

type AlarmType = 'EndWork' | 'EndRest' | 'FinishSection' | 'GiveUpWork';

interface ModalsState {
  // 캐릭터 획득
  characterAcquisition: ModalState<{
    character: ICharacter;
  }>;
  // 팔레트 획득
  paletteAcquisition: ModalState<{
    palette: IPalette;
    consumableItemInventory: IConsumableItemInventory;
  }>;
  // 사용아이템 획득
  consumableItemAcquisition: ModalState<{
    item: Item;
  }>;
  // 포인트 획득
  pointAcquisition: ModalState<{
    earned_point: number; // 획득한 포인트
  }>;
  // 타이머
  timer: ModalState;
  timerAlarm: ModalState<{ alarmType: AlarmType }>;

  // 로그인 요구
  requireLogin: ModalState;

  // 앱 설치 안내
  appInstall: ModalState;
}

type ModalType = keyof ModalsState;

interface ModalStore {
  modals: ModalsState;
  openModal: <T>(modalType: ModalType, data?: T) => void;
  closeModal: (modalType: ModalType) => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
  modals: {
    characterAcquisition: { isOpen: false },
    paletteAcquisition: { isOpen: false },
    consumableItemAcquisition: { isOpen: false },
    pointAcquisition: { isOpen: false },
    timerAlarm: { isOpen: false },
    timer: { isOpen: false },
    requireLogin: { isOpen: false },
    appInstall: { isOpen: true },
  },
  openModal: (modalType, data) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalType]: { isOpen: true, data },
      },
    })),
  closeModal: (modalType) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalType]: { isOpen: false, data: null },
      },
    })),
}));
