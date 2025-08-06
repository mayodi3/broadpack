"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Bus,
  Car,
  Clock,
  MapPin,
  Navigation,
  Plane,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LocationSection = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const attractionsRef = useRef<HTMLDivElement>(null);
  const transportRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null); // This line was missing

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/shared/Map"), {
        loading: () => <p>A map is loading...</p>,
        ssr: false,
      }),
    []
  );

  const hotelPosition: [number, number] = [0.076756, 34.719414];

  const nearbyAttractions = [
    {
      name: "Kakamega Forest Reserve",
      distance: "25 km",
      time: "30 min drive",
      type: "Nature & Wildlife",
      image: "/Kakamega Forest.webp",
      rating: 4.8,
      description:
        "Tropical rainforest perfect for bird watching and nature walks",
    },
    {
      name: "Webuye Falls",
      distance: "40 km",
      time: "45 min drive",
      type: "Waterfalls",
      image: "/Webuye Falls.webp",
      rating: 4.6,
      description: "Stunning waterfalls ideal for photography and swimming",
    },
    {
      name: "Crying Stone of Ilesi",
      distance: "15 km",
      time: "20 min drive",
      type: "Cultural Site",
      image: "/Crying Stone.webp",
      rating: 4.5,
      description: "Historic landmark with folklore and panoramic views",
    },
    {
      name: "Masinde Muliro Gardens",
      distance: "8 km",
      time: "12 min drive",
      type: "Botanical Gardens",
      image: "/Muliro Gardens.webp",
      rating: 4.7,
      description: "Beautiful botanical gardens perfect for families",
    },
  ];

  // Transportation Options
  const transportOptions = [
    {
      icon: Plane,
      name: "Kisumu Airport",
      distance: "85 km",
      time: "1.5 hours",
      description: "International flights and domestic connections",
    },
    {
      icon: Bus,
      name: "Mbale Bus Station",
      distance: "2 km",
      time: "5 minutes",
      description: "Regular buses to Nairobi, Kisumu, and other cities",
    },
    {
      icon: Car,
      name: "Main Highway",
      distance: "1 km",
      time: "2 minutes",
      description: "Easy access to major roads and highways",
    },
  ];

  // Location Advantages
  const locationAdvantages = [
    "Central location in Mbale town center",
    "Walking distance to local markets and shops",
    "Easy access to government offices and banks",
    "Close to schools and healthcare facilities",
    "Safe and secure neighborhood",
    "Beautiful views of Vihiga County landscapes",
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, mapRef.current, ctaRef.current], {
        // Added ctaRef here
        opacity: 0,
        y: 50,
      });

      gsap.set(attractionsRef.current?.children || [], {
        opacity: 0,
        y: 30,
      });

      gsap.set(transportRef.current?.children || [], {
        opacity: 0,
        x: -30,
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
          mapRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          attractionsRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          transportRef.current?.children || [],
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          // Added animation for ctaRef
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

  const handleExploreAttractions = () => {
    router.push("/attractions");
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[3px] w-12 bg-primary rounded-full"></div>
            <span className="text-primary font-bold text-sm tracking-wider">
              PRIME LOCATION
            </span>
            <div className="h-[3px] w-12 bg-primary rounded-full"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Perfect <span className="text-primary">Location</span> in Vihiga
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Strategically located in the heart of Mbale, our hotel offers easy
            access to local attractions, transportation hubs, and the natural
            beauty of Vihiga County.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Interactive Map Area */}
          <div ref={mapRef} className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                Our Location
              </h3>

              {/* Interactive Map */}
              <div className="rounded-xl h-64 lg:h-80 mb-6 overflow-hidden">
                <Map position={hotelPosition} zoom={15} />
              </div>

              {/* Location Advantages */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 mb-4">
                  Location Advantages:
                </h4>
                {locationAdvantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm text-gray-600"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span>{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transportation Options */}
          <div ref={transportRef} className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Navigation className="w-6 h-6 text-primary" />
              Easy Access
            </h3>

            {transportOptions.map((transport, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <transport.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {transport.name}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {transport.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {transport.time}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {transport.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Attractions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold">
              Nearby <span className="text-primary">Attractions</span>
            </h3>
            <Button
              onClick={handleExploreAttractions}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              View All Attractions
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          <div
            ref={attractionsRef}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {nearbyAttractions.map((attraction, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={handleExploreAttractions}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={attraction.image}
                    alt={attraction.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold">
                      {attraction.rating}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-primary/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {attraction.type}
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">
                    {attraction.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {attraction.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {attraction.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {attraction.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div ref={ctaRef} className="text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 lg:p-12">
            <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Discover <span className="text-primary">Vihiga County</span>
            </h3>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              From our central location, explore the rich culture, natural
              beauty, and warm hospitality that makes Vihiga County a perfect
              destination for your stay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleExploreAttractions}
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Attractions
              </Button>
              <Button
                onClick={() => router.push("/booking")}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book Your Stay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
