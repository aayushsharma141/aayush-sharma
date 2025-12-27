import { motion } from "framer-motion";
import { MapPin, Ruler, Clock, Palette, Calendar, Banknote } from "lucide-react";
import { useEffect, useState } from "react";

interface ProjectStatsProps {
  location: string;
  area: string;
  duration: string;
  style: string;
  year: number;
  budget: string;
}

const ProjectStats = ({ location, area, duration, style, year, budget }: ProjectStatsProps) => {
  const stats = [
    { icon: MapPin, label: "Location", value: location },
    { icon: Ruler, label: "Area", value: area },
    { icon: Clock, label: "Duration", value: duration },
    { icon: Palette, label: "Style", value: style },
    { icon: Calendar, label: "Year", value: year.toString() },
    { icon: Banknote, label: "Budget", value: budget },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="group p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
            <stat.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            {stat.label}
          </p>
          <p className="font-semibold text-foreground text-sm md:text-base truncate">
            {stat.value}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectStats;