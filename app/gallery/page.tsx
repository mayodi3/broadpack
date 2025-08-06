import Image from "next/image";
import Hero from "@/components/shared/hero";
import { galleryImages } from "./images";

export default function GalleryPage() {
  return (
    <div className="mb-10">
      <Hero />
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="space-y-4 text-center mb-12">
          <h1 className="text-primary md:text-2xl flex items-center justify-center space-x-2">
            <div className="h-[2px] w-14 md:w-28 bg-primary"></div>
            <span className="text-primary">GALLERY</span>
            <div className="h-[2px] w-14 md:w-28 bg-primary"></div>
          </h1>
          <h1 className="text-3xl md:text-5xl font-extrabold">
            Our Photo <span className="text-primary">GALLERY</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden shadow-md group"
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={400}
                height={300}
                className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
