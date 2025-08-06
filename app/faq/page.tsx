"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/shared/hero";

const popularFaqs = [
  { question: "What are your check-in and check-out times?", href: "#" },
  { question: "Which payment methods do you accept?", href: "#" },
  { question: "Do you offer airport transportation?", href: "#" },
  { question: "Is parking available on-site?", href: "#" },
  { question: "What is your cancellation policy?", href: "#" },
  { question: "Are pets allowed?", href: "#" },
];

const faqs = [
  {
    question: "What are your check-in and check-out times?",
    answer:
      "Our standard check-in time is 2:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can be arranged upon request and is subject to availability.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "We accept major credit cards (Visa, MasterCard), mobile payments via M-Pesa, and cash payments in Kenyan Shillings.",
  },
  {
    question: "Do you offer airport transportation?",
    answer:
      "Yes—we can arrange reliable airport transfers to and from nearby airports. Please contact our front desk at least 24 hours in advance to book this service.",
  },
  {
    question: "Is parking available on-site?",
    answer:
      "We provide complimentary, secure parking for all registered hotel guests. No need to reserve a spot ahead of time.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellations made at least 48 hours before your scheduled arrival date are free of charge. For details on non-refundable and group bookings, please refer to your reservation confirmation.",
  },
  {
    question: "Are pets allowed?",
    answer:
      "To ensure comfort for all guests, we do not allow pets—service animals are of course welcome with proper documentation.",
  },
  {
    question: "What amenities do you offer for business travelers?",
    answer:
      "We have a fully equipped business center, high-speed Wi-Fi throughout the hotel, and flexible meeting rooms with audio-visual gear available on request.",
  },
  {
    question: "Do you have a swimming pool and fitness center?",
    answer:
      "Yes—our outdoor swimming pool is open daily from 8 AM to 6 PM, and the fitness center is accessible 24/7 with your room key.",
  },
  {
    question:
      "Can I make special requests (e.g., extra bed, dietary requirements)?",
    answer:
      "Absolutely—just let us know at the time of booking or contact our concierge team, and we’ll do our best to accommodate your needs.",
  },
];

export default function FAQPage() {
  return (
    <div>
      <Hero />
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-4 mb-8">
              <Image
                src="/room.webp?height=200&width=300"
                alt="Hotel Room 1"
                width={300}
                height={200}
                className="object-cover shadow-md"
              />
              <Image
                src="/room.webp?height=200&width=300"
                alt="Hotel Room 2"
                width={300}
                height={200}
                className="object-cover shadow-md"
              />
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>

            <p className="text-gray-700 leading-relaxed mb-8">
              Got more questions about your stay at BROADPARK HOTELS? Browse our
              FAQs below or reach out directly—our team is here to help make
              your visit seamless.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-md"
                >
                  <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline py-4 px-6 bg-orange-100 rounded-t-md data-[state=open]:rounded-b-none">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="p-6 bg-white border-t border-gray-200 rounded-b-md">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Popular FAQs */}
            <Card className="bg-gray-50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  Popular FAQs
                  <span className="ml-2 h-[2px] w-12 bg-primary"></span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {popularFaqs.map((faq, index) => (
                    <li key={index}>
                      <Link
                        href={faq.href}
                        className="flex items-center text-gray-700 hover:text-primary transition-colors"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 text-primary" />
                        {faq.question}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card className="bg-gray-50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  Help & Support
                  <span className="ml-2 h-[2px] w-12 bg-primary"></span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Need further assistance? Our 24/7 front-desk team is ready to
                  help with any special requests or questions.
                </p>
                <Button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md flex items-center justify-center text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  0719 651 708 / 0788 555 9990
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
