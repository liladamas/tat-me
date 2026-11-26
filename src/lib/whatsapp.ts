import { BUSINESS } from "./config/business";

export function buildWhatsAppLink(b: {
  reference: string; tattoo: string; serviceType: string;
  country: string; city: string; when: string;
  total: string; deposit: string; balance: string;
}) {
  const msg = `Hello TAT-ME!\nI have completed a tattoo booking on your website.\n`
    + `Booking reference: ${b.reference}\nTattoo: ${b.tattoo}\n`
    + `Service type: ${b.serviceType}\nCountry: ${b.country}\nCity: ${b.city}\n`
    + `Preferred appointment: ${b.when}\nTotal booking price: ${b.total}\n`
    + `Deposit paid: ${b.deposit}\nRemaining balance: ${b.balance}\n`
    + `I would like to discuss the details of my booking.\nThank you.`;
    
  return `https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
}