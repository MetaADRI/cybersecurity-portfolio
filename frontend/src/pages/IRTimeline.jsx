import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import Timeline from '../components/Timeline';

export default function IRPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyber-orange" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Incident <span className="text-cyber-orange" style={{ textShadow: '0 0 10px #ff9500, 0 0 20px #ff9500' }}>Response</span> Timeline
          </h1>
        </div>
        <p className="text-sm text-cyber-muted">NIST IR lifecycle walkthrough from my Incident Handler's Journal project.</p>
      </motion.div>

      <Timeline />
    </div>
  );
}
