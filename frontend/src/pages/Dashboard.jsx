import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Eye, Lock, TrendingUp, Activity } from 'lucide-react';
import StatCard from '../components/StatCard';
import Terminal from '../components/Terminal';
import ThreatMap from '../components/ThreatMap';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const attackData = [
  { name: 'Brute Force', value: 2847, fill: '#ff3333' },
  { name: 'SQL Injection', value: 1523, fill: '#ff9500' },
  { name: 'XSS', value: 892, fill: '#ffd60a' },
  { name: 'Port Scan', value: 4201, fill: '#00d4ff' },
  { name: 'Malware', value: 234, fill: '#a855f7' },
  { name: 'Phishing', value: 1102, fill: '#00ff41' },
];

const weeklyData = [
  { day: 'Mon', threats: 45 },
  { day: 'Tue', threats: 72 },
  { day: 'Wed', threats: 38 },
  { day: 'Thu', threats: 91 },
  { day: 'Fri', threats: 64 },
  { day: 'Sat', threats: 28 },
  { day: 'Sun', threats: 19 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Security <span className="text-cyber-green glow-green">Dashboard</span>
        </h1>
        <p className="text-sm text-cyber-muted">Welcome back, Analyst. Here's your threat overview.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Shield} label="Projects Completed" value="4" color="green" delay={0} />
        <StatCard icon={AlertTriangle} label="Threats Detected" value="10,799" color="red" delay={0.1} />
        <StatCard icon={Eye} label="Logs Analyzed" value="10K+" color="blue" delay={0.2} />
        <StatCard icon={Lock} label="Certifications" value="2" color="purple" delay={0.3} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attack Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-cyber-card border border-cyber-border rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-cyber-purple" />
            <h3 className="text-sm font-bold text-white">Attack Distribution</h3>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attackData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {attackData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#161b22', border: '1px solid #21262d', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#c9d1d9' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {attackData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: d.fill }} />
                <span className="text-[10px] text-cyber-muted">{d.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Threats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-cyber-card border border-cyber-border rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-cyber-green" />
            <h3 className="text-sm font-bold text-white">Weekly Threat Trend</h3>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#8b949e' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#8b949e' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#161b22', border: '1px solid #21262d', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#c9d1d9' }}
                />
                <Bar dataKey="threats" fill="#00ff41" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Terminal + Threat Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Terminal />
        <ThreatMap />
      </div>
    </div>
  );
}
