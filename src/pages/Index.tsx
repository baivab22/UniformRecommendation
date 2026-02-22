import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import BannerSlider from "@/components/BannerSlider";
import { ArrowRight, Check, Award, Zap, Users, TrendingUp, Ruler } from "lucide-react";
import { useScrollAnimation } from "@/lib/scrollAnimation";
import { useHorizontalScrollOnVerticalWheel } from "@/lib/useHorizontalScrollOnVerticalWheel";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const Index = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-orange-500" />,
      title: "Lightning Fast",
      description: "Get your size recommendations in minutes, not hours"
    },
    {
      icon: <Award className="h-8 w-8 text-orange-500" />,
      title: "Highly Accurate",
      description: "Our biometric algorithm ensures perfect fit every time"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Expert Support",
      description: "Access our sizing experts for additional help and guidance"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
      title: "Smart Analytics",
      description: "Track your measurements and sizing history over time"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Fashion Enthusiast",
      text: "Finally found my perfect fit! The Pickp sizing system is incredibly accurate and saves so much time.",
      avatar: "RK"
    },
    {
      name: "Priya Singh",
      role: "Student",
      text: "As someone who struggles with sizing online, Pickp has been a game-changer. Highly recommend!",
      avatar: "PS"
    },
    {
      name: "Arjun Patel",
      role: "Professional",
      text: "The process is seamless and the recommendations are spot-on. Best sizing solution I've used.",
      avatar: "AP"
    }
  ];

  const faqs = [
    {
      question: "How accurate are the size recommendations?",
      answer: "Our biometric sizing algorithm has a 95%+ accuracy rate based on extensive testing with thousands of users worldwide."
    },
    {
      question: "Can I get recommendations for multiple items?",
      answer: "Yes! You can get measurements for shirts, pants, and shoes all in one session. Each has its own sizing profile."
    },
    {
      question: "What if the size doesn't fit perfectly?",
      answer: "We provide detailed sizing charts and guidelines. You can also contact our support team for personalized assistance."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. All measurements and personal information are encrypted and stored securely according to industry standards."
    },
    {
      question: "Can I update my measurements later?",
      answer: "Yes, you can retake measurements anytime and your profile will be updated with the latest recommendations."
    },
    {
      question: "Do you work with specific brands?",
      answer: "Our recommendations work across most major brands. We're constantly expanding partnerships with leading retailers."
    }
  ];

  // Example: animate stats, features, testimonials, faqs
  const statsRef = useScrollAnimation<HTMLDivElement>("animate-fade-in-up");
  const featuresRef = useScrollAnimation<HTMLHeadingElement>("animate-fade-in-up");
  const testimonialsRef = useScrollAnimation<HTMLHeadingElement>("animate-fade-in-up");
  const faqsRef = useScrollAnimation<HTMLHeadingElement>("animate-fade-in-up");
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section (reference-inspired) */}
        <section className="relative mb-8 md:mb-12">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            {/* Left text panel */}
            <div className="bg-[rgb(246,243,243)] flex items-center">
              <div className="max-w-3xl pl-16 pr-8 py-20 lg:py-32">
                <p className="uppercase text-sm tracking-wider text-gray-600 mb-4">Ease and Style</p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900">
                  Confidence starts with the right fit.
                </h1>
              </div>
            </div>

            {/* Right image panel (slider) */}
            <div className="bg-[rgb(246,243,243)] relative flex items-center justify-center">
              <BannerSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section (animated marquee) */}
      <section className="py-16 bg-primary/10 border-b border-primary/20 overflow-hidden">
        <div className="container mx-auto px-0 md:px-8 w-full">
          <div className="relative" ref={statsRef} data-scroll-animate>
            <div className="w-full overflow-hidden">
              <div
                className="flex gap-16 animate-marquee whitespace-nowrap"
                style={{ animation: 'marquee 18s linear infinite' }}
              >
                {/* Stats block, duplicated for seamless loop */}
                {[
                  { value: '50K+', label: 'Students Sized', color: 'text-blue-600' },
                  { value: '95%', label: 'Accuracy Rate', color: 'text-blue-600' },
                  { value: '2 Min', label: 'Quick Sizing', color: 'text-orange-600' },
                  { value: '100+', label: 'Colleges', color: 'text-blue-600' },
                ].concat([
                  { value: '50K+', label: 'Students Sized', color: 'text-blue-600' },
                  { value: '95%', label: 'Accuracy Rate', color: 'text-blue-600' },
                  { value: '2 Min', label: 'Quick Sizing', color: 'text-orange-600' },
                  { value: '100+', label: 'Colleges', color: 'text-blue-600' },
                ]).map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center min-w-[220px]">
                    <div className={`text-3xl md:text-4xl font-bold ${stat.color}`}>{stat.value}</div>
                    <p className="text-gray-600 mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Marquee keyframes (Tailwind doesn't support custom keyframes inline, so add to global styles if not present) */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-2 md:px-8 w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" ref={featuresRef} data-scroll-animate>
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to your perfect fit
            </p>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="relative" ref={useScrollAnimation<HTMLDivElement>("animate-fade-in-left")} data-scroll-animate-left>
                <div className="space-y-4 p-8 rounded-xl bg-blue-50 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center">Enter Your Measurements</h3>
                  <p className="text-gray-700 text-center">
                    Fill out the form with your accurate body measurements.
                  </p>
                </div>
                {/* Arrow for desktop */}
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-orange-500" />
                </div>
              </div>
              {/* Step 2 */}
              <div className="relative" ref={useScrollAnimation<HTMLDivElement>("animate-fade-in-scale")} data-scroll-animate-scale>
                <div className="space-y-4 p-8 rounded-xl bg-orange-50 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                    <Ruler className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center">Get Recommendations</h3>
                  <p className="text-gray-700 text-center">
                    Receive personalized fit suggestions based on your data.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-orange-500" />
                </div>
              </div>
              {/* Step 3 */}
              <div className="space-y-4 p-8 rounded-xl bg-blue-50 hover:shadow-lg transition-shadow" ref={useScrollAnimation<HTMLDivElement>("animate-fade-in-right")} data-scroll-animate-right>
                <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center">Enjoy Your Perfect Fit</h3>
                <p className="text-gray-700 text-center">
                  Shop confidently knowing your fit is tailored for you.
                </p>
              </div>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8 w-[95vw]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" ref={testimonialsRef} data-scroll-animate>
              Why Choose Pickp?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of perfect fitting clothes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-white p-3 grid place-items-center shadow-md transform hover:scale-105 transition-transform">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8 w-[95vw]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              The Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Perfect fit guaranteed every time",
                "No more returns or exchanges",
                "Save time shopping online",
                "Boost your confidence",
                "Professional size guidance",
                "Multi-item sizing in one place",
                "Track sizing history",
                "Expert recommendations"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8 w-[95vw]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who've found their perfect fit
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-14 w-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-md">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="text-gray-700 italic relative pl-4">
                    <span className="absolute -left-2 -top-1 text-3xl text-orange-300">“</span>
                    <p className="leading-relaxed">{testimonial.text}</p>
                  </div>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-2 md:px-8 w-full flex flex-col items-center">
          <div className="mb-12 text-center max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4" ref={faqsRef} data-scroll-animate>
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Find answers to the most common questions about Pickp and our sizing process.
            </p>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-full max-w-7xl rounded-3xl border border-gray-100 bg-white/90 p-2 md:p-10">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {[0, 1].map(col => (
                  <Accordion type="single" collapsible className="w-full space-y-2" key={col}>
                    {faqs.filter((_, i) => i % 2 === col).map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${col}-${index}`} className="border-0">
                        <AccordionTrigger className="text-lg text-left text-gray-900 font-semibold px-6 py-4 bg-white hover:bg-gray-50 rounded-t-2xl focus:outline-none">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="bg-gray-50 px-6 pb-4 text-gray-700 rounded-b-2xl">
                          <div className="shadow-lg rounded-2xl bg-gray-50 px-6 pt-4 pb-4 text-gray-700">
                            {faq.answer}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: 'rgb(255 247 237)' }}>
        <div className="container mx-auto px-6 md:px-8 w-full flex justify-center">
          <div className="bg-white/5 rounded-3xl shadow-2xl max-w-xl w-full p-10 flex flex-col items-center text-center border border-white/10 backdrop-blur-md">
            <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/90 shadow-lg">
              <ArrowRight className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-indigo-900 drop-shadow-lg">Ready for Your Perfect Fit?</h2>
            <p className="text-lg md:text-xl mb-8 opacity-95 max-w-xl mx-auto text-indigo-900/90">
              Start your personalized sizing journey today and discover clothing that fits perfectly.
            </p>
            <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
              <Button
                size="lg"
                className="bg-white text-amber-600 hover:bg-black hover:text-white px-8 py-3 text-lg font-semibold rounded-full shadow-xl transition-all"
                asChild
              >
                <Link to="/student-form" className="inline-flex items-center justify-center w-full">
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Get Started Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
