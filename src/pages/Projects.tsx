import image_fdbb1cacdc29a37ef2a7abf9f71fff65baf60f45 from 'figma:asset/fdbb1cacdc29a37ef2a7abf9f71fff65baf60f45.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// Type voor project data
interface Project {
  title: string;
  slug: string;
  location: string;
  mainImage: string;
  year?: number;
  category?: string;
  description: string;
  extraImages: string[];
}

// Mock data (wordt gebruikt in preview en als fallback)
const mockProjects: Project[] = [
  {
    title: "De Poorten",
    location: "Stam, Gent",
    slug: "de-poorten",
    mainImage: image_fdbb1cacdc29a37ef2a7abf9f71fff65baf60f45,
    description: "",
    extraImages: []
  },
  {
    title: "Visserijmuseum",
    location: "Oostduinkerke",
    slug: "visserijmuseum",
    mainImage: "https://images.unsplash.com/photo-1647792845543-a8032c59cbdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnYWxsZXJ5JTIwc3BhY2V8ZW58MXx8fHwxNzY0Mjk2NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "",
    extraImages: []
  },
  {
    title: "Cultuurcentrum",
    location: "Leuven",
    slug: "cultuurcentrum-leuven",
    mainImage: "https://images.unsplash.com/photo-1762780087351-703502cdb85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGNlbnRlciUyMGV4aGliaXRpb258ZW58MXx8fHwxNzY0MzMzMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "",
    extraImages: []
  },
  {
    title: "Museum aan de Stroom",
    location: "Antwerpen",
    slug: "mas-antwerpen",
    mainImage: "https://images.unsplash.com/photo-1737642256355-af3ecc10c5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQyMzUzMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "",
    extraImages: []
  },
  {
    title: "Erfgoedcentrum",
    location: "Brugge",
    slug: "erfgoedcentrum-brugge",
    mainImage: "https://images.unsplash.com/photo-1649294528168-8b60bd65069e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMGJ1aWxkaW5nJTIwcmVzdG9yYXRpb258ZW58MXx8fHwxNzY0MzI4MjcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "",
    extraImages: []
  },
  {
    title: "Kunstgalerij",
    location: "Mechelen",
    slug: "kunstgalerij-mechelen",
    mainImage: "https://images.unsplash.com/photo-1647628790522-d2716f6fcc61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBtdXNldW0lMjBkaXNwbGF5fGVufDF8fHx8MTc2NDMzMzEwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "",
    extraImages: []
  },
  {
    title: "Aquarium",
    location: "Blankenberge",
    slug: "aquarium-blankenberge",
    mainImage: "https://images.unsplash.com/photo-1749563426420-6068c4e1da14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcXVhcml1bSUyMGV4aGliaXQlMjB0YW5rfGVufDF8fHx8MTc2NDMzMzEwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "",
    extraImages: []
  },
  {
    title: "Maritiem Museum",
    location: "Nieuwpoort",
    slug: "maritiem-museum-nieuwpoort",
    mainImage: "https://images.unsplash.com/photo-1762846700605-f4ec53a1146d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJpdGltZSUyMG11c2V1bSUyMGRpc3BsYXl8ZW58MXx8fHwxNzY0MzMzMTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "",
    extraImages: []
  }
];

// Dynamische import van Contentful service (alleen wanneer beschikbaar)
async function loadContentfulProjects(): Promise<Project[]> {
  try {
    // Probeer Contentful service te laden
    const contentfulModule = await import('../services/contentful');
    
    if (contentfulModule.isContentfulConfigured()) {
      const projects = await contentfulModule.getProjects();
      if (projects.length > 0) {
        console.log('✅ Projecten geladen vanuit Contentful');
        return projects;
      }
    }
  } catch (error) {
    // Contentful niet beschikbaar (normale situatie in preview)
    console.log('ℹ️ Contentful niet beschikbaar, gebruik mock data');
  }
  
  return mockProjects;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true);
      const loadedProjects = await loadContentfulProjects();
      setProjects(loadedProjects);
      setIsLoading(false);
    }

    loadProjects();
  }, []);

  if (isLoading) {
    return (
      <main className="col-span-3 grid grid-cols-3">
        <div className="col-span-1"></div>
        <div className="col-span-1"></div>
        <div className="col-span-1 pl-[6px] pr-[6px]">
          <div className="space-y-4">
            <p className="text-blue-600">Projecten laden...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="col-span-3 grid grid-cols-3">
      <div className="col-span-1"></div>
      <div className="col-span-1"></div>
      <div className="col-span-1 pl-[6px] pr-[6px]">
        <div className="space-y-4">
          {projects.map((project, index) => (
            <Link key={project.slug || index} to={`/projecten/${project.slug}`} className="block space-y-2 group">
              <ImageWithFallback 
                src={project.mainImage} 
                alt={project.title}
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <p className="mt-0 group-hover:text-blue-600 transition-colors duration-300">
                <span>{project.title}</span> <span style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '15px', fontStyle: 'italic' }}>— {project.location}</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
