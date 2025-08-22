We have this latest data

Rooms & Rates

Deluxe

Bed Only (B.O): Sh. 2,500

Bed & Breakfast (B.B): Sh. 3,000

Executive

Bed Only (B.O): Sh. 3,000

Bed & Breakfast (B.B): Sh. 3,500

Notes

Remove Price: Sh. 1,000

Late Checkout: Midday

Based on this feedback above, I need you to change the necessary files for this change to take effect.

NB: We can have many Deluxe and Executive rooms

current ui

rooms/page.tsx
"use client";

import { Rating } from "@/components/rating";
import Hero from "@/components/shared/hero";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Bath, Bed, Wifi } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { rooms } from "./rooms";

const RoomsPage = () => {
const [currentPage, setCurrentPage] = useState(1);
const pageSize = 9;
const [total, setTotal] = useState(0);

const router = useRouter();

return (
<div>
<Hero />
<div className="w-full flex flex-col items-center justify-center space-y-4 mt-10">
<div className="space-y-4">
<h1 className="text-primary md:text-3xl flex items-center justify-center space-x-2">
<div className="h-1 w-14 md:w-28 bg-primary"></div>
<span>Our Rooms</span>
<div className="h-1 w-14 md:w-28 bg-primary"></div>
</h1>
<h1 className="text-3xl md:text-6xl font-extrabold">
Expore Our <span className="text-primary">Rooms</span>
</h1>
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="relative flex flex-col space-y-6 md:w-[360px] h-[520px] bg-amber-50 shadow-xl"
            >
              <div className="flex-5/12">
                <Image
                  src={room.images[0]} // Corrected from `/${room.images[0]}`
                  alt={room.shortDescription}
                  width={360}
                  height={250}
                  className="w-full h-[250px] object-cover"
                  priority
                />
              </div>

              <Button className="absolute left-3 top-[230px] rounded-none bg-primary">
                Ksh {room.price} / Night
              </Button>

              <div className="flex-7/12 flex flex-col justify-between p-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h1>{room.name}</h1>
                    <div className="flex">
                      <Rating rating={room.averageRating!} allowHalf />
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <div className="flex items-center space-x-1">
                        <Bed className="text-primary" />
                        <span className="text-gray-500"> {room.beds} Bed </span>
                      </div>
                      <span className="text-gray-500 ml-5">|</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center space-x-1">
                        <Bath className="text-primary" />
                        <span className="text-gray-500">
                          {room.bathrooms} Bath
                        </span>
                      </div>
                      <span className="text-gray-500 ml-5">|</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center space-x-1">
                        <Wifi className="text-primary" />
                        <span className="text-gray-500">Wifi</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p>{room.shortDescription}</p>

                <div className="flex justify-between">
                  <Button
                    className="rounded-none"
                    onClick={() => router.push(`/rooms/${index}`)}
                  >
                    VIEW DETAILS
                  </Button>
                  <Button
                    className="rounded-none bg-black"
                    onClick={() => router.push(`/auth/login`)}
                  >
                    BOOK NOW
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-3 m-10">
          <ArrowLeft
            className={`cursor-pointer bg-primary w-10 h-10 rounded-full ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }}
          />

          <span className="font-extrabold text-primary text-2xl">
            Page {currentPage} of {Math.ceil(total / pageSize)}
          </span>

          <ArrowRight
            className={`cursor-pointer bg-primary w-10 h-10 rounded-full ${
              currentPage === Math.ceil(total / pageSize)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => {
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(total / pageSize))
              );
            }}
          />
        </div>
      </div>
    </div>

);
};

export default RoomsPage;

rooms/rooms.ts
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

rooms/[id]/page.tsx
import { rooms } from "../rooms";
import RoomDetailClient from "./room-detail-client";

export async function generateStaticParams() {
return rooms.map((room, index) => ({
id: index.toString(),
}));
}

export default async function Page({
params,
}: {
params: Promise<{ id: string }>;
}) {
const { id } = await params;
const room = rooms[parseInt(id)];

return <RoomDetailClient room={room} />;
}

rooms/[id]/room-detail-client.tsx
"use client";

