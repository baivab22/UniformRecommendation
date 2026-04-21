import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <section className="max-w-3xl w-full bg-white/90 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100">
          <h1 className="text-[20px] font-semibold text-amber-700 mb-6 text-center tracking-tight">About PICKP Pty Ltd</h1>
          <div className="space-y-6 text-lg md:text-xl text-gray-800 leading-relaxed">
            <p>PICKP Pty Ltd is an Australian-based uniform solutions provider specialising in cookery, carpentry, and trade course uniforms for VET colleges across the country. We partner with educational institutions to deliver high-quality, industry-relevant uniforms that combine durability, comfort, and professional standards.</p>
            <p>Driven by a commitment to innovation, PICKP goes beyond traditional uniform supply. Our smart, data-led sizing platform simplifies the entire process—helping institutions and students find the right fit with ease, reducing returns, and improving operational efficiency.</p>
            <p>PICKP was founded by Udit Srivastava and Param Srivastava, who bring extensive experience in operations, education, and customer-focused services. Through their hands-on involvement with training organisations and students, they recognised a clear gap in how uniforms were sized, ordered, and managed. This insight led to the creation of PICKP—combining practical industry knowledge with technology to deliver a smarter, more reliable solution.</p>
            <p>Today, PICKP continues to support VET providers across Australia with a focus on quality, efficiency, and a seamless user experience.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
