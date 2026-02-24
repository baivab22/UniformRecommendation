import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Fashion Enthusiast',
    initials: 'RK',
    text: 'Finally found my perfect fit! The Pickp sizing system is incredibly accurate and saves so much time.',
    rating: 5,
  },
  {
    name: 'Priya Singh',
    role: 'Student',
    initials: 'PS',
    text: 'As someone who struggles with sizing online, Pickp has been a game-changer. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Arjun Patel',
    role: 'Professional',
    initials: 'AP',
    text: 'The process is seamless and the recommendations are spot-on. Best sizing solution I\'ve used.',
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mt-4">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-xl">★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight"
        >
          What Users Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg text-gray-500"
        >
          Join thousands of satisfied customers who've found their perfect fit
        </motion.p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2 * idx, duration: 0.7 }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
            className="relative flex-1 rounded-3xl shadow-xl border border-slate-200 bg-white p-8 flex flex-col items-start group transition-transform duration-300 hover:border-orange-400 hover:bg-orange-50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 text-white font-bold text-lg w-12 h-12 flex items-center justify-center shadow-md border-4 border-white">
                {t.initials}
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900 group-hover:text-orange-500 transition-colors duration-300">{t.name}</div>
                <div className="text-sm text-gray-500">{t.role}</div>
              </div>
            </div>
            <blockquote className="text-gray-700 text-base italic mb-2">
              <span className="text-orange-400 text-2xl mr-2">“</span>{t.text}
            </blockquote>
            <StarRating count={t.rating} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
