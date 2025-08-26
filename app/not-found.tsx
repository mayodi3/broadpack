import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4 py-12">
      <TriangleAlert className="w-24 h-24 text-primary mb-6" />
      <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        We&apos;re sorry, the page you have looked for does not exist in our our
        website! Maybe go to our home page or try to use a search?
      </p>
      <Link href="/" passHref>
        <Button className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-8 text-lg">
          GO BACK TO HOME
        </Button>
      </Link>
    </div>
  );
}
