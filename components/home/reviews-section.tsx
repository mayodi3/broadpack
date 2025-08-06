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
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alice Johnson",
    review:
      "This product exceeded my expectations! The quality is superb and it's incredibly easy to use. Highly recommend to everyone.",
    rating: 5,
  },
  {
    name: "Bob Williams",
    review:
      "A fantastic experience from start to finish. The customer support was excellent and the results speak for themselves.",
    rating: 4,
  },
  {
    name: "Charlie Brown",
    review:
      "Good value for money. It does what it promises, though there's a small learning curve. Overall, satisfied with the purchase.",
    rating: 3,
  },
  {
    name: "Diana Miller",
    review:
      "Absolutely love it! It has made my daily routine so much easier. I can't imagine going back to how things were before.",
    rating: 5,
  },
  {
    name: "Eve Davis",
    review:
      "Decent product, but I encountered a minor bug. Hopefully, it will be fixed in future updates. Still, it's quite useful.",
    rating: 3,
  },
];

const TopReviewSection = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <div className="w-full flex flex-col items-center justify-center mt-20 space-y-8 px-4">
      <div className="space-y-4 text-center">
        <h1 className="text-primary md:text-2xl flex items-center justify-center space-x-2">
          <div className="h-[2px] w-14 md:w-28 bg-primary"></div>
          <span className="text-primary">TESTIMONIALS</span>
          <div className="h-[2px] w-14 md:w-28 bg-primary"></div>
        </h1>
        <h1 className="text-3xl md:text-5xl font-extrabold">
          WHAT OUR <span className="text-primary">CLIENTS SAY</span>
        </h1>
      </div>

      <div className="w-full max-w-5xl">
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
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="h-full flex flex-col">
                    <CardHeader className="flex flex-row items-center gap-2 pb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-muted stroke-muted-foreground"
                          }`}
                        />
                      ))}
                    </CardHeader>
                    <CardContent className="flex-grow flex items-center justify-center p-6 text-center">
                      <p className="text-lg italic text-gray-700">
                        &quot;{testimonial.review}&quot;
                      </p>
                    </CardContent>
                    <CardFooter className="pt-2 text-right justify-end">
                      <p className="font-semibold text-gray-900">
                        - {testimonial.name}
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-7 w-16 h-16" />
          <CarouselNext className="absolute -right-7 w-16 h-16" />
        </Carousel>
      </div>
    </div>
  );
};

export default TopReviewSection;
