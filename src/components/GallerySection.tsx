import { motion } from 'motion/react';

const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=400', title: 'Stadium View', sport: 'Football' },
  { url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=400', title: 'The Shot', sport: 'Basketball' },
  { url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400', title: 'Match Day', sport: 'Football' },
  { url: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=400', title: 'Trophy Reveal', sport: 'All' },
  { url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=400', title: 'MVP Moment', sport: 'Basketball' },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-brand-dark/80">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-brand-neon font-mono text-sm tracking-widest uppercase">The Moments</span>
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase">Moments Of <span className="text-brand-blue">Glory</span></h2>
          </div>
          <button className="text-brand-neon border border-brand-neon/30 px-6 py-2 rounded-full text-xs font-bold hover:bg-brand-neon hover:text-brand-dark transition-all">
            VIEW FULL GALLERY
          </button>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group overflow-hidden rounded-3xl cursor-pointer"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                 <span className="text-[10px] text-brand-neon uppercase font-bold tracking-widest">{img.sport}</span>
                 <h4 className="text-white font-display font-bold text-lg">{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
