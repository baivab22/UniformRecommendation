import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ruler, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5">
      {/* Simple Navigation */}
      <nav className="bg-background/90 backdrop-blur-sm sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
              <Ruler className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Fit-Find</span>
          </div>
          <Link to="/admin">
            <Button variant="outline">Admin Login</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary"></div>
        <div className="relative container mx-auto px-4 text-center text-primary-foreground">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Find Your Perfect Fit
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-primary-foreground/90">
              Get accurate size recommendations for shirts, pants, and shoes using our advanced biometric sizing technology.
            </p>
            <Button
              size="lg"
              className="bg-background text-primary hover:bg-background/90 px-8 py-4 text-lg font-semibold rounded-full shadow-xl"
              asChild
            >
              <Link to="/student-form">
                <ArrowRight className="h-5 w-5 mr-2" />
                Start Sizing
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Simple How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold">Enter Details</h3>
              <p className="text-muted-foreground">
                Provide your basic measurements and body information
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold">Take Measurements</h3>
              <p className="text-muted-foreground">
                Follow our guided process for shirts, pants, and shoes
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold">Get Recommendations</h3>
              <p className="text-muted-foreground">
                Receive accurate size recommendations for all clothing types
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="h-8 w-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <Ruler className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Fit-Find</span>
          </div>
          <p className="text-muted-foreground">&copy; 2024 Fit-Find. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
