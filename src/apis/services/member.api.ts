import { IStudyStreak } from './../../models/streak.model';
import { nestHttpRequest } from '../common/httpRequest';
import { ApiSuccessResponse } from '../interface/apiResponse.type';
import { IMember } from '@/models/member.model';
import { ICharacterInventory } from '@/models/character.model';
import { IStudyRecord } from '@/models/study.model';
import {
  IConsumableItemInventory,
  IFoodItemInventory,
} from '@/models/item.model';

// 현재유저 조회
export const fetchCurrentMember = async () => {
  const response = await nestHttpRequest.get<
    ApiSuccessResponse<{ member: IMember }>
  >('/timer-api/members/me');
  return response.data.data.member;
};

// 보유중인 음식 조회
export const fetchFoodInventory = async (memberId: string) => {
  const response = await nestHttpRequest.get<
    ApiSuccessResponse<{ item_inventory: IFoodItemInventory[] }>
  >(`/timer-api/members/${memberId}/item-inventory?item_type=${'Food'}`);
  return response.data.data.item_inventory;
};

// 보유중인 사용아이템 조회
export const fetchConsumableInventory = async (memberId: string) => {
  const response = await nestHttpRequest.get<
    ApiSuccessResponse<{ item_inventory: IConsumableItemInventory[] }>
  >(`/timer-api/members/${memberId}/item-inventory?item_type=${'Consumable'}`);
  return response.data.data.item_inventory;
};

// 보유중인 캐릭터 조회
export const fetchCharacterInventory = async (memberId: string) => {
  const response = await nestHttpRequest.get<
    ApiSuccessResponse<{ character_inventory: ICharacterInventory[] }>
  >(`/timer-api/members/${memberId}/character-inventory`);
  return response.data.data.character_inventory;
};

// 유저 스트릭 조회
export const fetchStudyStreak = async (memberId: string) => {
  const response = await nestHttpRequest.get<ApiSuccessResponse<IStudyStreak>>(
    `/timer-api/members/${memberId}/study-streak`
  );
  return response.data.data;
};

// 유저 공부기록 조회
export const fetchStudyRecords = async (memberId: string) => {
  const response = await nestHttpRequest.get<
    ApiSuccessResponse<{ study_records: IStudyRecord[] }>
  >(`/timer-api/members/${memberId}/study-records`);
  return response.data.data.study_records;
};
