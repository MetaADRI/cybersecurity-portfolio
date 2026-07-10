import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Network, BookOpen, Terminal, FileText } from 'lucide-react';

const iconMap = { Shield, Network, BookOpen, Terminal };

const colorMap = {
  green: { bg: 'bg-cyber-green/10', text: 'text-cyber-green', border: 'border-cyber-green/30', hover: 'hover:border-cyber-green/60' },
  red: { bg: 'bg-cyber-red/10', text: 'text-cyber-red', border: 'border-cyber-red/30', hover: 'hover:border-cyber-red/60' },
  orange: { bg: 'bg-cyber-orange/10', text: 'text-cyber-orange', border: 'border-cyber-orange/30', hover: 'hover:border-cyber-orange/60' },
  blue: { bg: 'bg-cyber-blue/10', text: 'text-cyber-blue', border: 'border-cyber-blue/30', hover: 'hover:border-cyber-blue/60' },
};

const severityBadge = {
  critical: { bg: 'bg-cyber-red/20', text: 'text-cyber-red', label: 'CRITICAL' },
  high: { bg: 'bg-cyber-orange/20', text: 'text-cyber-orange', label: 'HIGH' },
  medium: { bg: 'bg-cyber-yellow/20', text: 'text-cyber-yellow', label: 'MEDIUM' },
};

export default function ProjectCard({ project, index = 0, expanded = false }) {
  const Icon = iconMap[project.icon] || Shield;
  const c = colorMap[project.color] || colorMap.green;
  const sv = severityBadge[project.severity] || severityBadge.medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={`bg-cyber-card border ${c.border} rounded-xl overflow-hidden ${c.hover} hover:scale-[1.01] transition-all duration-300 group`}
    >
      {/* Header */}
      <div className={`px-5 py-4 ${c.bg} border-b ${c.border}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-cyber-black/50 flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${c.text}`} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{project.title}</h3>
              <p className="text-[11px] text-cyber-muted">{project.subtitle}</p>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sv.bg} ${sv.text}`}>
            {sv.label}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-xs text-cyber-text leading-relaxed mb-4">{project.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {Object.entries(project.stats).map(([key, val]) => (
            <div key={key} className="bg-cyber-black/50 rounded-lg p-2.5 text-center">
              <p className={`text-sm font-bold ${c.text}`}>{val}</p>
              <p className="text-[10px] text-cyber-muted capitalize">{key}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-cyber-black border border-cyber-border text-cyber-muted">
              {tag}
            </span>
          ))}
        </div>

        {/* Details (if expanded) */}
        {expanded && project.details && (
          <div className="border-t border-cyber-border pt-4 mt-4 space-y-2">
            {project.details.map(d => (
              <div key={d.label} className="flex items-center justify-between">
                <span className="text-xs text-cyber-muted">{d.label}</span>
                <span className="text-xs text-white font-mono">{d.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          {project.pdf && (
            <Link
              to={`/projects/${project.id}`}
              className={`flex items-center gap-1.5 text-xs ${c.text} hover:underline`}
            >
              <FileText className="w-3.5 h-3.5" />
              View Report
            </Link>
          )}
          {project.id === 'log-analyzer' && (
            <Link to="/log-tool" className="flex items-center gap-1.5 text-xs text-cyber-blue hover:underline">
              <Terminal className="w-3.5 h-3.5" />
              Try Live Demo
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
