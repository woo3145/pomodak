import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { useModalStore } from '@/stores/useModalStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSellCharacter } from './useSellCharacter';

export const SellCharacterDialog = () => {
  const { isOpen, data } = useModalStore((state) => state.modals.sellCharacter);
  const closeModal = useModalStore((state) => state.closeModal);

  const {
    isLoading,
    count,
    incrementCount,
    decrementCount,
    onSubmitSell,
    MaxCount,
  } = useSellCharacter(data ? data.characterInventory : null);

  if (!isOpen || !data) {
    return null;
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className={`w-full md:max-w-[416px] max-h-[400px] flex flex-col justify-start items-center pt-safe-offset-14`}
      >
        <div className="mx-auto w-full max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {data.characterInventory.character.name} 판매
            </DialogTitle>
            <DialogDescription>수량을 선택해주세요.</DialogDescription>
          </DialogHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={decrementCount}
                disabled={count <= 1}
              >
                <MinusIcon className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {count}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  개
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={incrementCount}
                disabled={count >= MaxCount}
              >
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={onSubmitSell} disabled={isLoading}>
              {isLoading ? '판매중 ...' : '판매하기'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => closeModal('sellCharacter')}
            >
              취소
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
