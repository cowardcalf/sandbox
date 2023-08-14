const getIntegerOfRange = (x, y) => (x < y - 1 ? [x + 1, ...getIntegerOfRange(x + 1, y)] : []);

export default getIntegerOfRange;
