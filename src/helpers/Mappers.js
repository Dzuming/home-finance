import { getStorageUser} from './LocalStorage';

export const financeFlowSpendingMapper = (data) => {
  return {
    category_id: 1,
    user_id: getStorageUser().id,
    value: data.spending,
    description: data.description,
    created_at: data.dateCreated
  };
};
