import { useCurrentMemberQuery } from '@/apis/queries/memberQueries';
import { useStudyCategoriesQuery } from '@/apis/queries/studyCategoryQueries';
import { PrevHeader } from '@/components/headers/PrevHeader';
import { Button } from '@/components/ui/button';
import { IStudyCategory } from '@/models/study.model';
import { useModalStore } from '@/stores/useModalStore';

export const SettingCategories = () => {
  const { data: currentMember } = useCurrentMemberQuery();
  const {
    data: categories,
    isPending,
    isError,
  } = useStudyCategoriesQuery(currentMember?.member_id);
  const openModal = useModalStore((state) => state.openModal);

  const onClickCreateCategoryHandler = () => {
    if (!currentMember) return;
    openModal('createCategory', { memberId: currentMember.member_id });
  };

  const onClickEditCategoryHandler = (category: IStudyCategory) => {
    if (!currentMember) return;
    openModal('editCategory', {
      memberId: currentMember.member_id,
      category: category,
    });
  };

  if (isPending) {
    return <div>loading...</div>;
  }
  if (!currentMember) {
    return <div>null member</div>;
  }
  if (isError) {
    return <div>error</div>;
  }

  return (
    <div className="md:rounded-md overflow-hidden pt-safe-offset-14 pb-safe-offset-14 relative">
      <PrevHeader
        to="/"
        rightButton={
          <Button type="button" onClick={onClickCreateCategoryHandler}>
            추가
          </Button>
        }
      />
      <div className="h-full py-4">
        <ul className="overflow-y-scroll scrollbar-hide">
          {categories.map((category) => {
            return (
              <li
                key={category.study_category_id}
                onClick={() => onClickEditCategoryHandler(category)}
                className="w-full py-3 px-2 text-foreground border-b font-semibold text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                {category.subject}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};