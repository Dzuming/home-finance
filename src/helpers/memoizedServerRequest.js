export const memoizedServerRequest = (type, data) => {
  return {
    READ_SPENDING: isDataInStore(data.financeFlow.spending),
    READ_PROFIT: isDataInStore(data.financeFlow.profit),
  }[type];
};

const isDataInStore = data => {
  return data.length > 0;
};
