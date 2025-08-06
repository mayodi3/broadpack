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
}

export const rooms: Room[] = [
  {
    name: "Junior Suite",
    price: 1000,
    beds: 3,
    bathrooms: 2,
    wifi: true,
    tv: true,
    ac: true,
    dinner: true,
    images: ["/room.webp"],
    shortDescription:
      "A spacious and elegant suite perfect for families or small groups.",
    description:
      "Our Junior Suite offers ample space with modern furnishings and a touch of Kenyan elegance. It features three comfortable beds, two full bathrooms, high-speed Wi-Fi, a flat-screen TV, and includes complimentary dinner service. Ideal for guests seeking extra comfort and convenience during their stay.",
    status: "available",
    laundry: true,
    averageRating: 5,
  },
  {
    name: "Executive Suite",
    price: 5000,
    beds: 1,
    bathrooms: 1,
    wifi: true,
    tv: true,
    ac: true,
    dinner: true,
    images: ["/room.webp"],
    shortDescription:
      "A luxurious suite designed for the discerning business traveler.",
    description:
      "The Executive Suite provides a perfect blend of luxury and functionality. It features a king-sized bed, a dedicated workspace, and a modern bathroom. Enjoy premium amenities including complimentary dinner, high-speed Wi-Fi, and a large flat-screen TV.",
    status: "occupied",
    laundry: true,
    averageRating: 3,
  },
  {
    name: "Super Deluxe",
    price: 2000,
    beds: 2,
    bathrooms: 2,
    wifi: true,
    tv: true,
    ac: true,
    dinner: true,
    images: ["/room.webp"],
    shortDescription: "Experience superior comfort in our Super Deluxe room.",
    description:
      "The Super Deluxe room is designed for ultimate relaxation, featuring two plush beds and two modern bathrooms. Guests can enjoy a full range of amenities including complimentary dinner, ensuring a comfortable and memorable stay.",
    status: "available",
    laundry: true,
    averageRating: 4,
  },
  {
    name: "Standard Queen Room",
    price: 12000,
    beds: 1,
    bathrooms: 1,
    wifi: true,
    tv: true,
    ac: true,
    laundry: false,
    dinner: false,
    images: ["/room.webp"],
    shortDescription: "Cozy queen bed room with city view.",
    description:
      "Our Standard Queen Room features a comfortable queen-sized bed, en-suite bathroom, complimentary Wi-Fi, flat-screen TV, and air conditioning. Perfect for solo travelers or couples seeking comfort on a budget.",
    status: "available",
    averageRating: 4.2,
  },
  {
    name: "Deluxe Double Room",
    price: 18000,
    beds: 2,
    bathrooms: 1,
    wifi: true,
    tv: true,
    ac: true,
    laundry: true,
    dinner: false,
    images: ["/room.webp"],
    shortDescription: "Spacious double room with extras.",
    description:
      "Enjoy extra space in our Deluxe Double Room, featuring two double beds, a work desk, en-suite bathroom, high-speed Wi-Fi, flat-screen TV, air conditioning, and complimentary laundry service.",
    status: "available",
    averageRating: 4.6,
  },
  {
    name: "Executive Suite",
    price: 30000,
    beds: 1,
    bathrooms: 1,
    wifi: true,
    tv: true,
    ac: true,
    laundry: true,
    dinner: true,
    images: ["/room.webp"],
    shortDescription: "Roomy suite with dinner included.",
    description:
      "The Executive Suite includes a king-sized bed, separate sitting area, premium toiletries, complimentary dinner for two, laundry service, high-speed Wi-Fi, flat-screen TV, and full air conditioning.",
    status: "available",
    averageRating: 4.9,
  },
];
