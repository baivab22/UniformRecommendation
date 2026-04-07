import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import BannerSlider from "@/components/BannerSlider";
import {
  ArrowRight,
  Check,
  Award,
  Zap,
  Users,
  TrendingUp,
  Ruler,
  Shield,
  Clock,
  Sparkles,
  Star,
  Quote,
} from "lucide-react";
import { useScrollAnimation } from "@/lib/scrollAnimation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const Index = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Get your size recommendations in minutes, not hours",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Highly Accurate",
      description: "Our biometric algorithm ensures perfect fit every time",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Support",
      description: "Access our sizing experts for additional help and guidance",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Smart Analytics",
      description: "Track your measurements and sizing history over time",
      color: "from-violet-500 to-purple-500",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Fashion Enthusiast",
      text: "Finally found my perfect fit! The Pickp sizing system is incredibly accurate and saves so much time.",
      avatar: "RK",
      rating: 5,
    },
    {
      name: "Priya Singh",
      role: "Student",
      text: "As someone who struggles with sizing online, Pickp has been a game-changer. Highly recommend!",
      avatar: "PS",
      rating: 5,
    },
    {
      name: "Arjun Patel",
      role: "Professional",
      text: "The process is seamless and the recommendations are spot-on. Best sizing solution I've used.",
      avatar: "AP",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "How accurate are the size recommendations?",
      answer:
        "Our biometric sizing algorithm has a 95%+ accuracy rate based on extensive testing with thousands of users worldwide.",
    },
    {
      question: "Can I get recommendations for multiple items?",
      answer:
        "Yes! You can get measurements for shirts, pants, and shoes all in one session. Each has its own sizing profile.",
    },
    {
      question: "What if the size doesn't fit perfectly?",
      answer:
        "We provide detailed sizing charts and guidelines. You can also contact our support team for personalized assistance.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. All measurements and personal information are encrypted and stored securely according to industry standards.",
    },
    {
      question: "Can I update my measurements later?",
      answer:
        "No, you can retake measurements anytime and your profile will be updated with the latest recommendations.",
    },
    {
      question: "Do you work with specific brands?",
      answer:
        "Our recommendations work across most major brands. We're constantly expanding partnerships with leading retailers.",
    },
  ];

  const leftFaqs = faqs.filter((_, index) => index % 2 === 0);
  const rightFaqs = faqs.filter((_, index) => index % 2 === 1);

  const statsRef = useScrollAnimation<HTMLDivElement>("animate-fade-in-up");
  const featuresRef = useScrollAnimation<HTMLHeadingElement>("animate-fade-in-up");
  const testimonialsRef = useScrollAnimation<HTMLHeadingElement>("animate-fade-in-up");
  const faqsRef = useScrollAnimation<HTMLHeadingElement>("animate-fade-in-up");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden pt-8 md:pt-12">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-amber-200 to-orange-300 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="flex flex-col space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 w-fit text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>Ease and Style</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                Confidence starts with{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  the right fit
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Experience the future of online shopping with our AI-powered
                sizing technology. Get perfectly fitted clothes delivered to
                your door.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full px-8 shadow-lg shadow-amber-200 transition-none hover:from-amber-600 hover:to-orange-600 hover:text-white hover:shadow-lg hover:scale-100"
                  asChild
                >
                  <Link to="/student-form">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">2,000+</span>{" "}
                  happy customers
                </div>
              </div>
            </div>

            {/* Right Slider */}
            <div className="relative lg:ml-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-100 to-orange-100 rounded-3xl blur-2xl -z-10" />
              <BannerSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 mt-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            ref={statsRef}
            data-scroll-animate
          >
            {[
              { value: "50K+", label: "Students Sized" },
              { value: "95%", label: "Accuracy Rate" },
              { value: "2 Min", label: "Quick Sizing" },
              { value: "100+", label: "Colleges" },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
              <Ruler className="h-4 w-4" />
              <span>Simple Process</span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              ref={featuresRef}
              data-scroll-animate
            >
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to your perfect fit
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter Your Measurements",
                description:
                  "Fill out the form with your accurate body measurements.",
                icon: <Zap className="h-6 w-6" />,
                color: "from-blue-500 to-indigo-500",
              },
              {
                step: "02",
                title: "Get Recommendations",
                description:
                  "Receive personalized fit suggestions based on your data.",
                icon: <Ruler className="h-6 w-6" />,
                color: "from-amber-500 to-orange-500",
              },
              {
                step: "03",
                title: "Enjoy Your Perfect Fit",
                description:
                  "Shop confidently knowing your fit is tailored for you.",
                icon: <Check className="h-6 w-6" />,
                color: "from-emerald-500 to-teal-500",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative group"
                ref={useScrollAnimation<HTMLDivElement>(
                  idx === 0
                    ? "animate-fade-in-left"
                    : idx === 1
                    ? "animate-fade-in-scale"
                    : "animate-fade-in-right"
                )}
                data-scroll-animate={idx === 0 ? "left" : idx === 1 ? "scale" : "right"}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-2xl blur transition duration-500" />
                <div className="relative bg-white rounded-2xl p-8 shadow-lg shadow-slate-200 border border-slate-100 hover:shadow-xl transition-all">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold mb-6`}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Why Choose Us</span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              ref={testimonialsRef}
              data-scroll-animate
            >
              Experience the future of perfect fitting clothes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-4">
                <Shield className="h-4 w-4" />
                <span>Benefits</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Pickp is the best choice for you
              </h2>
              <p className="text-gray-600 mb-8">
                Join thousands of satisfied customers who've found their perfect
                fit with our innovative sizing technology.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Perfect fit guaranteed",
                  "No more returns",
                  "Save time shopping",
                  "Boost your confidence",
                  "Professional guidance",
                  "Multi-item sizing",
                  "Track your history",
                  "Expert recommendations",
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Check className="h-3 w-3 text-emerald-600" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl blur-2xl opacity-50" />
              <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Rated 4.9/5</div>
                    <div className="text-sm text-gray-500">
                      by 2,000+ customers
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    "The fit was absolutely perfect!",
                    "Best online shopping experience ever.",
                    "Finally, no more returns!",
                  ].map((quote, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Quote className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600">{quote}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-medium mb-4">
              <Users className="h-4 w-4" />
              <span>Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600">
              Join thousands of satisfied customers who've found their perfect
              fit
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-14 md:py-20 bg-gradient-to-b from-white via-indigo-50/20 to-white">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
          <div className="absolute top-12 right-8 h-40 w-40 rounded-full bg-amber-100 blur-3xl" />
          <div className="absolute bottom-10 left-8 h-44 w-44 rounded-full bg-indigo-100 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-black text-xs sm:text-sm font-semibold mb-4">
              <Clock className="h-4 w-4" />
              <span>FAQ</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4"
              ref={faqsRef}
              data-scroll-animate
            >
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-black">
              Find answers to the most common questions about Pickp
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-7 max-w-5xl mx-auto items-start">
            <div className="flex flex-col gap-4 md:gap-5">
              {leftFaqs.map((faq, index) => {
                const faqNumber = index * 2 + 1;

                return (
                  <Accordion type="single" collapsible key={faq.question} className="w-full">
                    <AccordionItem
                      value={`faq-left-${index}`}
                      className="group rounded-2xl border border-slate-200 bg-white px-4 sm:px-5 shadow-sm hover:shadow-lg hover:border-amber-300 transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-black hover:text-black py-4 sm:py-5 leading-relaxed">
                        <span className="flex items-start gap-3 pr-4">
                          <span className="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-amber-100 text-[11px] font-bold text-black">
                            {String(faqNumber).padStart(2, "0")}
                          </span>
                          <span>{faq.question}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm sm:text-base text-black leading-relaxed pb-4 sm:pb-5 pl-9">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 md:gap-5">
              {rightFaqs.map((faq, index) => {
                const faqNumber = index * 2 + 2;

                return (
                  <Accordion type="single" collapsible key={faq.question} className="w-full">
                    <AccordionItem
                      value={`faq-right-${index}`}
                      className="group rounded-2xl border border-slate-200 bg-white px-4 sm:px-5 shadow-sm hover:shadow-lg hover:border-amber-300 transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-black hover:text-black py-4 sm:py-5 leading-relaxed">
                        <span className="flex items-start gap-3 pr-4">
                          <span className="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-amber-100 text-[11px] font-bold text-black">
                            {String(faqNumber).padStart(2, "0")}
                          </span>
                          <span>{faq.question}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm sm:text-base text-black leading-relaxed pb-4 sm:pb-5 pl-9">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-8 md:mt-10 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 to-orange-50 p-4 sm:p-5 text-center shadow-sm">
            <p className="text-sm sm:text-base text-black font-medium">
              Still need help? Our support team is ready to guide you with sizing and profile setup.
            </p>
            <p className="text-xs sm:text-sm text-black font-semibold mt-1.5">
              Average response time under 10 minutes
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-16 text-center shadow-2xl sm:px-16">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready for Your Perfect Fit?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-amber-50">
                Start your personalized sizing journey today and discover
                clothing that fits perfectly.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4">
                <Button
                  size="lg"
                  className="w-fit bg-white text-amber-600 rounded-full px-8 shadow-lg transition-none hover:bg-white hover:text-amber-600 hover:shadow-lg hover:scale-100"
                  asChild
                >
                  <Link to="/student-form">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  className="w-fit bg-orange-500 text-white border border-orange-500 rounded-full px-8 shadow-lg transition-none hover:bg-orange-500 hover:text-white hover:shadow-lg hover:scale-100"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;