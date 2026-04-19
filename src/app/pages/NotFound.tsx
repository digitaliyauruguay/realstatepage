import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
            404
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-[#F8FAFC]">Page Not Found</h1>

        <p className="text-xl text-[#94A3B8] mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white px-8 py-6 text-lg">
              <Home className="mr-2 w-5 h-5" />
              Go Home
            </Button>
          </Link>

          <Link to="/properties">
            <Button className="bg-[#334155] hover:bg-[#475569] text-white px-8 py-6 text-lg">
              <ArrowLeft className="mr-2 w-5 h-5" />
              Browse Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
