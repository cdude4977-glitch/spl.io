import { motion } from 'motion/react';

const TIMELINE_EVENTS = [
  {
    date: '18 May 2026',
    title: 'Registration Deadline',
    desc: 'Final day to submit player entries and team registration forms.',
    status: 'Upcoming'
  },
  {
    date: '19 May 2026',
    title: 'Live Auction Day',
    desc: 'The grand player auction ceremony. Teams build their champion rosters.',
    status: 'Upcoming'
  },
  {
    date: '20 May 2026',
    title: 'Opening Ceremony',
    desc: 'Kick-off with formal inauguration and the first set of matches.',
    status: 'Kickoff'
  },
  {
    date: '21 May – 23 May',
    title: 'Group Stages',
    desc: 'Intense round-robin competition across all three sports.',
    status: 'Ongoing'
  },
  {
    date: '24 May – 25 May',
    title: 'The Grand Finale',
    desc: 'Final matches followed by the Trophy Presentation and Closing Ceremony.',
    status: 'Finals'
  }
];

export default function TimelineSection() {
  return (
    <section className="py-24 bg-brand-dark/50">
      <div className="section-container">
        <div className="text-center mb-20 space-y-4">
          <span className="text-brand-neon font-mono text-sm tracking-widest uppercase">The Roadmap</span>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase">Tournament <span className="text-brand-blue">Timeline</span></h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-neon/0 via-brand-neon/20 to-brand-neon/0 hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Visual Connector Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-10 w-4 h-4 bg-brand-dark border-2 border-brand-neon rounded-full z-10 hidden md:flex shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
                
                {/* Content Card */}
                <div className="w-full md:w-1/2">
                   <motion.div
                     initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="glass-card p-8 group hover:border-brand-neon/30 transition-all"
                   >
                     <div className="flex flex-col gap-4">
                        <div className={`flex items-center gap-3 ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                           <span className="text-brand-neon font-mono text-xs font-bold tracking-tighter uppercase p-1 px-3 border border-brand-neon/20 rounded-md bg-brand-neon/5">
                             {event.date}
                           </span>
                           <span className="text-[10px] text-white/30 uppercase tracking-widest">{event.status}</span>
                        </div>
                        <div className={idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}>
                           <h3 className="text-2xl font-display font-extrabold uppercase mb-2 group-hover:text-brand-neon transition-colors">{event.title}</h3>
                           <p className="text-white/50 text-sm leading-relaxed">{event.desc}</p>
                        </div>
                     </div>
                   </motion.div>
                </div>

                {/* Empty Side for Desktop */}
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
