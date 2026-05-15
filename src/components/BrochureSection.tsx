import { motion } from 'motion/react';
import { Download, FileText, ChevronRight, ChevronLeft, MapPin, Calendar, Phone, Mail, Clock, Trophy } from 'lucide-react';
import { useState } from 'react';

const PAGES = [
  {
    title: "SHALOM PREMIER LEAGUE",
    subtitle: "SUMMER EDITION 2026",
    content: (
       <div className="space-y-6 text-center">
          <div className="w-24 h-24 mx-auto bg-brand-neon/20 rounded-full flex items-center justify-center">
             <Trophy className="w-12 h-12 text-brand-neon" />
          </div>
          <div className="space-y-2">
             <h3 className="text-4xl font-display font-black italic">REGISTER NOW</h3>
             <p className="text-brand-neon font-mono tracking-widest uppercase">Deadline: 18 May 2026</p>
          </div>
          <div className="p-8 border border-white/10 rounded-3xl bg-white/5 space-y-4">
             <p className="text-white/60 text-sm italic">"Join us for an electrifying tournament that will push your limits and bring out the best in you."</p>
             <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Registration Amount</p>
                <p className="text-3xl font-black">₹1,000/- <span className="text-xs text-white/40 font-normal">per student</span></p>
             </div>
          </div>
       </div>
    )
  },
  {
    title: "MATCH SCHEDULE",
    subtitle: "MAY 20 - MAY 25, 2026",
    content: (
       <div className="space-y-4">
          {[
            { date: 'May 20-21', sports: ['Basketball (U-11, 13)', 'Cricket (U-15, 19)'] },
            { date: 'May 22-23', sports: ['Football (U-11, 13)', 'Basketball (U-15, 19)'] },
            { date: 'May 24-25', sports: ['Football (U-15, 19)', 'Cricket (U-11, 13)'] }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-center p-4 rounded-2xl bg-white/5 border border-white/10">
               <div className="w-20 font-mono text-brand-neon text-xs font-bold">{item.date}</div>
               <div className="flex-1 space-y-1">
                  {item.sports.map(s => <p key={s} className="text-xs font-bold text-white/80">{s}</p>)}
               </div>
            </div>
          ))}
          <div className="pt-4 space-y-2">
             <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase font-mono">
                <Clock className="w-3 h-3" /> Morning: 6:00 AM - 10:00 AM
             </div>
             <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase font-mono">
                <Clock className="w-3 h-3" /> Evening: 4:00 PM - 7:00 PM
             </div>
          </div>
       </div>
    )
  },
  {
    title: "RULES & CONTACT",
    subtitle: "IMPORTANT GUIDELINES",
    content: (
       <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 rounded-2xl bg-brand-neon/10 border border-brand-neon/20">
                <p className="text-[8px] uppercase font-bold text-brand-neon mb-1">Venue</p>
                <p className="text-xs text-white/80 font-bold">Shalom Hills Int'l School</p>
             </div>
             <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[8px] uppercase font-bold text-white/40 mb-1">Auction Day</p>
                <p className="text-xs text-white/80 font-bold">19 May 2026</p>
             </div>
          </div>
          <div className="space-y-3">
             <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest border-b border-white/10 pb-2">Coach Contacts</p>
             <div className="space-y-2">
                <p className="text-[10px] text-white/60">Basketball: Mr. Tenzin (+91 8319807831)</p>
                <p className="text-[10px] text-white/60">Football: Mr. Vishwas (+91 9717106405)</p>
                <p className="text-[10px] text-white/60">Cricket: Mr. Ankit Yadav (+91 7987715686)</p>
             </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
             <p className="text-[10px] font-mono text-white/40 leading-relaxed italic">
                "Spike your way to victory! Sign up now for our thrilling Sports tournament offering Cricket, Football and Basketball!"
             </p>
          </div>
       </div>
    )
  }
];

export default function BrochureSection() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section className="py-24 bg-brand-dark min-h-screen">
      <div className="section-container">
        <div className="text-center space-y-4 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-[10px] font-bold uppercase tracking-widest"
          >
            <FileText className="w-3 h-3" /> Official Tournament Guide
          </motion.div>
          <h2 className="text-5xl font-display font-black tracking-tighter uppercase italic leading-none">
            Digital <span className="text-brand-neon">Brochure</span>
          </h2>
        </div>

        <div className="max-w-xl mx-auto space-y-8">
          <div className="glass-card p-1 relative aspect-[1/1.4] flex flex-col bg-brand-charcoal overflow-hidden group shadow-2xl">
            {/* Page Content Holder */}
            <div className="flex-1 p-8 lg:p-12 relative flex flex-col justify-center">
               <motion.div
                 key={currentPage}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.3 }}
                 className="space-y-6"
               >
                  <div className="text-center space-y-2 mb-8">
                     <p className="text-[10px] text-brand-neon font-black tracking-[0.3em] uppercase">{PAGES[currentPage].subtitle}</p>
                     <h3 className="text-3xl font-display font-black uppercase italic leading-none tracking-tighter">{PAGES[currentPage].title}</h3>
                  </div>
                  {PAGES[currentPage].content}
               </motion.div>
            </div>
            
            {/* Controls */}
            <div className="p-4 border-t border-white/5 flex items-center justify-between bg-brand-dark/20">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-neon hover:text-brand-dark transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold font-mono text-white/40">
                P.{currentPage + 1} / {PAGES.length}
              </div>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(PAGES.length - 1, prev + 1))}
                disabled={currentPage === PAGES.length - 1}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-neon hover:text-brand-dark transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Aesthetic Design Elements */}
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
               <Trophy className="w-32 h-32 rotate-12" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
             <button className="flex-1 btn-primary flex items-center justify-center gap-3 py-4 text-xs">
                <Download className="w-4 h-4" /> DOWNLOAD PRINTABLE BROCHURE (PDF)
             </button>
          </div>

          <p className="text-center text-[10px] text-white/20 uppercase tracking-widest font-mono">
            © 2026 Shalom Hills International School | All Rights Reserved
          </p>
        </div>
      </div>
    </section>
  );
}
