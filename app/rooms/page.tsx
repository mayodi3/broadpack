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
