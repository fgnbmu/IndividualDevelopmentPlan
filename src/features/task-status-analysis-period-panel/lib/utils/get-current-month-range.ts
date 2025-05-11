export const getCurrentMonthRange = (): string[] => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return [
    firstDay.toISOString().split('T')[0],
    lastDay.toISOString().split('T')[0]
  ];
}