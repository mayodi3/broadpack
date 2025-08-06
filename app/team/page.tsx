import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Hero from "@/components/shared/hero";
import { staffMembers } from "./team";

export default function TeamPage() {
  return (
    <div>
      <Hero />
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="space-y-4 text-center mb-12">
          <h1 className="text-primary md:text-2xl flex items-center justify-center space-x-2">
            <div className="h-[2px] w-14 md:w-28 bg-primary"></div>
            <span className="text-primary">OUR TEAM</span>
            <div className="h-[2px] w-14 md:w-28 bg-primary"></div>
          </h1>
          <h1 className="text-3xl md:text-5xl font-extrabold">
            Explore Our <span className="text-primary">STAFFS</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {staffMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-md overflow-hidden text-center group"
            >
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={member.image || "/Staff 1.webp"}
                  alt={member.name}
                  width={250}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm">{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
