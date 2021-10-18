const getHistory = () => {
  return JSON.parse(localStorage.getItem("shorten_history")) || [];
};

const saveHistory = (newRow) => {
  localStorage.setItem(
    "shorten_history",
    JSON.stringify([...getHistory(), newRow])
  );
};

const clearHistory = () => {
  localStorage.setItem("shorten_history", JSON.stringify([]));
};

export { getHistory, saveHistory, clearHistory };
