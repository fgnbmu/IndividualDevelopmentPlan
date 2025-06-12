export const getCurrentWeekRange = (): string[] => {
  const now = new Date();
  const diffToMonday = (now.getDay() === 0 ? -6 : 1 - now.getDay());
  const monday = new Date(now.setDate(now.getDate() + diffToMonday));
  const sunday = new Date(monday.valueOf());
  sunday.setDate(sunday.getDate() + 6);
  return [monday.toISOString().split('T')[0], sunday.toISOString().split('T')[0]];
};