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
        {/* Section Header */}
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
