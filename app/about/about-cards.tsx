import Image from "next/image";
import React from "react";

const AboutCards = () => {
  const images = [
    { name: "Conference Room", image: "/Conference.webp" },
    { name: "Hotel Center", image: "/Customers 16.webp" },
    { name: "Restaurant", image: "/Meals.webp" },
    { name: "Private Lounge", image: "/Bar.webp" },
  ];

  return (
    <div className="md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
      {images.map((image, index) => (
        <div key={image.name} className="flex flex-col h-[400px]">
          <div
            className={`${
              index % 2 === 0 ? "bg-primary" : "bg-black"
            } text-white h-[70px] font-bold text-2xl text-center py-4`}
          >
            <span className="h-full">{image.name}</span>
          </div>
          <div>
            <Image
              src={image.image}
              alt={image.name}
              width={200}
              height={200}
              className="object-cover w-full h-[330px]"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutCards;
