import { blogs } from "../blogs";
import BlogPostClient from "./blog-post-client";

export async function generateStaticParams() {
  return blogs.map((blog, index) => ({
    id: index.toString(),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = blogs[parseInt(id)];

  return <BlogPostClient blog={blog} />;
}
