import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ShieldCheck, Zap, Heart, Ruler, Shirt, ShoppingBag, Footprints } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Ruler className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">SizeRight</span>
          </div>
          <Link to="/admin">
            <Button variant="ghost" size="sm">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6" variant="secondary">
            ✨ Perfect Fit Guaranteed
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Find Your Perfect Size
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get accurately measured for shirts, pants, and shoes with our smart sizing system. 
            Quick, easy, and designed for students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/student-form">
              <Button variant="gradient" size="xl" className="w-full sm:w-auto">
                <Users className="h-5 w-5 mr-2" />
                Start Measurement
              </Button>
            </Link>
            <Button variant="outline" size="xl" className="w-full sm:w-auto">
              <Heart className="h-5 w-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose SizeRight?</h2>
          <p className="text-muted-foreground text-lg">Fast, accurate, and user-friendly sizing for everyone</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>Complete your measurements in under 3 minutes</CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-accent flex items-center justify-center">
                <Ruler className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Precise Measurements</CardTitle>
              <CardDescription>Get accurate sizing for the perfect fit every time</CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Secure & Private</CardTitle>
              <CardDescription>Your data is encrypted and stored securely</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Clothing Types Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30 rounded-3xl my-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get Measured For</h2>
          <p className="text-muted-foreground text-lg">Choose what you want to get the perfect size for</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <Shirt className="mx-auto h-16 w-16 text-primary mb-4" />
              <CardTitle>Shirts</CardTitle>
              <CardDescription>Chest, shoulder, and sleeve measurements for the perfect shirt fit</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Chest circumference</li>
                <li>• Shoulder width</li>
                <li>• Sleeve length</li>
                <li>• Body length</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <ShoppingBag className="mx-auto h-16 w-16 text-primary mb-4" />
              <CardTitle>Pants</CardTitle>
              <CardDescription>Waist, hip, and inseam measurements for comfortable pants</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Waist circumference</li>
                <li>• Hip measurement</li>
                <li>• Inseam length</li>
                <li>• Thigh width</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <Footprints className="mx-auto h-16 w-16 text-primary mb-4" />
              <CardTitle>Shoes</CardTitle>
              <CardDescription>Foot length and width for the most comfortable shoes</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Foot length</li>
                <li>• Foot width</li>
                <li>• Arch height</li>
                <li>• Toe shape</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of students who have found their perfect fit with SizeRight
          </p>
          <Link to="/student-form">
            <Button variant="gradient" size="xl">
              <Users className="h-5 w-5 mr-2" />
              Start Your Measurement
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 SizeRight. Built for students, by students.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
