"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Room, MeetingRoom, BookingType } from "@/lib/types";
import {
  Bed,
  CalendarIcon,
  Star,
  Users,
  Projector,
  Wifi,
  Monitor,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { meetingRooms } from "../rooms/meeting-rooms";
import { rooms } from "../rooms/rooms";

export default function UnifiedBookingPage() {
  const [bookingType, setBookingType] = useState<BookingType>("room");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [attendees, setAttendees] = useState(1);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);
  const [filteredMeetingRooms, setFilteredMeetingRooms] =
    useState<MeetingRoom[]>(meetingRooms);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedMeetingRoom, setSelectedMeetingRoom] =
    useState<MeetingRoom | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  // Guest information
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const router = useRouter();

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const calculateHours = () => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const timeDiff = end.getTime() - start.getTime();
    return Math.max(0, timeDiff / (1000 * 3600));
  };

  const calculateTotalPrice = (item: Room | MeetingRoom) => {
    if (bookingType === "room") {
      const nights = calculateNights();
      return nights * item.price;
    } else {
      const hours = calculateHours();
      return hours * item.price;
    }
  };

  const handleSearch = () => {
    if (bookingType === "room") {
      if (!checkInDate || !checkOutDate) {
        toast.error("Please select check-in and check-out dates");
        return;
      }

      if (checkOutDate <= checkInDate) {
        toast.error("Check-out date must be after check-in date");
        return;
      }

      setIsSearching(true);
      const totalGuests = adults + children;
      const availableRooms = rooms.filter((room) => {
        const estimatedCapacity = room.beds * 2;
        return estimatedCapacity >= totalGuests;
      });

      setFilteredRooms(availableRooms);
      setIsSearching(false);
      toast.success(`Found ${availableRooms.length} available rooms`);
    } else {
      if (!checkInDate || !startTime || !endTime) {
        toast.error("Please select date and time slots");
        return;
      }

      if (endTime <= startTime) {
        toast.error("End time must be after start time");
        return;
      }

      setIsSearching(true);
      const availableMeetingRooms = meetingRooms.filter((room) => {
        return room.capacity >= attendees;
      });

      setFilteredMeetingRooms(availableMeetingRooms);
      setIsSearching(false);
      toast.success(
        `Found ${availableMeetingRooms.length} available meeting rooms`
      );
    }
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setSelectedMeetingRoom(null);
    setShowBookingForm(true);
  };

  const handleMeetingRoomSelect = (room: MeetingRoom) => {
    setSelectedMeetingRoom(room);
    setSelectedRoom(null);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = () => {
    if (
      !guestInfo.firstName ||
      !guestInfo.lastName ||
      !guestInfo.email ||
      !guestInfo.phone
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const bookingData = {
      type: bookingType,
      room: selectedRoom,
      meetingRoom: selectedMeetingRoom,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      startTime,
      endTime,
      adults,
      children,
      attendees,
      nights: bookingType === "room" ? calculateNights() : 0,
      hours: bookingType === "meeting" ? calculateHours() : 0,
      totalPrice: selectedRoom
        ? calculateTotalPrice(selectedRoom)
        : selectedMeetingRoom
        ? calculateTotalPrice(selectedMeetingRoom)
        : 0,
      guestInfo,
    };

    sessionStorage.setItem("pendingBooking", JSON.stringify(bookingData));
    router.push("/auth/register?from=booking");
  };

  const resetSearch = () => {
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    setStartTime("");
    setEndTime("");
    setAdults(1);
    setChildren(0);
    setAttendees(1);
    setFilteredRooms(rooms);
    setFilteredMeetingRooms(meetingRooms);
    setSelectedRoom(null);
    setSelectedMeetingRoom(null);
    setShowBookingForm(false);
  };

  const currentSelection = selectedRoom || selectedMeetingRoom;

  if (showBookingForm && currentSelection) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => setShowBookingForm(false)}
            variant="outline"
            className="mb-6"
          >
            ← Back to {bookingType === "room" ? "Room" : "Meeting Room"}{" "}
            Selection
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Room/Meeting Room Details */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {bookingType === "room" ? "Room" : "Meeting Room"} Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={currentSelection.images[0] || "/placeholder.svg"}
                    alt={currentSelection.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{currentSelection.name}</h3>
                  <p className="text-gray-600">
                    {currentSelection.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    {bookingType === "room" && selectedRoom && (
                      <>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">
                            Up to {selectedRoom.beds * 2} guests
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          <span className="text-sm">
                            {selectedRoom.beds} bed
                            {selectedRoom.beds !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </>
                    )}
                    {bookingType === "meeting" && selectedMeetingRoom && (
                      <>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">
                            Up to {selectedMeetingRoom.capacity} people
                          </span>
                        </div>
                        {selectedMeetingRoom.projector && (
                          <div className="flex items-center gap-1">
                            <Projector className="h-4 w-4" />
                            <span className="text-sm">Projector</span>
                          </div>
                        )}
                        {selectedMeetingRoom.videoConference && (
                          <div className="flex items-center gap-1">
                            <Monitor className="h-4 w-4" />
                            <span className="text-sm">Video Conf</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary & Guest Info */}
            <div className="space-y-6">
              {/* Booking Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {bookingType === "room" ? (
                    <>
                      <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span className="font-medium">
                          {checkInDate?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span className="font-medium">
                          {checkOutDate?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span className="font-medium">
                          {adults} Adults
                          {children > 0 && `, ${children} Children`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nights:</span>
                        <span className="font-medium">{calculateNights()}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">
                          {checkInDate?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span className="font-medium">
                          {startTime} - {endTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attendees:</span>
                        <span className="font-medium">{attendees} people</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">
                          {calculateHours()} hours
                        </span>
                      </div>
                    </>
                  )}
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">
                      Ksh {calculateTotalPrice(currentSelection).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Guest Information Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={guestInfo.firstName}
                        onChange={(e) =>
                          setGuestInfo({
                            ...guestInfo,
                            firstName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={guestInfo.lastName}
                        onChange={(e) =>
                          setGuestInfo({
                            ...guestInfo,
                            lastName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={guestInfo.email}
                      onChange={(e) =>
                        setGuestInfo({ ...guestInfo, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="254712345678"
                      value={guestInfo.phone}
                      onChange={(e) =>
                        setGuestInfo({ ...guestInfo, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder={
                        bookingType === "room"
                          ? "Any special requirements or requests..."
                          : "Equipment needs, catering requirements, etc..."
                      }
                      value={guestInfo.specialRequests}
                      onChange={(e) =>
                        setGuestInfo({
                          ...guestInfo,
                          specialRequests: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Button
                    onClick={handleBookingSubmit}
                    className="w-full py-6 text-lg font-semibold"
                  >
                    Continue to Complete Booking
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    You'll be asked to create an account to complete your
                    booking and payment
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Book Your Stay or Meeting
          </h1>
          <p className="text-lg text-gray-600">
            Find and book the perfect room or meeting space
          </p>
        </div>

        {/* Booking Type Tabs */}
        <Tabs
          value={bookingType}
          onValueChange={(value) => setBookingType(value as BookingType)}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="room">Hotel Rooms</TabsTrigger>
            <TabsTrigger value="meeting">Conference Rooms</TabsTrigger>
          </TabsList>

          <TabsContent value="room">
            {/* Room Search Form */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Search Available Rooms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {/* Check-in Date */}
                  <div>
                    <Label>Check-in Date</Label>
                    <Popover
                      open={isCheckInOpen}
                      onOpenChange={setIsCheckInOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate
                            ? checkInDate.toLocaleDateString()
                            : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={setCheckInDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Check-out Date */}
                  <div>
                    <Label>Check-out Date</Label>
                    <Popover
                      open={isCheckOutOpen}
                      onOpenChange={setIsCheckOutOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOutDate
                            ? checkOutDate.toLocaleDateString()
                            : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={setCheckOutDate}
                          disabled={(date) =>
                            date <= (checkInDate || new Date())
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Adults */}
                  <div>
                    <Label htmlFor="adults">Adults</Label>
                    <Input
                      id="adults"
                      type="number"
                      min="1"
                      max="10"
                      value={adults}
                      onChange={(e) =>
                        setAdults(Number.parseInt(e.target.value) || 1)
                      }
                    />
                  </div>

                  {/* Children */}
                  <div>
                    <Label htmlFor="children">Children</Label>
                    <Input
                      id="children"
                      type="number"
                      min="0"
                      max="10"
                      value={children}
                      onChange={(e) =>
                        setChildren(Number.parseInt(e.target.value) || 0)
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="flex-1"
                  >
                    {isSearching ? "Searching..." : "Search Rooms"}
                  </Button>
                  <Button onClick={resetSearch} variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Available Rooms */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {checkInDate && checkOutDate
                    ? "Available Rooms"
                    : "All Rooms"}
                </h2>
                <span className="text-gray-600">
                  {filteredRooms.length} room
                  {filteredRooms.length !== 1 ? "s" : ""} found
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-lg transition-shadow pt-0"
                  >
                    <div className="relative h-48">
                      <Image
                        src={room.images[0] || "/placeholder-room.jpg"}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{room.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {room.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>Up to {room.beds * 2}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            <span>
                              {room.beds} bed{room.beds !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>

                        {room.averageRating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {room.averageRating.toFixed(1)}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <span className="text-2xl font-bold text-green-600">
                              Ksh {room.price}
                            </span>
                            <span className="text-gray-500 text-sm">
                              /night
                            </span>
                            {checkInDate && checkOutDate && (
                              <div className="text-sm text-gray-600">
                                Total: Ksh{" "}
                                {calculateTotalPrice(room).toFixed(2)} for{" "}
                                {calculateNights()} nights
                              </div>
                            )}
                          </div>
                        </div>

                        <Button
                          onClick={() => handleRoomSelect(room)}
                          className="w-full mt-3"
                          disabled={!checkInDate || !checkOutDate}
                        >
                          {checkInDate && checkOutDate
                            ? "Book This Room"
                            : "Select Dates First"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredRooms.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No rooms available for the selected criteria. Please try
                    different dates or adjust the number of guests.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="meeting">
            {/* Meeting Room Search Form */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Search Available Conference Rooms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                  {/* Date */}
                  <div>
                    <Label>Date</Label>
                    <Popover
                      open={isCheckInOpen}
                      onOpenChange={setIsCheckInOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate
                            ? checkInDate.toLocaleDateString()
                            : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={setCheckInDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Start Time */}
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>

                  {/* End Time */}
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>

                  {/* Attendees */}
                  <div>
                    <Label htmlFor="attendees">Attendees</Label>
                    <Input
                      id="attendees"
                      type="number"
                      min="1"
                      max="50"
                      value={attendees}
                      onChange={(e) =>
                        setAttendees(Number.parseInt(e.target.value) || 1)
                      }
                    />
                  </div>

                  {/* Search Button */}
                  <div className="flex items-end">
                    <Button
                      onClick={handleSearch}
                      disabled={isSearching}
                      className="w-full"
                    >
                      {isSearching ? "Searching..." : "Search"}
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={resetSearch}
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  Reset Search
                </Button>
              </CardContent>
            </Card>

            {/* Available Conference Rooms */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {checkInDate && startTime && endTime
                    ? "Available Conference Rooms"
                    : "All Conference Rooms"}
                </h2>
                <span className="text-gray-600">
                  {filteredMeetingRooms.length} room
                  {filteredMeetingRooms.length !== 1 ? "s" : ""} found
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMeetingRooms.map((room, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-lg transition-shadow pt-0"
                  >
                    <div className="relative h-48">
                      <Image
                        src={room.images[0] || "/placeholder.svg"}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{room.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {room.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>Up to {room.capacity}</span>
                          </div>
                          {room.wifi && (
                            <div className="flex items-center gap-1">
                              <Wifi className="h-4 w-4" />
                              <span>WiFi</span>
                            </div>
                          )}
                          {room.projector && (
                            <div className="flex items-center gap-1">
                              <Projector className="h-4 w-4" />
                              <span>Projector</span>
                            </div>
                          )}
                        </div>

                        {room.averageRating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {room.averageRating.toFixed(1)}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <span className="text-2xl font-bold text-green-600">
                              Ksh {room.price}
                            </span>
                            <span className="text-gray-500 text-sm">/hour</span>
                            {checkInDate && startTime && endTime && (
                              <div className="text-sm text-gray-600">
                                Total: Ksh{" "}
                                {calculateTotalPrice(room).toFixed(2)} for{" "}
                                {calculateHours()} hours
                              </div>
                            )}
                          </div>
                        </div>

                        <Button
                          onClick={() => handleMeetingRoomSelect(room)}
                          className="w-full mt-3"
                          disabled={!checkInDate || !startTime || !endTime}
                        >
                          {checkInDate && startTime && endTime
                            ? "Book This Room"
                            : "Select Date & Time First"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredMeetingRooms.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No meeting rooms available for the selected criteria. Please
                    try different times or adjust the number of attendees.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
