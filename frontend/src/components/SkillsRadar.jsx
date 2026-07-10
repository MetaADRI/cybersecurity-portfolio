import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';
import { Shield, Code, Users } from 'lucide-react';

const categoryIcons = { security: Shield, technical: Code, soft: Users };
const categoryColors = { security: 'cyber-green', technical: 'cyber-blue', soft: 'cyber-purple' };

export default function SkillsRadar({ compact = false }) {
  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <div className={`grid ${compact ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
      {categories.map(cat => {
        const Icon = categoryIcons[cat];
        const color = categoryColors[cat];
        const catSkills = skills.filter(s => s.category === cat);

        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-cyber-card border border-cyber-border rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon className={`w-5 h-5 text-${color}`} />
              <h3 className="text-sm font-bold text-white capitalize">{cat} Skills</h3>
            </div>
            <div className="space-y-3">
              {catSkills.map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-cyber-text">{skill.name}</span>
                    <span className="text-xs text-cyber-muted font-mono">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-cyber-black rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.1 * i }}
                      className={`h-full rounded-full bg-${color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
