import { getStorageUser } from './LocalStorage';

export const financeFlowToServerMapper = data => {
  return {
    category_id: data.category,
    user_id: getStorageUser().id,
    value: data.spending || data.profit,
    description: data.description,
    created_at: data.dateCreated
  };
};

export const financeFlowSpendingToTableMapper = data => {
  return Object.assign({}, financeFlowToTableMapper(data), {spending: data.value || undefined});
};

export const financeFlowProfitToTableMapper = data => {
  return Object.assign({}, financeFlowToTableMapper(data), {profit: data.value || undefined});
};

const financeFlowToTableMapper = data => {
  return {
    id: data.id || undefined,
    description: data.description || undefined,
    category: data.category && data.category.name ? data.category.name : undefined,
    dateCreated: data.created_at ? data.created_at.split(' ')[0] : undefined
  };
};
