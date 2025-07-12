import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ShieldCheck,
  Zap,
  Heart,
  Ruler,
  Shirt,
  ShoppingBag,
  Footprints,
  TrendingUp,
  Target,
  Smartphone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-blue-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Ruler className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold  text-gray-800">Fit-find</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#solution"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Solution
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              How it works
            </a>
            <a
              href="#try-it-out"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Try it out
            </a>
            <Link to="/admin">
              <Button
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Admin Login
              </Button>
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full">
              Contact us
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold  mb-8 leading-tight">
              The best <span className="text-yellow-300">biometric sizing</span>{" "}
              to determine{" "}
              <span className="text-yellow-300">right size and fit</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-blue-100">
              We want to help you make online shopping easier and help your
              customers find the right size and fit.
            </p>
            <Button
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link to="/student-form">
                <ArrowRight className="h-5 w-5 mr-2" />
                Try It Free
              </Link>
            </Button>
          </div>
        </div>
        {/* Illustration placeholder - you can add an actual illustration here */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full opacity-20">
          <div className="flex items-center justify-center h-full">
            <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <Ruler className="h-32 w-32 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* World's Best Size Advisor Section */}
      <section id="solution" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                The World's best size advisor
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Consumers will get a-better-as-standardized fit, correct view on
                stock availability and easy integration of product customization
                for Made-to-Measure
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Your best fit
                  </h3>
                  <div className="bg-green-100 rounded-xl p-6 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold">37 • S</span>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="bg-orange-500 h-2 rounded-full mt-2">
                      <div className="bg-orange-600 h-2 rounded-full w-[92%]"></div>
                    </div>
                    <span className="text-orange-600 font-bold">92%</span>
                  </div>
                  <div className="bg-gray-100 rounded-xl p-6">
                    <div className="flex items-center justify-between text-gray-500">
                      <span className="text-xl">38</span>
                      <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="bg-gray-300 h-2 rounded-full mt-2">
                      <div className="bg-gray-400 h-2 rounded-full w-[8%]"></div>
                    </div>
                    <span className="text-gray-500">8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Your measurements
                </h3>
                <p className="text-gray-600 mb-6">
                  Find the size that suits you best based on people who look
                  like you.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      HEIGHT
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                      <option>174cm-5feet 8.5inch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WEIGHT
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                      <option>63kg-139lbs-9.9stone</option>
                    </select>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                  Continue →
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-5xl font-bold  text-gray-800 mb-8">
                How It Works
              </h2>
              <div className="space-y-8">
                <p className="text-xl text-gray-600 leading-relaxed">
                  Using advanced Biometric algorithm, Biometric Sizing matches
                  shoppers against their fit doubles to deliver unbeatably
                  accurate, data-driven sizing recommendations that are easily
                  understood by end users.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  User enter height, weight and others parameters like age,
                  shape, morphology... He get a recommendation for the best size
                  and he find his perfect fit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold  text-gray-800 mb-4">
            The benefits of
            <br />
            fit-find
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <TrendingUp className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                For E-Commerce
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Significantly reduces returns and increases consumer confidence
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center">
                <Target className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                For marketing
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Helps you reliably identify higher-value consumers and Closes
                the customer gap with gender and age breakdowns.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full flex items-center justify-center">
                <Smartphone className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                User Experience
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Communicates size recommendations in easy-to-understand 'social
                proof' format.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section id="try-it-out" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700"></div>
        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-5xl font-bold  mb-8">
                Get Started In Weeks.
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                We have a structured integration process that gets you up and
                running quickly with zero additional IT overhead on your side.
              </p>
              <Button
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                asChild
              >
                <Link to="/student-form">Get a demo for Free</Link>
              </Button>
            </div>
            <div className="relative">
              {/* Illustration placeholder */}
              <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="text-center text-white">
                  <Users className="h-32 w-32 mx-auto mb-4" />
                  <p className="text-lg">Interactive Demo Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                Don't Hesitate to Contact sihee-it sarl for any Information.
              </h2>
              <div className="space-y-6">
                <p className="text-gray-600">
                  Call us for immediate support to this number
                </p>
                <div className="text-2xl font-bold text-blue-600">
                  Whatsapp 0032478041506
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📧</span>
                    Email: services@sihee-it.com
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span>
                    Address: Tunisia
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full text-lg font-semibold">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <Ruler className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold ">Biometric Sizing</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Fit-find</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Solution</li>
                <li>How it works?</li>
                <li>Try it out</li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-400">&copy;Copyright 2022</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
