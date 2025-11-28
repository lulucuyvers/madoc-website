import { createClient, Asset, Entry } from 'contentful';

// Contentful Client Setup - Safe environment variable access
const spaceId = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_CONTENTFUL_SPACE_ID : undefined;
const accessToken = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN : undefined;

// Check if credentials are available
const hasCredentials = !!(spaceId && accessToken);

// Only create client if credentials exist
const client = hasCredentials ? createClient({
  space: spaceId!,
  accessToken: accessToken!,
}) : null;

// TypeScript Types voor Contentful data
export interface ContentfulProject {
  titel: string;
  slug: string;
  locatie?: string;
  jaar?: number;
  categorie?: string;
  beschrijving?: {
    nodeType: string;
    content: Array<any>;
  };
  hoofdbeeld?: Asset;
  extraBeelden?: Asset[];
}

export interface Project {
  title: string;
  slug: string;
  location: string;
  year?: number;
  category?: string;
  description: string;
  mainImage: string;
  extraImages: string[];
}

// Helper functie om Asset URL te krijgen
function getImageUrl(asset?: Asset): string {
  if (!asset || !asset.fields) return '';
  const file = asset.fields.file as any;
  if (!file || !file.url) return '';
  return file.url.startsWith('//') ? `https:${file.url}` : file.url;
}

// Helper functie om Rich Text naar plain text te converteren
function richTextToPlainText(richText?: any): string {
  if (!richText || !richText.content) return '';
  
  return richText.content
    .map((node: any) => {
      if (node.nodeType === 'paragraph' && node.content) {
        return node.content
          .map((textNode: any) => textNode.value || '')
          .join('');
      }
      return '';
    })
    .filter((text: string) => text.length > 0)
    .join('\n\n');
}

// Converteer Contentful Entry naar ons Project type
function transformProject(entry: Entry<ContentfulProject>): Project {
  const fields = entry.fields;
  
  return {
    title: fields.titel || 'Untitled',
    slug: fields.slug || '',
    location: fields.locatie || '',
    year: fields.jaar,
    category: fields.categorie,
    description: richTextToPlainText(fields.beschrijving),
    mainImage: getImageUrl(fields.hoofdbeeld),
    extraImages: fields.extraBeelden?.map(getImageUrl).filter(url => url) || []
  };
}

// Haal alle projecten op
export async function getProjects(): Promise<Project[]> {
  if (!client) {
    console.warn('Contentful credentials niet gevonden. Gebruik mock data.');
    return [];
  }

  try {
    const response = await client.getEntries<ContentfulProject>({
      content_type: 'project',
      order: ['-fields.jaar', 'fields.titel'] as any, // Sorteer op jaar (nieuwste eerst), dan titel
    });

    return response.items.map(transformProject);
  } catch (error) {
    console.error('Fout bij ophalen Contentful projecten:', error);
    return [];
  }
}

// Haal één project op via slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!client) {
    console.warn('Contentful credentials niet gevonden. Gebruik mock data.');
    return null;
  }

  try {
    const response = await client.getEntries<ContentfulProject>({
      content_type: 'project',
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    return transformProject(response.items[0]);
  } catch (error) {
    console.error(`Fout bij ophalen project ${slug}:`, error);
    return null;
  }
}

// Check of Contentful beschikbaar is
export function isContentfulConfigured(): boolean {
  return hasCredentials;
}
