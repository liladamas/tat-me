export function computeDeposit(total: number, percentage = 0.60) {
  const round = (n: number) => Math.round(n * 100) / 100;
  const deposit = round(total * percentage);
  const balance = round(total - deposit);
  
  return { total: round(total), deposit, balance, percentage };
}