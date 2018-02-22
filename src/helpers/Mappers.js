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

export const financeFlowProfitToServerMapper = data => {
  return {
    category_id: data.category,
    user_id: getStorageUser().id,
    value: data.profit,
    description: data.description,
    created_at: data.dateCreated
  };
};

export const financeFlowSpendingToTableMapper = data => {
  return {
    id: data.id || undefined,
    description: data.description || undefined,
    spending: data.value || undefined,
    category: data.category && data.category.name ? data.category.name : undefined,
    dateCreated: data.created_at? data.created_at.split(' ')[0] : undefined
  };
};

export const financeFlowProfitToTableMapper = data => {
  return {
    id: data.id || undefined,
    description: data.description || undefined,
    profit: data.value || undefined,
    category: data.category && data.category.name ? data.category.name : undefined,
    dateCreated: data.created_at? data.created_at.split(' ')[0] : undefined
  };
};
