export type Market = {
  country: string;
  currency: "USD" | "CAD" | "GBP";
  cities: { name: string; enabled: boolean; travelFee: number }[];
};

export const MARKETS: Market[] = [
  { 
    country: "US", 
    currency: "USD", 
    cities: [{ name: "New York", enabled: true, travelFee: 50 }] 
  },
  { country: "CA", currency: "CAD", cities: [] },
  { country: "GB", currency: "GBP", cities: [] },
];