import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Hero from "@/components/shared/hero";
import { MapPin, Clock, Camera, Star } from "lucide-react";
import { touristAttractions2 } from "./tourist-attractions";

export default function AttractionsPage() {
  return (
    <div className="mb-10">
      <Hero />
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="space-y-4 text-center mb-12">
          <h1 className="text-primary md:text-2xl flex items-center justify-center space-x-2">
            <div className="h-[2px] w-14 md:w-28 bg-primary"></div>
            <span className="text-primary">TOURIST ATTRACTIONS</span>
            <div className="h-[2px] w-14 md:w-28 bg-primary"></div>
          </h1>
          <h1 className="text-3xl md:text-5xl font-extrabold">
            EXPLORE <span className="text-primary">WESTERN KENYA</span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Discover the natural beauty and cultural heritage of Western Kenya.
            From pristine forests to magnificent waterfalls, our region offers
            unforgettable experiences for every traveler.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {touristAttractions2.map((attraction) => (
            <Card
              key={attraction.id}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group pt-0"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={attraction.image || "/placeholder.svg"}
                  alt={attraction.name}
                  width={400}
                  height={300}
                  className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">
                    {attraction.rating}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {attraction.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {attraction.description}
                </p>

                {/* Location and Duration Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    <span>
                      {attraction.location} • {attraction.distance}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    <span>{attraction.duration}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Highlights:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {attraction.highlights
                      .slice(0, 3)
                      .map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    {attraction.highlights.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{attraction.highlights.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  href={`/attractions/${attraction.id}`}
                  className="block w-full"
                >
                  <button className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200">
                    Learn More
                  </button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Explore Western Kenya?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Let our experienced team help you plan the perfect day trips and
            excursions. We can arrange transportation, guides, and customized
            itineraries for your stay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200">
              Contact Our Concierge
            </button>
            <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200">
              View Tour Packages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