import { Rating } from "@/components/rating";
import Hero from "@/components/shared/hero";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Review, UserProfile } from "@/lib/types";
import {
AirVentIcon,
Bath,
Bed,
ChevronLeft,
ChevronRight,
PocketKnifeIcon as ForkKnife,
MapPin,
Star,
Trash,
Tv,
Wifi,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// This component receives the room data as a prop
export default function RoomDetailClient({ room }: { room: any }) {
const [reviews, setReviews] = useState<Review[]>([]);
const [users, setUsers] = useState<UserProfile[]>([]);
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const router = useRouter();

if (!room) {
return (
<div className="min-h-screen flex items-center justify-center">
<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
</div>
);
}

const images = room.images || [];

const handlePrev = () => {
setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
};

const handleNext = () => {
setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
};

const profileReviews = reviews.map((review) => ({
...review,
user: users.find((user) => user.userId === review.userId),
}));

const amenities = [
{
icon: Bed,
label: `${room.beds} Bed${room.beds !== 1 ? "s" : ""}`,
color: "bg-blue-50 text-blue-700",
},
{
icon: Bath,
label: `${room.bathrooms} Bath${room.bathrooms !== 1 ? "s" : ""}`,
color: "bg-cyan-50 text-cyan-700",
},
{ icon: Wifi, label: "Free WiFi", color: "bg-green-50 text-green-700" },
{ icon: Tv, label: "Smart TV", color: "bg-purple-50 text-purple-700" },
{
icon: AirVentIcon,
label: "Air Conditioning",
color: "bg-indigo-50 text-indigo-700",
},
{
icon: Trash,
label: "Laundry Service",
color: "bg-orange-50 text-orange-700",
},
{ icon: ForkKnife, label: "Dining Area", color: "bg-red-50 text-red-700" },
];

return (
<div>
<Hero />
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
{/_ Back Button _/}
<div className="mb-6">
<Button
onClick={() => router.push("/rooms")}
variant="outline"
className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-none" >
<ChevronLeft className="w-4 h-4" />
Back to Rooms
</Button>
</div>
{/_ Hero Image Slider _/}
<div className="relative w-full h-[60vh] overflow-hidden shadow-2xl mb-8 group">
{images.length > 0 ? (
<>
<Image
src={images[currentImageIndex] || "/placeholder.svg"}
alt={`Room image ${currentImageIndex + 1}`}
fill
className="object-cover transition-transform duration-700 group-hover:scale-105"
/>
<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Navigation Buttons */}
                <Button
                  onClick={handlePrev}
                  size="icon"
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  onClick={handleNext}
                  size="icon"
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>

                {/* Image Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_: any, index: React.Key | null | undefined) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index as number)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-white scale-125"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-6 right-6 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Bed className="w-12 h-12 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-lg">
                    No images available
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Room Header */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                    {room.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <Rating allowHalf={true} rating={room.averageRating!} />
                    <span className="text-sm text-gray-600 ml-2">
                      ({profileReviews.length} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Premium Location • City Center</span>
                </div>
              </div>

              {/* Amenities Grid */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    Amenities & Features
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {amenities.map((amenity, index) => {
                      const IconComponent = amenity.icon;
                      return (
                        <div
                          key={index}
                          className={`${amenity.color} p-4 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-md`}
                        >
                          <IconComponent className="w-6 h-6 mb-2" />
                          <span className="text-sm font-medium">
                            {amenity.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    About This Room
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {room.description}
                  </p>
                </CardContent>
              </Card>

              {/* Tabs Section */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
                      <TabsTrigger
                        value="overview"
                        className="data-[state=active]:bg-white"
                      >
                        Overview
                      </TabsTrigger>
                      <TabsTrigger
                        value="reviews"
                        className="data-[state=active]:bg-white"
                      >
                        Reviews ({profileReviews.length})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {room.shortDescription}
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="reviews" className="space-y-6">
                      {profileReviews.length > 0 ? (
                        profileReviews.map((review, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 rounded-2xl p-6 transition-all duration-300 hover:shadow-md"
                          >
                            <div className="flex items-start gap-4">
                              <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                                <AvatarImage
                                  src={
                                    review.user?.profileImage ||
                                    "/placeholder.svg"
                                  }
                                />
                                <AvatarFallback className="bg-primary text-white font-semibold">
                                  {review.user?.firstName
                                    ?.charAt(0)
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-semibold text-gray-900">
                                      {review.user?.firstName}
                                    </h4>
                                  </div>
                                  <Rating rating={review.rating} />
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                  {review.comment}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 text-lg">
                            No reviews yet
                          </p>
                          <p className="text-gray-400">
                            Be the first to leave a review!
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="border-0 shadow-xl bg-white sticky top-8">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        Ksh {room.price}
                        <span className="text-lg font-normal text-gray-600">
                          /night
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        {room.status}
                      </Badge>
                    </div>

                    <Button
                      onClick={() => router.push("/contact")}
                      className="w-full rounded-none bg-primary hover:bg-primary/90 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Reserve Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-gray-900">
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">
                          {room.averageRating?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Reviews</span>
                      <span className="font-semibold">
                        {profileReviews.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Room Type</span>
                      <span className="font-semibold">Premium Suite</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>

);
}

components/home/rooms-section.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Rating } from "@/components/rating";
import {
Bath,
Bed,
Wifi,
Users,
ArrowRight,
Eye,
Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { rooms } from "@/app/rooms/rooms";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
gsap.registerPlugin(ScrollTrigger);
}

const RoomsSection = () => {
const router = useRouter();
const sectionRef = useRef<HTMLDivElement>(null);
const titleRef = useRef<HTMLDivElement>(null);
const roomsGridRef = useRef<HTMLDivElement>(null);
const ctaRef = useRef<HTMLDivElement>(null);

// GSAP Animations
useEffect(() => {
const ctx = gsap.context(() => {
// Set initial states
gsap.set([titleRef.current, ctaRef.current], {
opacity: 0,
y: 50,
});

      gsap.set(roomsGridRef.current?.children || [], {
        opacity: 0,
        y: 30,
        scale: 0.9,
      });

      // Create scroll-triggered timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate entrance
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          roomsGridRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();

}, []);

const handleViewAllRooms = () => {
router.push("/rooms");
};

const handleBookRoom = (roomId?: string) => {
router.push("/booking");
};

return (
<section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white"
    >
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
{/_ Section Header _/}
<div ref={titleRef} className="text-center mb-16">
<div className="flex items-center justify-center gap-3 mb-4">
<div className="h-[3px] w-12 bg-primary rounded-full"></div>
<span className="text-primary font-bold text-sm tracking-wider">
OUR ACCOMMODATIONS
</span>
<div className="h-[3px] w-12 bg-primary rounded-full"></div>
</div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Explore Our <span className="text-primary">Premium Rooms</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover comfort and elegance in our thoughtfully designed rooms,
            each offering modern amenities and stunning views of Vihiga County.
          </p>
        </div>

        {/* Rooms Grid */}
        <div
          ref={roomsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12"
        >
          {rooms.slice(0, 6).map((room, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Room Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={room.images[0]} // Corrected from `/${room.images[0]}`
                  alt={room.shortDescription}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  priority={index < 3}
                />

                {/* Price Badge */}
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-2 rounded-full font-bold text-sm shadow-lg">
                  Ksh {room.price.toLocaleString()}/night
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-1 shadow-lg">
                  <Rating rating={room.averageRating!} allowHalf />
                  <span className="text-xs font-semibold text-gray-700">
                    ({room.averageRating})
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    onClick={() => router.push("/rooms")}
                    className="bg-white/90 text-gray-800 hover:bg-white font-semibold px-6 py-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>

              {/* Room Content */}
              <div className="p-6 flex flex-col justify-between">
                {/* Room Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">
                  {room.name}
                </h3>

                {/* Room Description */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {room.shortDescription}
                </p>

                {/* Room Features */}
                <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4 text-primary" />
                    <span>
                      {room.beds} Bed{room.beds > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4 text-primary" />
                    <span>{room.bathrooms} Bath</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{room.beds * 2} Guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-4 h-4 text-primary" />
                    <span>Free WiFi</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => router.push("/rooms")}
                    variant="outline"
                    className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 rounded-sm transition-all duration-300"
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() => handleBookRoom(room.name)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div ref={ctaRef} className="text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 lg:p-12">
            <Bed className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Find Your <span className="text-primary">Perfect Room</span>
            </h3>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              Explore our full collection of rooms and suites, each designed to
              provide the ultimate comfort and luxury for your stay in Vihiga
              County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleViewAllRooms}
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                View All Rooms
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                onClick={() => handleBookRoom()}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-4 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Stay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

);
};

export default RoomsSection;
