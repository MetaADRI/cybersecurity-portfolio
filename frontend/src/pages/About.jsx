import { motion } from 'framer-motion';
import { User, Mail, MapPin, GraduationCap, Briefcase, Phone, ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';

export default function About() {
  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-cyber-purple" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            About <span className="text-cyber-purple glow-purple">Me</span>
          </h1>
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-cyber-card border border-cyber-purple/30 rounded-xl p-6 box-glow-purple"
      >
        <div className="space-y-4">
          <div className="w-20 h-20 rounded-2xl bg-cyber-purple/10 border border-cyber-purple/30 flex items-center justify-center">
            <User className="w-10 h-10 text-cyber-purple" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Bwalya Adrian Mange</h2>
            <p className="text-sm text-cyber-green font-mono">OPEN TO OPPORTUNITIES</p>
          </div>

          <p className="text-sm text-cyber-text leading-relaxed">
            Computer Science major and aspiring Cybersecurity Specialist with hands-on experience in IT support,
            troubleshooting, and system security. Certified through Google's Cybersecurity and IT Support Professional
            Certificates. Passionate about defending organizations against digital threats and building secure systems
            that enable communities to thrive in the digital era.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-cyber-muted">
              <GraduationCap className="w-4 h-4 text-cyber-blue" />
              <span>Computer Science Major</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-cyber-muted">
              <Briefcase className="w-4 h-4 text-cyber-green" />
              <span>IT Support — Inspire Leadership School</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-cyber-muted">
              <MapPin className="w-4 h-4 text-cyber-orange" />
              <span>Lusaka, Zambia</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-cyber-muted">
              <Phone className="w-4 h-4 text-cyber-blue" />
              <span>+260 96274 6692</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-cyber-muted">
              <Mail className="w-4 h-4 text-cyber-purple" />
              <span>adrianmange00@gmail.com</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-cyber-card border border-cyber-border rounded-xl p-6"
      >
        <h3 className="text-sm font-bold text-white mb-4">Core Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Protection', desc: 'Defending systems and data against evolving threats', color: 'cyber-green' },
            { title: 'Reliability', desc: 'Building trustworthy and resilient security infrastructure', color: 'cyber-blue' },
            { title: 'Ethics', desc: 'Upholding the highest standards of responsible security practice', color: 'cyber-purple' },
          ].map((v, i) => (
            <div key={v.title} className="bg-cyber-black/50 rounded-lg p-4 border border-cyber-border">
              <h4 className={`text-sm font-bold text-${v.color} mb-1`}>{v.title}</h4>
              <p className="text-xs text-cyber-muted">{v.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Connect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-cyber-card border border-cyber-border rounded-xl p-6"
      >
        <h3 className="text-sm font-bold text-white mb-3">Let's Connect</h3>
        <div className="flex flex-wrap gap-3">
          <a href="https://github.com/MetaADRI" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs px-4 py-2.5 rounded-lg bg-cyber-black border border-cyber-border text-cyber-muted hover:text-white hover:border-cyber-green/30 transition-colors">
            <SiGithub className="w-4 h-4" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/bwalyaadrianmange4101a8396" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs px-4 py-2.5 rounded-lg bg-cyber-black border border-cyber-border text-cyber-muted hover:text-white hover:border-cyber-blue/30 transition-colors">
            <FaLinkedinIn className="w-4 h-4" />
            LinkedIn
          </a>
          <a href="https://adrian106293.netlify.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs px-4 py-2.5 rounded-lg bg-cyber-black border border-cyber-border text-cyber-muted hover:text-white hover:border-cyber-purple/30 transition-colors">
            <ExternalLink className="w-4 h-4" />
            Website
          </a>
          <a href="mailto:adrianmange00@gmail.com" className="flex items-center gap-2 text-xs px-4 py-2.5 rounded-lg bg-cyber-black border border-cyber-border text-cyber-muted hover:text-white hover:border-cyber-red/30 transition-colors">
            <Mail className="w-4 h-4" />
            Email
          </a>
        </div>
      </motion.div>
    </div>
  );
}
