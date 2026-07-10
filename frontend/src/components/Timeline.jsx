import { motion } from 'framer-motion';
import { timelineEvents } from '../data/portfolioData';
import { CheckCircle2 } from 'lucide-react';

const phaseColors = {
  blue: 'border-cyber-blue bg-cyber-blue',
  yellow: 'border-cyber-yellow bg-cyber-yellow',
  orange: 'border-cyber-orange bg-cyber-orange',
  red: 'border-cyber-red bg-cyber-red',
  green: 'border-cyber-green bg-cyber-green',
  purple: 'border-cyber-purple bg-cyber-purple',
};

const textColors = {
  blue: 'text-cyber-blue',
  yellow: 'text-cyber-yellow',
  orange: 'text-cyber-orange',
  red: 'text-cyber-red',
  green: 'text-cyber-green',
  purple: 'text-cyber-purple',
};

export default function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-cyber-border" />

      {timelineEvents.map((event, i) => {
        const isEven = i % 2 === 0;
        const tc = textColors[event.color];
        const bc = phaseColors[event.color];

        return (
          <motion.div
            key={event.phase}
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 * i }}
            className={`relative flex items-start mb-8 md:mb-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            {/* Dot */}
            <div className={`absolute left-5 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${bc} border-4 border-cyber-black z-10`} />

            {/* Content */}
            <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
              <div className={`bg-cyber-card border ${bc.replace('bg-', 'border-')}/30 rounded-xl p-5 hover:scale-[1.01] transition-transform`}>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`text-xs font-bold ${tc} uppercase tracking-wider`}>{event.phase}</span>
                  <span className="text-[10px] text-cyber-muted bg-cyber-black px-2 py-0.5 rounded-full">{event.time}</span>
                </div>
                <ul className={`space-y-1.5 ${isEven ? 'md:text-right' : ''}`}>
                  {event.actions.map((action, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-cyber-text">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${tc} mt-0.5 flex-shrink-0`} />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
