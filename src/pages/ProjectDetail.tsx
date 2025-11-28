import image_4d66d5e44a1380364199ada1685f52ca640a3b03 from 'figma:asset/4d66d5e44a1380364199ada1685f52ca640a3b03.png';
import image_72039f5de393e436aa473964b08b59d629085268 from 'figma:asset/72039f5de393e436aa473964b08b59d629085268.png';
import { useParams, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
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

// Mock data als fallback
const mockProjectData: { [key: string]: Project } = {
  'de-poorten': {
    title: 'De Poorten',
    slug: 'de-poorten',
    location: 'Stam, Gent',
    mainImage: image_72039f5de393e436aa473964b08b59d629085268,
    extraImages: [
      image_4d66d5e44a1380364199ada1685f52ca640a3b03,
      'https://images.unsplash.com/photo-1763451161513-33d61eb02bfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBpbmZvcm1hdGlvbiUyMHBhbmVsfGVufDF8fHx8MTc2NDMyMDgxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: `que conem ratur molupta volupt­tas quae.ria quiditaquiae plitatia eatis que et enimpore nonsend anditibusandigent molut vere si­maximpeles ant liquam rem non­sequis dic to maionseque volo­reste autat.

Em ipsanitis molla voluptat. Lessitatest la dipsunt magnam quo te nim ipenimpore nonsend anditibusandigent molut vere si­maximpeles ant liquam rem non­sequis dic to maionseque volo­reste autat.

Em ipsanitis molla voluptat. Lessitatest la dipsunt magnam quo te nim ip`
  },
  'visserijmuseum': {
    title: 'Visserijmuseum',
    slug: 'visserijmuseum',
    location: 'Oostduinkerke',
    mainImage: 'https://images.unsplash.com/photo-1647792845543-a8032c59cbdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnYWxsZXJ5JTIwc3BhY2V8ZW58MXx8fHwxNzY0Mjk2NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    extraImages: [
      image_4d66d5e44a1380364199ada1685f52ca640a3b03,
      'https://images.unsplash.com/photo-1763451161513-33d61eb02bfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBpbmZvcm1hdGlvbiUyMHBhbmVsfGVufDF8fHx8MTc2NDMyMDgxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: `Een modern museum gewijd aan de rijke visserijtraditie van de Belgische kust.`
  },
  'cultuurcentrum-leuven': {
    title: 'Cultuurcentrum',
    slug: 'cultuurcentrum-leuven',
    location: 'Leuven',
    mainImage: 'https://images.unsplash.com/photo-1762780087351-703502cdb85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGNlbnRlciUyMGV4aGliaXRpb258ZW58MXx8fHwxNzY0MzMzMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    extraImages: [
      'https://images.unsplash.com/photo-1747320735590-cf0571c39c69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGhpYml0aW9uJTIwbGlnaHRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzY0MzMzMTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1764079146323-6971a89aee47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGJ1aWxkaW5nJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MzMzMTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: `Een modern cultuurcentrum met een veelzijdig programma. Het gebouw combineert hedendaagse architectuur met functionele tentoonstellingsruimtes.`
  },
  'mas-antwerpen': {
    title: 'Museum aan de Stroom',
    slug: 'mas-antwerpen',
    location: 'Antwerpen',
    mainImage: 'https://images.unsplash.com/photo-1737642256355-af3ecc10c5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQyMzUzMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    extraImages: [
      'https://images.unsplash.com/photo-1654911443323-bc4f32eaf68b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcndhdGVyJTIwbXVzZXVtJTIwaW5zdGFsbGF0aW9ufGVufDF8fHx8MTc2NDMzMzEwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      image_4d66d5e44a1380364199ada1685f52ca640a3b03
    ],
    description: `Het MAS vertelt het verhaal van Antwerpen en de haven door innovatieve tentoonstellingen.`
  },
  'erfgoedcentrum-brugge': {
    title: 'Erfgoedcentrum',
    slug: 'erfgoedcentrum-brugge',
    location: 'Brugge',
    mainImage: 'https://images.unsplash.com/photo-1649294528168-8b60bd65069e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMGJ1aWxkaW5nJTIwcmVzdG9yYXRpb258ZW58MXx8fHwxNzY0MzI4MjcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    extraImages: [
      'https://images.unsplash.com/photo-1764079146323-6971a89aee47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGJ1aWxkaW5nJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MzMzMTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1763451161513-33d61eb02bfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBpbmZvcm1hdGlvbiUyMHBhbmVlfGVufDF8fHx8MTc2NDMyMDgxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: `Een gerestaureerd historisch pand dat nu dienst doet als erfgoedcentrum.`
  },
  'kunstgalerij-mechelen': {
    title: 'Kunstgalerij',
    slug: 'kunstgalerij-mechelen',
    location: 'Mechelen',
    mainImage: 'https://images.unsplash.com/photo-1647628790522-d2716f6fcc61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBtdXNldW0lMjBkaXNwbGF5fGVufDF8fHx8MTc2NDMzMzEwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    extraImages: [
      'https://images.unsplash.com/photo-1747320735590-cf0571c39c69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGhpYml0aW9uJTIwbGlnaHRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzY0MzMzMTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1647792845543-a8032c59cbdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnYWxsZXJ5JTIwc3BhY2V8ZW58MXx8fHwxNzY0Mjk2NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: `Een eigentijdse kunstgalerij met wisselende tentoonstellingen van nationale en internationale kunstenaars.`
  },
  'aquarium-blankenberge': {
    title: 'Aquarium',
    slug: 'aquarium-blankenberge',
    location: 'Blankenberge',
    mainImage: 'https://images.unsplash.com/photo-1749563426420-6068c4e1da14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcXVhcml1bSUyMGV4aGliaXQlMjB0YW5rfGVufDF8fHx8MTc2NDMzMzEwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    extraImages: [
      image_72039f5de393e436aa473964b08b59d629085268,
      'https://images.unsplash.com/photo-1654911443323-bc4f32eaf68b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcndhdGVyJTIwbXVzZXVtJTIwaW5zdGFsbGF0aW9ufGVufDF8fHx8MTc2NDMzMzEwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: `Een fascinerend aquarium dat de onderwaterwereld van de Noordzee en tropische zeeën toont.`
  },
  'maritiem-museum-nieuwpoort': {
    title: 'Maritiem Museum',
    slug: 'maritiem-museum-nieuwpoort',
    location: 'Nieuwpoort',
    mainImage: 'https://images.unsplash.com/photo-1762846700605-f4ec53a1146d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJpdGltZSUyMG11c2V1bSUyMGRpc3BsYXl8ZW58MXx8fHwxNzY0MzMzMTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    extraImages: [
      image_4d66d5e44a1380364199ada1685f52ca640a3b03,
      'https://images.unsplash.com/photo-1763451161513-33d61eb02bfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBpbmZvcm1hdGlvbiUyMHBhbmVsfGVufDF8fHx8MTc2NDMyMDgxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: `Het Maritiem Museum vertelt het verhaal van de visserij en scheepvaart aan de Belgische kust.`
  }
};

// Dynamische import van Contentful service (alleen wanneer beschikbaar)
async function loadProjectFromContentful(slug: string): Promise<Project | null> {
  try {
    // Probeer Contentful service te laden
    const contentfulModule = await import('../services/contentful');
    
    if (contentfulModule.isContentfulConfigured()) {
      const project = await contentfulModule.getProjectBySlug(slug);
      if (project) {
        console.log('✅ Project geladen vanuit Contentful:', slug);
        return project;
      }
    }
  } catch (error) {
    // Contentful niet beschikbaar (normale situatie in preview)
    console.log('ℹ️ Contentful niet beschikbaar, gebruik mock data');
  }
  
  return mockProjectData[slug] || null;
}

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadProject() {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const loadedProject = await loadProjectFromContentful(slug);
      setProject(loadedProject);
      setIsLoading(false);
    }

    loadProject();
  }, [slug]);

  if (isLoading) {
    return (
      <main className="col-span-3 grid grid-cols-3">
        <div className="col-span-2 px-6 py-12">
          <p className="text-blue-600">Project laden...</p>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="col-span-3 grid grid-cols-3">
        <div className="col-span-2 px-6 py-12">
          <p>Project niet gevonden</p>
        </div>
      </main>
    );
  }

  // Combineer hoofdbeeld + extra beelden voor de gallery
  const allImages = [project.mainImage, ...project.extraImages].filter(img => img);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: -scrollContainerRef.current.clientHeight, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: scrollContainerRef.current.clientHeight, behavior: 'smooth' });
    }
  };

  return (
    <main className="col-span-3 grid grid-cols-3 h-[calc(100vh-88px)]">
      <div className="col-span-2 pl-[6px] pr-[6px] relative overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div 
          ref={scrollContainerRef}
          className="flex flex-col gap-[6px] snap-y snap-mandatory"
        >
          {allImages.map((image, index) => (
            <div key={index} className="snap-start">
              <ImageWithFallback 
                src={image} 
                alt={`${project.title} - afbeelding ${index + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1 pl-[6px] pr-[6px] overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div>
          <ImageWithFallback 
            src={project.mainImage} 
            alt={project.title}
            className="w-full h-auto mb-[6px] cursor-pointer"
            onClick={() => navigate('/projecten')}
          />
          <p className="text-blue-600 mb-4">
            <span>{project.title}</span> <span style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '15px', fontStyle: 'italic' }}>— {project.location}</span>
          </p>
          <p className="whitespace-pre-line">{project.description}</p>
        </div>
      </div>
    </main>
  );
}
