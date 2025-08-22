interface Room {
  name: string;
  price: number;
  beds: number;
  bathrooms: number;
  wifi: boolean;
  tv: boolean;
  ac: boolean;
  laundry: boolean;
  dinner: boolean;
  images: string[];
  shortDescription: string;
  description: string;
  status: string;
  averageRating?: number;
  breakfast?: boolean;
}

export const rooms: Room[] = [
  {
    name: "Deluxe Room - Bed Only",
    price: 2500,
    beds: 2,
    bathrooms: 1,
    wifi: true,
    tv: true,
    ac: true,
    laundry: true,
    dinner: false,
    images: ["/room.webp"],
    shortDescription: "Spacious deluxe room with modern amenities.",
    description:
      "Our Deluxe Room offers a comfortable stay with two double beds, en-suite bathroom, high-speed Wi-Fi, flat-screen TV, and air conditioning. Late checkout available until midday.",
    status: "available",
    averageRating: 4.6,
  },
  {
    name: "Deluxe Room - Bed & Breakfast",
    price: 3000,
    beds: 2,
    bathrooms: 1,
    wifi: true,
    tv: true,
    ac: true,
    laundry: true,
    dinner: false,
    breakfast: true,
    images: ["/room.webp"],
    shortDescription: "Deluxe room with breakfast included.",
    description:
      "Enjoy our Deluxe Room with a delicious breakfast included. Features two double beds, en-suite bathroom, high-speed Wi-Fi, flat-screen TV, and air conditioning. Late checkout available until midday.",
    status: "available",
    averageRating: 4.6,
  },
  {
    name: "Executive Room - Bed Only",
    price: 3000,
    beds: 1,
    bathrooms: 1,
    wifi: true,
    tv: true,
    ac: true,
    laundry: true,
    dinner: false,
    images: ["/room.webp"],
    shortDescription: "Elegant executive room for business travelers.",
    description:
      "Our Executive Room features a king-sized bed, work desk, en-suite bathroom, high-speed Wi-Fi, flat-screen TV, and air conditioning. Late checkout available until midday.",
    status: "available",
    averageRating: 4.9,
  },
  {
    name: "Executive Room - Bed & Breakfast",
    price: 3500,
    beds: 1,
    bathrooms: 1,
    wifi: true,
    tv: true,
    ac: true,
    laundry: true,
    dinner: false,
    breakfast: true,
    images: ["/room.webp"],
    shortDescription: "Executive room with breakfast included.",
    description:
      "The Executive Room with breakfast includes a king-sized bed, work desk, en-suite bathroom, high-speed Wi-Fi, flat-screen TV, and air conditioning. Enjoy a complimentary breakfast during your stay. Late checkout available until midday.",
    status: "available",
    averageRating: 4.9,
  },
];
