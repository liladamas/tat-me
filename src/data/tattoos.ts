export type TattooEntry = {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  imagePath: string;
  basePrice?: number;
  currency?: string;
};

const getImagePath = (num: number) => `/images/tatme%20(${num}).jpg`;

export const TATTOOS: TattooEntry[] = [
  // BATCH 1 (1-20)
  { slug: "tatme-1", title: "Floral Shoulder Sleeve", imagePath: getImagePath(1), category: "Black and Grey", basePrice: 200 },
  { slug: "tatme-2", title: "Purple Butterfly Thigh", imagePath: getImagePath(2), category: "Color Realism", basePrice: 250 },
  { slug: "tatme-3", title: "Family Hands & Dates", imagePath: getImagePath(3), category: "Fine Line", basePrice: 150 },
  { slug: "tatme-4", title: "Octopus Full Back", imagePath: getImagePath(4), category: "Realism", basePrice: 1000 },
  { slug: "tatme-5", title: "Owl & Rose Sketch", imagePath: getImagePath(5), category: "Illustrative", basePrice: 300 },
  { slug: "tatme-6", title: "Peacock Feather Hip", imagePath: getImagePath(6), category: "Color Realism", basePrice: 250 },
  { slug: "tatme-7", title: "Lilies & Script Back", imagePath: getImagePath(7), category: "Black and Grey", basePrice: 500 },
  { slug: "tatme-8", title: "Mini Fine Line Collection", imagePath: getImagePath(8), category: "Fine Line", basePrice: 100 },
  { slug: "tatme-9", title: "Butterfly Face Calf", imagePath: getImagePath(9), category: "Realism", basePrice: 350 },
  { slug: "tatme-10", title: "Lioness & Flowers Spine", imagePath: getImagePath(10), category: "Black and Grey", basePrice: 400 },
  { slug: "tatme-11", title: "Leopard & Lilies Sleeve", imagePath: getImagePath(11), category: "Realism", basePrice: 500 },
  { slug: "tatme-12", title: "Portrait & Floral Sleeve", imagePath: getImagePath(12), category: "Black and Grey", basePrice: 500 },
  { slug: "tatme-13", title: "Tiger & Woman Full Back", imagePath: getImagePath(13), category: "Realism", basePrice: 1000 },
  { slug: "tatme-14", title: "Wolf & Forest Sleeve", imagePath: getImagePath(14), category: "Black and Grey", basePrice: 500 },
  { slug: "tatme-15", title: "Wolf & Family Forearm", imagePath: getImagePath(15), category: "Realism", basePrice: 300 },
  { slug: "tatme-16", title: "Daddy's Girl Tribute", imagePath: getImagePath(16), category: "Lettering", basePrice: 200 },
  { slug: "tatme-17", title: "Faith & Wolf Sleeve", imagePath: getImagePath(17), category: "Black and Grey", basePrice: 500 },
  { slug: "tatme-18", title: "Wolf Reflection", imagePath: getImagePath(18), category: "Realism", basePrice: 350 },
  { slug: "tatme-19", title: "Color Portrait & Butterfly", imagePath: getImagePath(19), category: "Color Realism", basePrice: 600 },
  { slug: "tatme-20", title: "Falcon Full Back", imagePath: getImagePath(20), category: "Color Realism", basePrice: 1000 },

  // BATCH 2 (21-40)
  { slug: "tatme-21", title: "Tribal Cross Pattern", imagePath: getImagePath(21), category: "Tribal", basePrice: 200 },
  { slug: "tatme-22", title: "Praying Hands & Rosary", imagePath: getImagePath(22), category: "Black and Grey", basePrice: 300 },
  { slug: "tatme-23", title: "Red Floral Thigh Piece", imagePath: getImagePath(23), category: "Color Realism", basePrice: 400 },
  { slug: "tatme-24", title: "Lion & Clock Sleeve", imagePath: getImagePath(24), category: "Realism", basePrice: 600 },
  { slug: "tatme-25", title: "Family Hearts & Dates", imagePath: getImagePath(25), category: "Fine Line", basePrice: 150 },
  { slug: "tatme-26", title: "Leopard & Blue Lilies", imagePath: getImagePath(26), category: "Color Realism", basePrice: 450 },
  { slug: "tatme-27", title: "Wolf, Compass & Mountains", imagePath: getImagePath(27), category: "Black and Grey", basePrice: 500 },
  { slug: "tatme-28", title: "Eagle & Compass Sleeve", imagePath: getImagePath(28), category: "Realism", basePrice: 600 },
  { slug: "tatme-29", title: "Generations Hands & Names", imagePath: getImagePath(29), category: "Fine Line", basePrice: 250 },
  { slug: "tatme-30", title: "Leopard Portrait Calf", imagePath: getImagePath(30), category: "Realism", basePrice: 350 },
  { slug: "tatme-31", title: "Fearless Eagle Shoulder", imagePath: getImagePath(31), category: "Black and Grey", basePrice: 400 },
  { slug: "tatme-32", title: "Fearless Eagle Shoulder (Alt)", imagePath: getImagePath(32), category: "Black and Grey", basePrice: 400 },
  { slug: "tatme-33", title: "Faith Cross Wrist", imagePath: getImagePath(33), category: "Lettering", basePrice: 100 },
  { slug: "tatme-34", title: "Panther Forearm", imagePath: getImagePath(34), category: "Realism", basePrice: 500 },
  { slug: "tatme-35", title: "Tropical Palm & Rose", imagePath: getImagePath(35), category: "Black and Grey", basePrice: 400 },
  { slug: "tatme-36", title: "Trust No One Typography", imagePath: getImagePath(36), category: "Lettering", basePrice: 200 },
  { slug: "tatme-37", title: "Anchor & Compass Back", imagePath: getImagePath(37), category: "Traditional", basePrice: 350 },
  { slug: "tatme-38", title: "Wolf & Clock Forearm", imagePath: getImagePath(38), category: "Realism", basePrice: 500 },
  { slug: "tatme-39", title: "Rose, Butterfly & Cross", imagePath: getImagePath(39), category: "Black and Grey", basePrice: 300 },
  { slug: "tatme-40", title: "Snake & Red Rose Back", imagePath: getImagePath(40), category: "Color Realism", basePrice: 450 },

  // BATCH 3 (41-59)
  { slug: "tatme-41", title: "Floral Mandala Back", imagePath: getImagePath(41), category: "Mandala", basePrice: 500 },
  { slug: "tatme-42", title: "Butterfly Spine Tattoo", imagePath: getImagePath(42), category: "Fine Line", basePrice: 250 },
  { slug: "tatme-43", title: "Cherry Blossom Spine", imagePath: getImagePath(43), category: "Color Realism", basePrice: 400 },
  { slug: "tatme-44", title: "Sacred Geometry Sleeve", imagePath: getImagePath(44), category: "Geometric", basePrice: 500 },
  { slug: "tatme-45", title: "Black and Grey Floral Back", imagePath: getImagePath(45), category: "Black and Grey", basePrice: 600 },
  { slug: "tatme-46", title: "Butterfly & Tribal Full Back", imagePath: getImagePath(46), category: "Tribal", basePrice: 800 },
  { slug: "tatme-47", title: "Cherub & Dove Portrait", imagePath: getImagePath(47), category: "Realism", basePrice: 700 },
  { slug: "tatme-48", title: "Tiger & Ink Splatter Hand", imagePath: getImagePath(48), category: "Realism", basePrice: 300 },
  { slug: "tatme-49", title: "Double Butterflies Back", imagePath: getImagePath(49), category: "Black and Grey", basePrice: 350 },
  { slug: "tatme-50", title: "Red Rose & Snake", imagePath: getImagePath(50), category: "Color Realism", basePrice: 450 },
  { slug: "tatme-51", title: "Butterfly & Lace Back", imagePath: getImagePath(51), category: "Ornamental", basePrice: 500 },
  { slug: "tatme-52", title: "Black and Grey Flowers", imagePath: getImagePath(52), category: "Black and Grey", basePrice: 350 },
  { slug: "tatme-53", title: "Floral Mandala Sleeve", imagePath: getImagePath(53), category: "Mandala", basePrice: 400 },
  { slug: "tatme-54", title: "Fine Line Butterfly Set", imagePath: getImagePath(54), category: "Fine Line", basePrice: 200 },
  { slug: "tatme-55", title: "Colorful Butterfly Back", imagePath: getImagePath(55), category: "Color Realism", basePrice: 600 },
  { slug: "tatme-56", title: "Minimalist Rose Line", imagePath: getImagePath(56), category: "Fine Line", basePrice: 150 },
  { slug: "tatme-57", title: "Abstract Geometric", imagePath: getImagePath(57), category: "Geometric", basePrice: 250 },
  { slug: "tatme-58", title: "Traditional Eagle", imagePath: getImagePath(58), category: "Traditional", basePrice: 400 },
  { slug: "tatme-59", title: "Custom Portrait Sketch", imagePath: getImagePath(59), category: "Realism", basePrice: 450 },
];