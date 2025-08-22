import { Rating } from "@/components/rating";
import Hero from "@/components/shared/hero";
import { Button } from "@/components/ui/button";
import { Bath, Bed, Wifi } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { rooms } from "./rooms";

const RoomsPage = () => {
  return (
    <div className="mb-10">
      <Hero />
      <div className="w-full flex flex-col items-center justify-center space-y-4 mt-10">
        <div className="space-y-4">
          <h1 className="text-primary md:text-3xl flex items-center justify-center space-x-2">
            <div className="h-1 w-14 md:w-28 bg-primary"></div>
            <span>Our Rooms</span>
            <div className="h-1 w-14 md:w-28 bg-primary"></div>
          </h1>
          <h1 className="text-3xl md:text-6xl font-extrabold">
            Explore Our <span className="text-primary">Rooms</span>
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

                <div className="flex justify-between gap-2">
                  <Link 
                    href={`/rooms/${index}`}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    VIEW DETAILS
                  </Link>
                  <Link 
                    href="/auth/login"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-10 px-4 py-2"
                  >
                    BOOK NOW
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
