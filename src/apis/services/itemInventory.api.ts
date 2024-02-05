import { ICharacter } from '@/models/character.model';
import { springHttpRequest } from '../common/httpRequest';
import { ApiSuccessResponse } from '../interface/apiResponse.type';

// 음식 아이템 사용
export const consumeFoodItem = async (item_inventory_id: number) => {
  const response = await springHttpRequest.post<
    ApiSuccessResponse<{
      character_inventory_id: number;
      character: ICharacter;
    }>
  >(`/v2/item-inventory/${item_inventory_id}`);
  return response.data.data;
};