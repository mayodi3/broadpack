"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Booking, Room } from "@/lib/types";
import {
  Calendar,
  Users,
  MapPin,
  DollarSign,
  MessageSquare,
  Eye,
  Edit,
} from "lucide-react";
import Image from "next/image";

interface BookingCardProps {
  booking: Booking;
  room: Room | undefined;
  onView: (booking: Booking) => void;
  onEdit: (booking: Booking) => void;
}

export default function BookingForm({
  booking,
  room,
  onView,
  onEdit,
}: BookingCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow flex flex-col h-full">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">
            {room?.name || "Room Not Found"}
          </CardTitle>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-grow">
        <div className="flex-grow space-y-4">
          {/* Room Image */}
          <div className="relative h-48 w-full rounded-lg overflow-hidden">
            {room?.images && room.images.length > 0 ? (
              <Image
                src={room.images[0] || "/placeholder.svg"}
                alt={room.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-medium">Check-in</p>
                <p className="text-gray-600">{formatDate(booking.checkIn)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-medium">Check-out</p>
                <p className="text-gray-600">{formatDate(booking.checkOut)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-medium">Guests</p>
                <p className="text-gray-600">
                  {booking.adults} Adults, {booking.children} Children
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-medium">Total</p>
                <p className="text-gray-600">${booking.totalPrice}</p>
              </div>
            </div>
          </div>

          {/* Room Details */}
          {room && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {room.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {room.beds} Beds
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {room.bathrooms} Bathrooms
                </span>
                {room.wifi && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    WiFi
                  </span>
                )}
                {room.ac && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    AC
                  </span>
                )}
                {room.tv && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    TV
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Special Request */}
          {booking.specialRequest && (
            <div className="flex items-start space-x-2">
              <MessageSquare className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Special Request</p>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {booking.specialRequest}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons - Always at bottom */}
        <div className="flex space-x-2 pt-4 mt-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(booking)}
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onEdit(booking)}
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Booking
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
