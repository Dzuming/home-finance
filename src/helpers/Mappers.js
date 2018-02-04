import { getStorageUser } from './LocalStorage';

export const financeFlowSpendingToServerMapper = data => {
  return {
    category_id: data.category,
    user_id: getStorageUser().id,
    value: data.spending,
    description: data.description,
    created_at: data.dateCreated
  };
};
export const financeFlowSpendingToTableMapper = data => {
  return {
    id: data.id,
    description: data.description,
    spending: data.value,
    category: data.category.name,
    dateCreated: data.created_at.split(' ')[0]
  };
};
