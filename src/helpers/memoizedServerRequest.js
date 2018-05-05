export const memoizedServerRequest = (type, data) => {
  return {
    READ_SPENDING: isDataInStore(data.financeFlow.spending),
    READ_PROFIT: isDataInStore(data.financeFlow.profit),
    SET_CATEGORIES: isDataInStore(data.financeFlow.categories),
  }[type];
};

const isDataInStore = data => {
  return data.length > 0;
};
