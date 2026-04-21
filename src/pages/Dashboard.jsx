import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ticketService } from '../services/ticket.service';

const Dashboard = () => {
  const { user } = useAuth();
  const [techStats, setTechStats] = useState(null);
  const scrollRef = useRef(null);

  // Tech Stats fetching
  useEffect(() => {
    if (user?.role === 'TECHNICIAN') {
      ticketService.getTechnicianStats()
        .then(data => setTechStats(data))
        .catch(err => console.error("Error fetching stats:", err));
    }
  }, [user]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 400 : scrollLeft + 400;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  
  let modules = [
    { 
      name: 'Users', 
      role: ['ADMIN'], 
      path: '/admin/users', 
      active: 'Directory', 
      color: 'bg-red-500', 
      img: '/assets/3d/user.png' 
    },
    { 
      name: 'Resources', 
      role: ['ADMIN', 'USER'], 
      path: user?.role === 'ADMIN' ? '/admin/resources' : '/resources', 
      active: 'Inventory', 
      color: 'bg-blue-600', 
      img: '/assets/3d/resource.png' 
    },
    { 
      name: 'Bookings', 
      role: ['ADMIN', 'USER'], 
      path: user?.role === 'ADMIN' ? '/admin/bookings' : '/bookings/my', 
      active: 'Schedule', 
      color: 'bg-emerald-500', 
      img: '/assets/3d/booking.png' 
    },
    { 
      name: 'Tickets', 
      role: ['ADMIN', 'USER', 'TECHNICIAN'], 
      path: user?.role === 'ADMIN' ? '/admin/tickets' : user?.role === 'TECHNICIAN' ? '/technician/tickets' : '/tickets/my', 
      active: 'Support', 
      color: 'bg-indigo-600', 
      img: '/assets/3d/ticket.png' 
    },
    { 
      name: 'My Profile', 
      role: ['ADMIN', 'USER', 'TECHNICIAN'], 
      path: '/profile', 
      active: 'Account', 
      color: 'bg-gray-600', 
      img: '/assets/3d/user.png' // Reusing user avatar for profile
    }
  ];

  if (user?.role === 'ADMIN') {
    modules.unshift({ 
      name: 'Analytics', 
      role: ['ADMIN'], 
      path: '/admin/dashboard', 
      active: 'Insights', 
      color: 'bg-amber-500', 
      img: '/assets/3d/resource.png' // Abstract for analytics
    });
    modules.push({ 
      name: 'System Logs', 
      role: ['ADMIN'], 
      path: '/admin/logs', 
      active: 'Security', 
      color: 'bg-slate-700', 
      img: '/assets/3d/ticket.png' 
    });
  }

  const filteredModules = modules.filter(m => m.role.includes(user?.role));

  return (
    <div className="min-h-[90vh] flex flex-col justify-center py-10 overflow-hidden relative">
      {/* Background Decor Elements */}
      <div className="floating-glass top-[10%] left-[5%] animate-blob blur-[100px] opacity-40"></div>
      <div className="floating-glass bottom-[10%] right-[5%] animate-blob blur-[100px] opacity-40 [animation-delay:5s]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0,transparent_70%)] pointer-events-none"></div>

      {/* Hero Welcome Section */}
      <div className="max-w-[1200px] mx-auto w-full px-8 mb-12 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="animate-fade-in-up text-center md:text-left">
          <h1 className="text-7xl font-black tracking-tight mb-4">
            Hi, <span className="text-gradient">{user?.fullName?.split(' ')[0] || 'Explorer'}</span>
          </h1>
          <p className="text-gray-400 font-black uppercase tracking-[0.5em] text-[10px] ml-1 opacity-60">
            Welcome to the future of campus living
          </p>
        </div>

        {/* Technician Mini Stats */}
        {user?.role === 'TECHNICIAN' && techStats && (
          <div className="flex gap-6 animate-fade-in-up [animation-delay:200ms]">
            <div className="glass-card px-8 py-4 border-l-4 border-amber-500 hover:scale-105 transition-transform cursor-default">
              <p className="text-[9px] font-black uppercase tracking-widest text-amber-600 mb-1">Queue</p>
              <p className="text-3xl font-black">{techStats.pendingCount}</p>
            </div>
            <div className="glass-card px-8 py-4 border-l-4 border-emerald-500 hover:scale-105 transition-transform cursor-default">
              <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600 mb-1">Success</p>
              <p className="text-3xl font-black">{techStats.completedCount}</p>
            </div>
          </div>
        )}

        <div className="flex gap-4 animate-fade-in-up [animation-delay:400ms]">
          <button 
            onClick={() => scroll('left')}
            className="w-14 h-14 rounded-full border-2 border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 transition-all active:scale-90 shadow-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-14 h-14 rounded-full border-2 border-gray-900 bg-gray-900 text-white flex items-center justify-center hover:bg-black transition-all active:scale-90 shadow-2xl shadow-gray-900/40"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {/* Main Module Cards */}
      <div ref={scrollRef} className="horizontal-scroll px-8 md:px-[calc((100vw-1200px)/2)] py-16 relative z-10 animate-fade-in-up [animation-delay:600ms]">
        {filteredModules.map((module, index) => (
          <Link key={index} to={module.path} className="pop-card group flex-shrink-0">
            <div className={`pop-card-bg ${module.color}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors"></div>
            </div>
            <img src={module.img} alt={module.name} className="pop-card-img" />
            <div className="relative z-20 text-white text-center mb-10">
              <h3 className="text-4xl font-black tracking-tight group-hover:scale-110 transition-transform duration-500">{module.name}</h3>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-60 mt-2">{module.active}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Activity Bar */}
      <div className="max-w-[1200px] mx-auto w-full px-8 mt-12 animate-fade-in-up [animation-delay:800ms] relative z-10">
        <div className="glass-card p-6 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-blue-${i*100+400} flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}>
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              <span className="font-bold text-gray-900 dark:text-white">Active Now:</span> 124 students exploring the hub right now
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <span>Server Status:</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-emerald-600">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
