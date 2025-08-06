"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Booking, Room } from "@/lib/types";
import {
  Calendar,
  Users,
  DollarSign,
  MessageSquare,
  Bed,
  Bath,
  Wifi,
  Tv,
  Wind,
  UtensilsCrossed,
  Shirt,
} from "lucide-react";
import Image from "next/image";

interface BookingDetailsModalProps {
  booking: Booking | null;
  room: Room | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingDetailsModal({
  booking,
  room,
  isOpen,
  onClose,
}: BookingDetailsModalProps) {
  if (!booking) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Booking Details</span>
            <Badge className={getStatusColor(booking.status)}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Room Information */}
          {room && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{room.name}</h3>

              {/* Room Images */}
              {room.images && room.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {room.images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className="relative h-48 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${room.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <p className="text-gray-600">{room.description}</p>

              {/* Room Amenities */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Bed className="h-5 w-5 text-gray-500" />
                  <span>{room.beds} Beds</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="h-5 w-5 text-gray-500" />
                  <span>{room.bathrooms} Bathrooms</span>
                </div>
                {room.wifi && (
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-5 w-5 text-green-500" />
                    <span>WiFi</span>
                  </div>
                )}
                {room.tv && (
                  <div className="flex items-center space-x-2">
                    <Tv className="h-5 w-5 text-green-500" />
                    <span>TV</span>
                  </div>
                )}
                {room.ac && (
                  <div className="flex items-center space-x-2">
                    <Wind className="h-5 w-5 text-green-500" />
                    <span>AC</span>
                  </div>
                )}
                {room.dinner && (
                  <div className="flex items-center space-x-2">
                    <UtensilsCrossed className="h-5 w-5 text-green-500" />
                    <span>Dinner</span>
                  </div>
                )}
                {room.laundry && (
                  <div className="flex items-center space-x-2">
                    <Shirt className="h-5 w-5 text-green-500" />
                    <span>Laundry</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Booking Information */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">Booking Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Check-in</p>
                    <p className="text-gray-600">
                      {formatDate(booking.checkIn)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Check-out</p>
                    <p className="text-gray-600">
                      {formatDate(booking.checkOut)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Guests</p>
                    <p className="text-gray-600">
                      {booking.adults} Adults, {booking.children} Children
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Total Amount</p>
                    <p className="text-gray-600 text-lg font-semibold">
                      ${booking.totalPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">
                <strong>Duration:</strong> {booking.nights} nights
              </p>
            </div>

            {booking.specialRequest && (
              <div className="pt-4 border-t">
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium">Special Request</p>
                    <p className="text-gray-600">{booking.specialRequest}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
