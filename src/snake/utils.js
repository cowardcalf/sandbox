const getPlaygroundRect = () => {
  const playground = document.getElementById("playground");
  return playground.getClientRects()[0];
};

const updateElementPositionById = (id, left, top) => {
  const ele = document.getElementById(id);
  ele.style.left = `${left}px`;
  ele.style.top = `${top}px`;
};

export { getPlaygroundRect, updateElementPositionById };
