export const getProdutosFromStorage = () => {
  return JSON.parse(localStorage.getItem("produtos")) || [];
};

export const saveProdutosToStorage = (produtos) => {
  localStorage.setItem("produtos", JSON.stringify(produtos));
};
