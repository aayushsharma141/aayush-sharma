import React, { createContext, useContext, useEffect, useState } from "react";
import { Project, projects as defaultProjects } from "@/data/projects";
import { api } from "@/lib/api";

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  getProject: (slug: string) => Project | undefined;
  isLoading: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initial Data Load Strategy:
  // 1. Try to fetch from API (Strapi)
  // 2. If API fails or returns empty (and we have nothing local), check localStorage
  // 3. If localStorage is empty, fall back to defaultProjects (static file)
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // 1. Try API
      const apiProjects = await api.getProjects();
      
      if (apiProjects.length > 0) {
        setProjects(apiProjects);
      } else {
        // 2. Fallback to LocalStorage
        const savedProjects = localStorage.getItem("projects");
        if (savedProjects) {
          try {
            setProjects(JSON.parse(savedProjects));
          } catch (e) {
            console.error("Failed to parse projects from localStorage", e);
            setProjects(defaultProjects);
          }
        } else {
            // 3. Fallback to Default Static Data
          setProjects(defaultProjects);
        }
      }
      
      setIsLoaded(true);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Sync to LocalStorage (as a backup/cache)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects, isLoaded]);

  const addProject = async (project: Omit<Project, "id">) => {
    try {
      const created = await api.createProject(project);
      setProjects((prev) => [...prev, created]);
    } catch (e) {
      console.error("Failed to save to API, falling back to local only", e);
      const fallbackProject: Project = { ...(project as Project), id: crypto.randomUUID() };
      setProjects((prev) => [...prev, fallbackProject]);
    }
  };

  const updateProject = async (id: string, updatedFields: Partial<Project>) => {
    try {
      const updated = await api.updateProject(id, updatedFields);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? updated : p)),
      );
    } catch (e) {
      console.error("Failed to update API, applying local changes only", e);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)),
      );
    }
  };

  const deleteProject = async (id: string) => {
    // Optimistic UI update
    setProjects((prev) => prev.filter((p) => p.id !== id));

    try {
      await api.deleteProject(id);
    } catch (e) {
      console.error("Failed to delete from API, change is only local", e);
    }
  };

  const getProject = (slug: string) => {
    return projects.find((p) => p.slug === slug);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject, getProject, isLoading }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
