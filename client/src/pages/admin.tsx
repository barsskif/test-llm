import { AdminPanel } from "@/components/admin-panel";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Admin() {
  return (
    <div className="min-h-screen bg-antique-white">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" className="text-dark-brown hover:text-goldenrod">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Store
            </Button>
          </Link>
        </div>
      </div>
      <AdminPanel />
    </div>
  );
}
