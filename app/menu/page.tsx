import React from "react";
import Image from "next/image";
import Hero from "@/components/shared/hero";

const dishes = [
  {
    id: 1,
    name: "Grilled Lamb Chops",
    description: "Marinated in herbs and served with rosemary potatoes.",
    price: "KES 2,500",
    image: "/KRD03804.webp", // Changed from /lamb-chops.jpeg
  },
  {
    id: 2,
    name: "Spicy Pork Belly",
    description: "Slow-roasted pork belly with chili glaze.",
    price: "KES 2,200",
    image: "/Chef Cooking.webp", // Changed from /pork-belly.jpeg
  },
  {
    id: 3,
    name: "Seared Tuna Steak",
    description: "Served with wasabi mayo and mixed greens.",
    price: "KES 2,800",
    image: "/Meals.webp", // Changed from /tuna-steak.jpeg
  },
  {
    id: 4,
    name: "Vegetarian Platter",
    description: "Grilled seasonal veggies with hummus and pita.",
    price: "KES 1,500",
    image: "/Kitchen 1.webp", // Changed from /veggie-platter.jpeg
  },
  {
    id: 5,
    name: "Seafood Paella",
    description: "Classic Spanish rice with shrimp, mussels, and saffron.",
    price: "KES 3,000",
    image: "/Customers Serving.webp", // Changed from /panella.jpeg
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    description: "Rich molten chocolate cake served with vanilla ice cream.",
    price: "KES 1,200",
    image: "/Customers 1.webp", // Changed from /lava-cake.jpeg
  },
];

const RestaurantMenuPage = () => {
  return (
    <div className="mb-10">
      <Hero />
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-primary">
              Our Signature Delicacies
            </h2>
            <p className="mt-4 text-gray-600">
              Explore our chef&apos;s curated selection of exquisite dishes,
              each priced for your convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {dishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative h-[300px] w-full">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6 flex flex-col items-center space-y-3">
                  <div className="flex items-center justify-between space-x-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {dish.name}
                    </h3>
                    <span className="text-primary font-bold text-sm">
                      {dish.price}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">
                    {dish.description}
                  </p>
                  <button className="mt-4 w-full bg-primary text-white py-2 font-medium hover:bg-primary-dark transition-colors">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenuPage;
