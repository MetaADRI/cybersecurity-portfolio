import { motion } from 'framer-motion';
import { Cpu, Award } from 'lucide-react';
import SkillsRadar from '../components/SkillsRadar';
import { certifications } from '../data/portfolioData';
import { Shield, Headphones } from 'lucide-react';

const certIcons = { Shield, Headphones };

export default function Skills() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyber-blue" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Skills & <span className="text-cyber-blue glow-blue">Certifications</span>
          </h1>
        </div>
        <p className="text-sm text-cyber-muted">Technical capabilities and professional credentials.</p>
      </motion.div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {certifications.map((cert, i) => {
          const Icon = certIcons[cert.icon] || Shield;
          return (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-cyber-card border border-cyber-green/30 rounded-xl p-5 box-glow-green flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-xl bg-cyber-green/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-7 h-7 text-cyber-green" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{cert.name}</h3>
                <p className="text-xs text-cyber-muted">{cert.issuer} — {cert.year}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Skills */}
      <SkillsRadar />
    </div>
  );
}
