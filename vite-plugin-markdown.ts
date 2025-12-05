import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function markdownPlugin(): Plugin {
  return {
    name: 'vite-plugin-markdown-loader',
    
    // Virtual module that loads all markdown projects
    resolveId(id) {
      if (id === 'virtual:projects') {
        return '\0virtual:projects';
      }
    },
    
    load(id) {
      if (id === '\0virtual:projects') {
        const projectsDir = path.resolve(process.cwd(), 'content/projects');
        
        // Check if directory exists
        if (!fs.existsSync(projectsDir)) {
          return 'export default [];';
        }
        
        const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'));
        
        const projects = files.map(file => {
          const filePath = path.join(projectsDir, file);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(fileContents);
          
          return {
            title: data.title || '',
            location: data.location || '',
            slug: data.slug || file.replace('.md', ''),
            mainImage: data.mainImage || '',
            image1: data.image1 || undefined,
            image2: data.image2 || undefined,
            image3: data.image3 || undefined,
            image4: data.image4 || undefined,
            image5: data.image5 || undefined,
            description: data.description || '',
            published: data.published !== false
          };
        });
        
        // Filter only published projects
        const publishedProjects = projects.filter(p => p.published);
        
        return `export default ${JSON.stringify(publishedProjects, null, 2)};`;
      }
    }
  };
}
