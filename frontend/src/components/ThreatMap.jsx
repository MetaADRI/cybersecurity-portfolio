import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Globe } from 'lucide-react';
import { threatData } from '../data/portfolioData';

const severityColors = {
  critical: { bg: 'bg-cyber-red/10', text: 'text-cyber-red', border: 'border-cyber-red/30' },
  high: { bg: 'bg-cyber-orange/10', text: 'text-cyber-orange', border: 'border-cyber-orange/30' },
  medium: { bg: 'bg-cyber-yellow/10', text: 'text-cyber-yellow', border: 'border-cyber-yellow/30' },
  low: { bg: 'bg-cyber-green/10', text: 'text-cyber-green', border: 'border-cyber-green/30' },
};

export default function ThreatMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-cyber-border">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyber-blue" />
          <h3 className="text-sm font-bold text-white">Threat Intelligence</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyber-green pulse-dot" />
          <span className="text-[10px] text-cyber-muted">LIVE</span>
        </div>
      </div>

      {/* Threat list */}
      <div className="p-4 space-y-3">
        {threatData.map((threat, i) => {
          const sc = severityColors[threat.severity];
          const maxCount = Math.max(...threatData.map(t => t.count));
          const barWidth = (threat.count / maxCount) * 100;

          return (
            <motion.div
              key={threat.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-3.5 h-3.5 ${sc.text}`} />
                  <span className="text-xs text-white font-medium">{threat.type}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${sc.bg} ${sc.text} border ${sc.border} uppercase`}>
                    {threat.severity}
                  </span>
                </div>
                <span className="text-xs text-cyber-muted font-mono">{threat.count.toLocaleString()}</span>
              </div>
              <div className="w-full h-1.5 bg-cyber-black rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{ duration: 1, delay: 0.2 * i }}
                  className={`h-full rounded-full ${
                    threat.severity === 'critical' ? 'bg-cyber-red' :
                    threat.severity === 'high' ? 'bg-cyber-orange' :
                    threat.severity === 'medium' ? 'bg-cyber-yellow' :
                    'bg-cyber-green'
                  }`}
                />
              </div>
              <div className="flex gap-1">
                {threat.countries.map(c => (
                  <span key={c} className="text-[10px] text-cyber-muted">{c}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
