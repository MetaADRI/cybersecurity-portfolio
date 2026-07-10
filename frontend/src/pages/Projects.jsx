import { motion } from 'framer-motion';
import { FolderOpen } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/portfolioData';

export default function Projects() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <div className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-cyber-green" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Project <span className="text-cyber-green glow-green">Showcase</span>
          </h1>
        </div>
        <p className="text-sm text-cyber-muted">Security projects from coursework and self-directed learning.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} expanded />
        ))}
      </div>
    </div>
  );
}
