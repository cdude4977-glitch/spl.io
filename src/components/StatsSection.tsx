import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

const STATS = [
  { label: 'Teams Participating', value: 24, suffix: '' },
  { label: 'Registered Players', value: 350, suffix: '+' },
  { label: 'Matches Scheduled', value: 48, suffix: '' },
  { label: 'Prizes Won', value: 100000, prefix: '₹', suffix: '' },
];

function CountUp({ end, duration = 2, prefix = '', suffix = '' }: { end: number, duration?: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-brand-charcoal py-20 border-y border-white/5">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-2"
            >
              <div className="text-4xl md:text-5xl font-display font-extrabold text-brand-neon">
                <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-white/40 font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
