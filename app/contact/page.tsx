"use client";

import { Mail, Phone, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Hero from "@/components/shared/hero";
import { FormEvent, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Dynamically import the Map component to ensure it only runs on the client
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/shared/Map"), {
        loading: () => <p>A map is loading...</p>,
        ssr: false,
      }),
    []
  );

  // Your hotel's coordinates
  const hotelPosition: [number, number] = [0.076756, 34.719414];

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm("service_yiiq9qq", "template_x2kdbwq", form.current!, {
        publicKey: "dfgwoH7dPSWT8UHCS",
      })
      .then(
        () => {
          toast.success("Email Sent. We'll Contact You Shortly");
          setIsLoading(false);
          form.current!.reset();
        },
        (error) => {
          toast.error("Failed to Send email. Please try again.");
          setIsLoading(false);
        }
      );
  };

  return (
    <div>
      <Hero />
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="space-y-4 text-center mb-12">
          <h1 className="text-primary md:text-2xl flex items-center justify-center space-x-2">
            <div className="h-[2px] w-14 md:w-28 bg-primary"></div>
            <span className="text-primary">CONTACT US</span>
            <div className="h-[2px] w-14 md:w-28 bg-primary"></div>
          </h1>
          <h1 className="text-3xl md:text-5xl font-extrabold">
            CONTACT For Any <span className="text-primary">Query</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 rounded-full p-3 mb-3">
              <Building className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              BOOKING
            </h3>
            <p className="text-gray-700">info@broadparkhotels.co.ke</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 rounded-full p-3 mb-3">
              <Mail className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              GENERAL
            </h3>
            <p className="text-gray-700">info@broadparkhotels.co.ke</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 rounded-full p-3 mb-3">
              <Phone className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
            <p className="text-gray-700">0719 651 708 / 0788 555 9990</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
            <Map position={hotelPosition} zoom={16} />
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 shadow-md">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="space-y-4 flex flex-col justify-between h-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  className="py-10 border border-gray-300 rounded-md"
                />
                <Input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  className="py-10 border border-gray-300 rounded-md"
                />
              </div>
              <Input
                type="text"
                placeholder="Subject"
                name="user_subject"
                className="py-10 border border-gray-300 rounded-md"
              />
              <Textarea
                name="message"
                placeholder="Message"
                rows={6}
                className="py-10 border border-gray-300 rounded-md resize-none"
              />
              <Button
                disabled={isLoading}
                className="w-full bg-primary text-white font-bold py-6 rounded-none px-4 text-lg"
              >
                {isLoading ? "SENDING MESSAGE..." : "SEND MESSAGE"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
