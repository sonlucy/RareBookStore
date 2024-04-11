
export const formatDate = (dateString) => {
  const dateStringAsStr = dateString.toString(); // int -> string
  const year = dateStringAsStr.slice(0, 4);
  const month = dateStringAsStr.slice(4, 6);
  const day = dateStringAsStr.slice(6, 8);
  return `${year}-${month}-${day}`;
};
