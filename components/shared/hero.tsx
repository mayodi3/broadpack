import Image from "next/image";
import React from "react";

interface HeroProps {
  className?: string;
}

const Hero = ({ className = "" }: HeroProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      <Image
        src="/Building 6.webp"
        alt="Hero Image"
        width={500}
        height={500}
        className="object-cover w-full h-[50vh] md:h-[30vh]"
      />
    </div>
  );
};

export default Hero;
