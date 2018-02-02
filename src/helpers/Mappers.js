export const getFinanceFlowToSend = (data) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  return {
    categoryId: '59f0efc7407b78332878b47a',
    userId: currentUser.id,
    spending: data.spending,
    description: data.description,
    dateCreated: data.dateCreated
  };
};
