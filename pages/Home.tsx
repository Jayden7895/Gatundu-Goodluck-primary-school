import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, BookOpen, Users, Trophy } from 'lucide-react';
import { StorageService } from '../services/storage';
import { Announcement, Event } from '../types';

export const Home: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setAnnouncements(StorageService.getAnnouncements().slice(0, 3));
    setEvents(StorageService.getEvents().slice(0, 3));
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] bg-slate-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           {/* Fallback pattern if image fails to load, or overlay */}
           <img 
             src="https://picsum.photos/1920/1080?random=10" 
             alt="School Students" 
             className="w-full h-full object-cover"
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full border border-amber-400/50 bg-amber-500/10 backdrop-blur-sm text-amber-300 text-sm font-semibold tracking-wider mb-2">
            ADMISSIONS OPEN FOR 2024
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Welcome to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Gatundu Goodluck</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Nurturing potential, building character, and achieving excellence in every child. Join a community dedicated to holistic growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/admissions" className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-all shadow-lg shadow-amber-500/20">
              Apply Now
            </Link>
            <Link to="/about" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-semibold rounded-lg transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 -mt-32 relative z-20">
          {[
            { icon: BookOpen, title: "Academic Excellence", desc: "Consistently top-performing in national exams with our CBC curriculum." },
            { icon: Users, title: "Expert Teachers", desc: "Qualified, passionate educators dedicated to student success." },
            { icon: Trophy, title: "Co-Curriculars", desc: "A vibrant program of sports, music, and drama to build well-rounded students." },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-xl border border-slate-100 hover:transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center text-blue-900 mb-6">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* News & Announcements */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">School Updates</h2>
              <p className="text-slate-500 mt-2">Latest news and announcements from the administration.</p>
            </div>
            <Link to="/news" className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {announcements.map((news) => (
              <div key={news.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-slate-100 flex flex-col">
                 <div className="h-48 bg-slate-200 relative">
                   <img src={`https://picsum.photos/400/300?random=${news.id}`} className="w-full h-full object-cover" alt="News" />
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-900 uppercase">
                     {news.category}
                   </div>
                 </div>
                 <div className="p-6 flex-1 flex flex-col">
                   <span className="text-xs text-slate-400 font-medium mb-2">{news.date}</span>
                   <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2">{news.title}</h3>
                   <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">{news.content}</p>
                   <Link to="#" className="text-amber-600 font-semibold text-sm hover:text-amber-700">Read More</Link>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Calendar Preview */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
             <p className="text-blue-200 mb-8 text-lg leading-relaxed">
               There's always something happening at Gatundu Goodluck. Stay tuned to our calendar so you don't miss out on important dates, meetings, and celebrations.
             </p>
             <Link to="/events" className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-amber-400 transition">
               Full Calendar <Calendar size={18} />
             </Link>
          </div>
          <div className="md:w-1/2 w-full space-y-4">
            {events.map((evt) => (
              <div key={evt.id} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl flex gap-4 items-center hover:bg-white/10 transition cursor-pointer">
                <div className="bg-white/10 w-16 h-16 rounded-lg flex flex-col items-center justify-center text-center shrink-0">
                  <span className="text-xs font-bold text-amber-400 uppercase">{new Date(evt.date).toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-xl font-bold text-white">{new Date(evt.date).getDate()}</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{evt.title}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-blue-200">
                    <span>{evt.time}</span>
                    <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};