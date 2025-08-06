"use client";

import Hero from "@/components/shared/hero";
import ImageCarousel from "@/components/shared/image-carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Bookmark,
  Clock,
  Eye,
  Heart,
  Share2,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Content from "./content";

export default function BlogPostClient({ blog }: { blog: any }) {
  const router = useRouter();

  if (!blog) {
    return <div>Blog post not found.</div>;
  }

  const htmlContent = blog.content;
  const images = blog.images;

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <div className="container mx-auto px-4 py-6">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="inline-flex items-center text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {blog.authorId && (
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm text-gray-600">
                    By {blog.authorId}
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-600">5 min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-600">245 views</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {blog.title}
            </h1>
            {blog.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {blog.excerpt}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t">
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Heart className="h-4 w-4 mr-2" />
                Like
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            {images && images.length > 0 && (
              <div className="mb-8">
                <ImageCarousel images={images} />
              </div>
            )}
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <Content initialHTML={htmlContent} />
              </div>
            </div>
            <div className="border-t bg-gray-50 p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  {blog.authorId && (
                    <Badge variant="outline">Author: {blog.authorId}</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Share this article:
                  </span>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related/Navigation */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link href="/blogs" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  View All Blogs
                </Button>
              </Link>
              <div className="text-center">
                <p className="text-sm text-gray-600">Enjoyed this article?</p>
                <p className="text-xs text-gray-500">
                  Check out our other blog posts
                </p>
              </div>
              <Link href="/rooms" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Book Your Stay
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
