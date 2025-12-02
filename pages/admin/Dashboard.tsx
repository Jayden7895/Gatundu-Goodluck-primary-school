import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { SchoolStats } from '../../types';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<SchoolStats | null>(null);

  useEffect(() => {
    // In a real app, you'd fetch this. We'll use mock service and add dynamic counts
    const s = StorageService.getStats();
    s.newAdmissions = StorageService.getAdmissions().length;
    s.activeEvents = StorageService.getEvents().length;
    setStats(s);
  }, []);

  const data = [
    { name: 'Jan', students: 400 },
    { name: 'Feb', students: 300 },
    { name: 'Mar', students: 200 },
    { name: 'Apr', students: 278 },
    { name: 'May', students: 189 },
  ];

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'bg-blue-500' },
          { label: 'Applications', value: stats.newAdmissions, icon: TrendingUp, color: 'bg-green-500' },
          { label: 'Active Events', value: stats.activeEvents, icon: Calendar, color: 'bg-amber-500' },
          { label: 'Teachers', value: stats.totalTeachers, icon: Users, color: 'bg-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
            <div className={`${stat.color} p-3 rounded-lg text-white shadow-lg shadow-blue-500/20`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-6">Enrollment Trends</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};