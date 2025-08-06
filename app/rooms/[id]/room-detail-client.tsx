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
          {/* Back Button */}
          <div className="mb-6">
            <Button
              onClick={() => router.push("/rooms")}
              variant="outline"
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-none"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Rooms
            </Button>
          </div>
          {/* Hero Image Slider */}
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
