import { Blog } from "@/lib/types";
import { ArrowRight, Clock, Eye, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const BlogCard = ({ blog, index }: { blog: Blog; index: number }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={blog.images?.[0] || "/placeholder-blog.jpg"}
          alt={blog.title || blog.excerpt || "Blog post"}
          width={400}
          height={240}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Author Info */}
        {blog?.authorId && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
            <User className="h-4 w-4 text-primary" />
            <span>By {blog.authorId}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {blog.title || blog.excerpt}
        </h3>

        {/* Excerpt */}
        {blog.excerpt && blog.title && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {blog.excerpt}
          </p>
        )}

        {/* Read More Button */}
        <Link href={`/blogs/${index}`} className="block">
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent group/btn"
          >
            <span className="font-semibold">READ MORE</span>
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>

        {/* Reading Time Estimate */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>5 min read</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-3 w-3" />
            <span>View details</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
