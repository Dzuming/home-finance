import { getStorageUser } from './LocalStorage';

export const financeFlowToServerMapper = data => {
  return {
    categoryId: data.category,
    userId: getStorageUser().id,
    value: data.spending || data.profit,
    description: data.description,
    period: data.period,
  };
};

export const financeFlowSpendingToTableMapper = data => {
  return Object.assign({}, financeFlowToTableMapper(data), {
    spending: data.value || undefined,
  });
};

export const financeFlowProfitToTableMapper = data => {
  return Object.assign({}, financeFlowToTableMapper(data), {
    profit: data.value || undefined,
  });
};

const financeFlowToTableMapper = data => {
  return {
    id: data.id || undefined,
    description: data.description || undefined,
    category:
      data.category && data.category.name ? data.category.name : undefined,
    period: data.period || undefined,
  };
};
