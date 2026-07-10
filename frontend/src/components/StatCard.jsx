import { motion } from 'framer-motion';

export default function StatCard({ icon: Icon, label, value, change, color = 'green', delay = 0 }) {
  const colorMap = {
    green: { text: 'text-cyber-green', bg: 'bg-cyber-green/10', border: 'border-cyber-green/20', glow: 'box-glow-green' },
    blue: { text: 'text-cyber-blue', bg: 'bg-cyber-blue/10', border: 'border-cyber-blue/20', glow: 'box-glow-blue' },
    red: { text: 'text-cyber-red', bg: 'bg-cyber-red/10', border: 'border-cyber-red/20' },
    purple: { text: 'text-cyber-purple', bg: 'bg-cyber-purple/10', border: 'border-cyber-purple/20', glow: 'box-glow-purple' },
    orange: { text: 'text-cyber-orange', bg: 'bg-cyber-orange/10', border: 'border-cyber-orange/20' },
  };

  const c = colorMap[color] || colorMap.green;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`bg-cyber-card border ${c.border} rounded-xl p-5 ${c.glow || ''} hover:scale-[1.02] transition-transform duration-200`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
        {change && (
          <span className={`text-xs px-2 py-0.5 rounded-full ${change > 0 ? 'bg-cyber-green/10 text-cyber-green' : 'bg-cyber-red/10 text-cyber-red'}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-cyber-muted mt-1">{label}</p>
    </motion.div>
  );
}
