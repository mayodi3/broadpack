import Image from "next/image";
import { Bed, Shield, Phone } from "lucide-react";

export default function WhyChooseUsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-24">
        <div className="relative flex justify-center lg:justify-end">
          <Image
            src="/Building 2.webp"
            width={400}
            height={600}
            alt="Front view of the Broadpark Hotel building"
            className="object-cover w-full h-[400px] md:h-[300px] lg:h-[400px]"
          />
          <div className="absolute -top-4 -right-4 md:top-4 md:right-4 bg-white p-6 shadow-lg border border-gray-100 text-center max-w-[180px]">
            <span className="text-5xl font-bold text-brand-orange">15</span>
            <span className="text-lg font-semibold text-brand-dark-text ml-1">
              Years
            </span>
            <div className="text-lg font-semibold text-brand-dark-text mt-1">
              Experience
            </div>
          </div>
        </div>

        {/* Right Section: Features Content */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-brand-orange uppercase tracking-wider">
              FEATURES
            </span>
            <div className="w-12 h-0.5 bg-brand-orange"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark-text leading-tight">
            Why <span className="text-brand-orange">CHOOSE</span> Us
          </h2>
          <p className="max-w-[600px] text-lg text-gray-600 leading-relaxed">
            At Broadpark Hotels, we are dedicated to providing an exceptional
            guest experience. We blend modern comfort with the warmth of Kenyan
            hospitality, ensuring every moment of your stay is memorable,
            comfortable, and truly special.
          </p>

          <div className="grid gap-8">
            {/* Feature Item 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-icon-background flex items-center justify-center">
                <Bed className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-dark-text">
                  Relaxed Living
                </h3>
                <p className="text-gray-600 mt-1">
                  Our rooms are designed to be your personal sanctuary. Enjoy a
                  serene and comfortable environment where you can unwind and
                  recharge after a day of work or exploration.
                </p>
              </div>
            </div>

            {/* Feature Item 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-icon-background flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-dark-text">
                  High Security System
                </h3>
                <p className="text-gray-600 mt-1">
                  Your safety is our top priority. We have a comprehensive
                  security system in place, including 24/7 surveillance and
                  professional staff, to ensure your peace of mind.
                </p>
              </div>
            </div>

            {/* Feature Item 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-icon-background flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-dark-text">
                  24/7 Telephone Support
                </h3>
                <p className="text-gray-600 mt-1">
                  Our dedicated front desk team is always just a phone call
                  away. Whether you need room service or assistance with your
                  plans, we are here to help you, day or night.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
