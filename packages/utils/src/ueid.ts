export const generateUEID = () => {
  let first: string | number = (Math.random() * 46656) | 0;
  let second: string | number = (Math.random() * 46656) | 0;
  first = ("000" + first.toString(36)).slice(-3);
  second = ("000" + second.toString(36)).slice(-3);
  return first + second;
};

export const generateTimestampId = (id?: string, frequency = 1500) =>
  `${id || generateUEID()}::${Math.round(Date.now() / frequency)}`; // generates a different timestamp approx every 1.5-2 seconds
