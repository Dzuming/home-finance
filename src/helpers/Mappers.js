import { getStorageUser} from './LocalStorage';

export const getFinanceFlowToSend = (data) => {
  return {
    categoryId: '59f0efc7407b78332878b47a',
    userId: getStorageUser().id,
    spending: data.spending,
    description: data.description,
    dateCreated: data.dateCreated
  };
};
