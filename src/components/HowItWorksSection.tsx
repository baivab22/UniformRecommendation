import { motion } from 'framer-motion';
import { Lightning, Ruler, Check } from 'lucide-react';

const steps = [
  {
    title: 'Enter Your Measurements',
    description: 'Fill out the form with your accurate body measurements.',
    icon: <Lightning className="h-10 w-10 text-orange-500" />,
    bg: 'bg-blue-50',
  },
  {
    title: 'Get Recommendations',
    description: 'Receive personalized fit suggestions based on your data.',
    icon: <Ruler className="h-10 w-10 text-orange-500" />,
    bg: 'bg-orange-50',
  },
  {
    title: 'Enjoy Your Perfect Fit',
    description: 'Shop confidently knowing your fit is tailored for you.',
    icon: <Check className="h-10 w-10 text-orange-500" />,
    bg: 'bg-blue-50',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-gray-900 mb-4"
        >
          How It Works
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-lg text-gray-500"
        >
          Three simple steps to your perfect fit
        </motion.p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto">
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2 * idx, duration: 0.7 }}
            className={`relative flex-1 rounded-3xl shadow-xl ${step.bg} p-8 flex flex-col items-center group hover:scale-105 hover:shadow-2xl transition-transform duration-300`}
          >
            <div className="mb-4">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">
              {step.title}
            </h3>
            <p className="text-gray-500 text-base mb-4">
              {step.description}
            </p>
            {idx < steps.length - 1 && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 * idx, duration: 0.5 }}
                className="absolute right-[-24px] top-1/2 transform -translate-y-1/2 text-orange-400 text-3xl md:block hidden"
              >
                &rarr;
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
