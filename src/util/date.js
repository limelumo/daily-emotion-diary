// 현재 날짜를 기본값으로 input(date)에 전달
export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
