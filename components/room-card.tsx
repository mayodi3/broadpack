"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Room } from "@/lib/types";
import {
  Bath,
  Bed,
  Shirt,
  Star,
  Tv,
  UtensilsCrossed,
  Wifi,
  Wind,
} from "lucide-react";
import Image from "next/image";

interface RoomCardProps {
  room: Room;
  onBook: (room: Room) => void;
}

export default function RoomCard({ room, onBook }: RoomCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800";
      case "occupied":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow pt-0 border-none rounded-t-lg shadow-secondary shadow-lg duration-300 flex flex-col">
      <CardHeader className="p-0">
        {/* Room Image */}
        <div className="relative h-64 w-full rounded-t-lg overflow-hidden">
          {room.images && room.images.length > 0 ? (
            <Image
              src={
                room.images[0] ||
                "/placeholder.svg?height=256&width=400&query=hotel room"
              }
              alt={room.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Bed className="h-16 w-16 text-gray-400" />
            </div>
          )}
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <Badge className={getStatusColor(room.status)}>
              {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
            </Badge>
          </div>
          {/* Price Badge */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-black/70 text-white px-3 py-1 rounded-full flex items-center space-x-1">
              <span className="font-bold">Ksh {room.price}</span>
              <span className="text-sm">/night</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <div className="flex flex-col space-y-4 h-full">
          {/* Room Title and Rating */}
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold text-primary">
              {room.name}
            </CardTitle>
            {room.averageRating && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">
                  {room.averageRating}
                </span>
              </div>
            )}
          </div>

          {/* Short Description */}
          <p className="text-gray-600 text-sm line-clamp-2">
            {room.shortDescription}
          </p>

          {/* Room Features (Beds & Bathrooms) */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <Bed className="h-4 w-4 text-gray-500" />
              <span>{room.beds} Beds</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bath className="h-4 w-4 text-gray-500" />
              <span>{room.bathrooms} Bathrooms</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
            {room.wifi && (
              <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                <Wifi className="h-3 w-3" />
                <span>WiFi</span>
              </div>
            )}
            {room.tv && (
              <div className="flex items-center space-x-1 bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs">
                <Tv className="h-3 w-3" />
                <span>TV</span>
              </div>
            )}
            {room.ac && (
              <div className="flex items-center space-x-1 bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full text-xs">
                <Wind className="h-3 w-3" />
                <span>AC</span>
              </div>
            )}
            {room.dinner && (
              <div className="flex items-center space-x-1 bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs">
                <UtensilsCrossed className="h-3 w-3" />
                <span>Dinner</span>
              </div>
            )}
            {room.laundry && (
              <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
                <Shirt className="h-3 w-3" />
                <span>Laundry</span>
              </div>
            )}
          </div>

          {/* Book Button */}
          <Button
            onClick={() => onBook(room)}
            className="w-full py-3 font-semibold mt-auto"
            disabled={room.status.toLowerCase() !== "available"}
          >
            {room.status.toLowerCase() === "available"
              ? "Book Now"
              : "Not Available"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
