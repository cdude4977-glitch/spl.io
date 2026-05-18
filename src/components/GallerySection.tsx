import { motion } from 'motion/react';

const GALLERY_IMAGES = [
  { url: 'https://shalomhills.com//public/uploads/all/221/Untitled-design---2025-07-23T133147.430.png', title: 'Stadium View', sport: 'Football' },
  { url: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/GALLERY/WhatsApp%20Image%202026-04-04%20at%2019.22.05.jpeg', title: 'The Shot', sport: 'Basketball' },
  { url: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/GALLERY/WhatsApp%20Image%202026-04-04%20at%2019.22.04.jpeg', title: 'Match Day', sport: 'Football' },
  { url: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/GALLERY/WhatsApp%20Image%202026-05-18%20at%2023.58.56.jpeg', title: 'MVP Moment', sport: 'Football' },
  { url: 'https://content3.jdmagicbox.com/v2/comp/gurgaon/52/011p89152/catalogue/shalom-hills-international-school-sushant-lok-phase-1-gurgaon-cbse-schools-ep3v8xdyg0.jpg', title: 'Stadium View', sport: 'Basketball' },
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
                loading="lazy"
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
