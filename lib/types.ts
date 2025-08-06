export interface Room {
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

export interface RoomData {
  id: string;
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
  createdAt?: string;
  updatedAt?: string;
}

export interface Booking {
  roomId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  nights: number;
  status: string;
  totalPrice: number;
  specialRequest: string;
}

export interface Review {
  roomId: string;
  userId: string;
  rating: number;
  comment: string;
}

export interface UserProfile {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  county?: string;
  userId: string;
  profileImage?: string;
}

export interface Bookings {
  total: number;
  documents: Booking[];
}

export interface Blog {
  title: string;
  featuredImage: string;
  content: string;
  images: string[];
  excerpt: string;
  authorId: string;
  category: string;
  status?: string;
}

export interface Blogs {
  total: number;
  documents: Blog[];
}
