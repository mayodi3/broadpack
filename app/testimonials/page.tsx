"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Star, MapPin, Calendar, Quote, Heart } from "lucide-react";
import Hero from "@/components/shared/hero";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Wanjiku",
    location: "Nairobi, Kenya",
    review:
      "Our stay at BROADPARK Hotels was absolutely incredible! The rooms were spacious and beautifully decorated, and the staff went above and beyond to make us feel welcome. The location in Mbale is perfect for exploring the local attractions.",
    rating: 5,
    image: "/Customer 2.webp", // Changed from /testimonial-1.jpg
    stayType: "Family Vacation",
    date: "December 2024",
  },
  {
    name: "James Ochieng",
    location: "Kisumu, Kenya",
    review:
      "Exceptional service and stunning views! The hotel's proximity to Kakamega Forest made our nature trip unforgettable. The breakfast was delicious and the rooms were immaculate. Highly recommend for anyone visiting Western Kenya.",
    rating: 5,
    image: "/Staff 8.webp", // Changed from /testimonial-2.jpg
    stayType: "Nature Retreat",
    date: "November 2024",
  },
  {
    name: "Mary Akinyi",
    location: "Mombasa, Kenya",
    review:
      "Perfect for a romantic getaway! The ambiance was wonderful, and the staff made our anniversary celebration truly special. The tour to Webuye Falls that they arranged was breathtaking. We'll definitely be back!",
    rating: 5,
    image: "/Customers 7.webp", // Changed from /testimonial-3.jpg
    stayType: "Romantic Getaway",
    date: "October 2024",
  },
  {
    name: "David Kimani",
    location: "Eldoret, Kenya",
    review:
      "Great value for money and excellent location. The hotel is well-maintained and the staff are very professional. The business center facilities were perfect for my work needs, and I loved the local attractions they recommended.",
    rating: 4,
    image: "/Staff 5.webp", // Changed from /testimonial-1.jpg
    stayType: "Business Trip",
    date: "September 2024",
  },
  {
    name: "Grace Mutindi",
    location: "Nakuru, Kenya",
    review:
      "Wonderful experience with my family! The kids loved the spacious rooms and the staff were so patient and kind with them. The cultural tours to local attractions were educational and fun. A perfect family destination!",
    rating: 5,
    image: "/Customers 13.webp", // Changed from /testimonial-2.jpg
    stayType: "Family Holiday",
    date: "August 2024",
  },
  {
    name: "Peter Mwangi",
    location: "Thika, Kenya",
    review:
      "Outstanding hospitality and beautiful surroundings. The hotel exceeded our expectations in every way. From the warm welcome to the comfortable rooms and delicious local cuisine, everything was perfect.",
    rating: 5,
    image: "/Hillary.webp", // Changed from /testimonial-3.jpg
    stayType: "Weekend Getaway",
    date: "July 2024",
  },
];

const TestimonialPage = () => {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />

      {/* Header Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="h-1 w-12 md:w-20 bg-primary"></div>
            <span className="text-primary font-semibold tracking-wider">
              TESTIMONIALS
            </span>
            <div className="h-1 w-12 md:w-20 bg-primary"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            WHAT OUR <span className="text-primary">GUESTS SAY</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover why guests from across Kenya choose BROADPARK Hotels for
            their unforgettable experiences
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              500+
            </div>
            <div className="text-gray-600 text-sm">Happy Guests</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              4.8
            </div>
            <div className="text-gray-600 text-sm">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              98%
            </div>
            <div className="text-gray-600 text-sm">Would Recommend</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              24/7
            </div>
            <div className="text-gray-600 text-sm">Guest Support</div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-7xl mx-auto">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-6">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-6 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                    {/* Header with Image and Info */}
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={60}
                            height={60}
                            className="rounded-full object-cover border-2 border-primary/20"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                            <Heart className="w-3 h-3 text-white fill-current" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg">
                            {testimonial.name}
                          </h3>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                            <MapPin className="w-3 h-3 text-primary" />
                            <span>{testimonial.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="secondary"
                              className="bg-primary/10 text-primary text-xs"
                            >
                              {testimonial.stayType}
                            </Badge>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" />
                              <span>{testimonial.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center justify-center space-x-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonial.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </CardHeader>

                    {/* Review Content */}
                    <CardContent className="flex-grow px-6 pb-6">
                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                        <p className="text-gray-700 leading-relaxed italic pl-6">
                          &quot;{testimonial.review}&quot;
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12 w-12 h-12 border-primary text-primary hover:bg-primary hover:text-white" />
            <CarouselNext className="-right-12 w-12 h-12 border-primary text-primary hover:bg-primary hover:text-white" />
          </Carousel>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-orange-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Create Your Own Story?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join hundreds of satisfied guests who have experienced the warmth
            and hospitality of BROADPARK Hotels. Book your stay today and become
            part of our family!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Book Your Stay
            </button>
            <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              View Our Rooms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialPage;
