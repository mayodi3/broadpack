"use client";

import BlogCard from "@/components/shared/blog-card";
import Hero from "@/components/shared/hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Blog } from "@/lib/types";
import { ArrowLeft, ArrowRight, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { blogs } from "./blogs";

const BlogsPage = () => {
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const [total, setTotal] = useState(0);

  // Filter and sort blogs
  useEffect(() => {
    if (!blogs) return;

    let filtered = [...blogs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm]);

  // Paginate filtered blogs
  const paginatedBlogs = filteredBlogs?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil((filteredBlogs?.length || 0) / pageSize);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />

      {/* Header Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="h-1 w-12 md:w-20 bg-primary"></div>
            <span className="text-primary font-semibold tracking-wider">
              BLOG POSTS
            </span>
            <div className="h-1 w-12 md:w-20 bg-primary"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Latest FROM <span className="text-primary">BLOG</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover insights, travel tips, and stories from BROADPARK HOTELS
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search blogs by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-primary"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 h-5 w-5" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 h-12">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {filteredBlogs?.length || 0}{" "}
                {(filteredBlogs?.length || 0) === 1 ? "blog" : "blogs"} found
              </Badge>
              {searchTerm && <span>for "{searchTerm}"</span>}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSortBy("newest");
                setCurrentPage(1);
              }}
              className="text-gray-500 hover:text-primary"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            {paginatedBlogs && paginatedBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginatedBlogs.map((blog, index) => (
                  <div
                    key={index}
                    className="transform hover:scale-105 transition-transform duration-200"
                  >
                    <BlogCard blog={blog} index={index} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No blogs found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm
                    ? `No blogs match "${searchTerm}"`
                    : "No blogs available at the moment"}
                </p>
                {searchTerm && (
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setCurrentPage(1);
                    }}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow-sm border p-6">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * pageSize + 1} to{" "}
                  {Math.min(currentPage * pageSize, filteredBlogs?.length || 0)}{" "}
                  of {filteredBlogs?.length || 0} blogs
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>

                  <div className="flex items-center space-x-1">
                    {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "default" : "ghost"
                          }
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={
                            currentPage === pageNum
                              ? "bg-primary hover:bg-primary/90"
                              : "hover:bg-gray-100"
                          }
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
