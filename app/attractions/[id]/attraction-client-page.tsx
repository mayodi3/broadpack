"use client";

import Hero from "@/components/shared/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  Heart,
  ImageIcon,
  Mail,
  MapPin,
  Phone,
  Share2,
  Star,
  Users,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

export default function AttractionClientPage({
  attraction,
}: {
  attraction: any;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);

  if (!attraction) {
    notFound();
  }

  const expandedGallery = [attraction.image, ...attraction.gallery];

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />

      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/attractions"
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Attractions
          </Link>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Heart className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Hero Image & Gallery Section */}
        <div className="bg-white shadow-lg overflow-hidden mb-8">
          {/* Main Featured Image */}
          <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
            <Image
              src={expandedGallery[selectedImage] || "/placeholder.svg"}
              alt={attraction.name}
              fill
              className="object-cover transition-all duration-500"
              priority
            />

            {/* Image Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                    {attraction.name}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{attraction.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{attraction.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right text-white">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-xl font-bold">
                      {attraction.rating}
                    </span>
                  </div>
                  <div className="text-sm opacity-90">
                    {attraction.reviews} reviews
                  </div>
                </div>
              </div>
            </div>

            {/* Image Navigation */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev > 0 ? prev - 1 : expandedGallery.length - 1
                  )
                }
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev < expandedGallery.length - 1 ? prev + 1 : 0
                  )
                }
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
              >
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Button>
            </div>

            {/* Gallery Toggle */}
            <div className="absolute top-6 right-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFullGallery(!showFullGallery)}
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                {expandedGallery.length} Photos
              </Button>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Gallery</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFullGallery(!showFullGallery)}
                className="text-primary hover:text-primary/80"
              >
                {showFullGallery ? "Show Less" : "View All Photos"}
                <Eye className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div
              className={`grid gap-3 transition-all duration-300 ${
                showFullGallery
                  ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                  : "grid-cols-4 sm:grid-cols-6 md:grid-cols-8"
              }`}
            >
              {expandedGallery
                .slice(0, showFullGallery ? expandedGallery.length : 8)
                .map((img: string, index: number) => (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-lg cursor-pointer group ${
                      selectedImage === index ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${attraction.name} gallery ${index + 1}`}
                      width={120}
                      height={80}
                      className={`w-full object-cover transition-all duration-300 group-hover:scale-110 ${
                        showFullGallery ? "h-20 sm:h-24" : "h-16"
                      }`}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white shadow-sm border">
            <CardContent className="p-4 text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="font-semibold text-gray-900">
                {attraction.location}
              </div>
              <div className="text-sm text-gray-600">{attraction.distance}</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="font-semibold text-gray-900">
                {attraction.duration}
              </div>
              <div className="text-sm text-gray-600">{attraction.bestTime}</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="font-semibold text-gray-900">Entry Fee</div>
              <div className="text-sm text-gray-600">{attraction.entryFee}</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="font-semibold text-gray-900">Group Size</div>
              <div className="text-sm text-gray-600">
                {attraction.groupSize}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description & Action Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              About {attraction.name}
            </h2>

            <p className="text-gray-700 leading-relaxed text-lg mb-8 text-center">
              {attraction.longDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Tour Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white px-8"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call for Info
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white px-8"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Information Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activities */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Activities & Experiences
              </h2>
              <div className="space-y-3">
                {attraction.activities.map(
                  (activity: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{activity}</span>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Practical Information */}
          <div className="space-y-6">
            {/* Highlights */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Highlights
                </h3>
                <div className="flex flex-wrap gap-2">
                  {attraction.highlights.map(
                    (highlight: string, index: number) => (
                      <span
                        key={index}
                        className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Facilities
                </h3>
                <div className="space-y-2">
                  {attraction.facilities.map(
                    (facility: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700 text-sm">
                          {facility}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* What to Bring */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What to Bring
                </h3>
                <div className="space-y-2">
                  {attraction.whatToBring.map((item: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
