import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Define the character data interface
interface CharacterData {
  title: string;
  alias?: string;
  homeDimension?: string;
  status?: string;
  summary?: string;
  powers?: string;
  origin?: string;
  helpWanted?: string;
  contentHtml: string;
}

// Get all possible slugs for static generation
export async function generateStaticParams() {
  const charactersDirectory = path.join(process.cwd(), '../lore');
  const filenames = [
    ...fs.readdirSync(path.join(charactersDirectory, 'canon/characters')),
    ...fs.readdirSync(path.join(charactersDirectory, 'community/characters'))
  ].filter(file => file.endsWith('.md'));

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

// Function to get character data
async function getCharacterData(slug: string): Promise<CharacterData> {
  const charactersDirectory = path.join(process.cwd(), '../lore');

  // Try to find the file in both directories
  let filePath = path.join(charactersDirectory, 'canon/characters', `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(charactersDirectory, 'community/characters', `${slug}.md`);
  }

  // If file doesn't exist in either directory, return 404
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  // Read file content
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Parse markdown file
  const matterResult = matter(fileContents);

  // Convert markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Extract specific sections from the content
  const content = matterResult.content as string;
  const summaryMatch = content.match(/## Summary\n\n([\s\S]*?)(?=\n##|\n---|$)/);
  const powersMatch = content.match(/## Powers & Abilities\n\n([\s\S]*?)(?=\n##|\n---|$)/);
  const originMatch = content.match(/## Origin Story\n\n([\s\S]*?)(?=\n##|\n---|$)/);
  const helpWantedMatch = content.match(/## \(Help Wanted!\)\n\n([\s\S]*?)(?=\n##|\n---|$)/);

  // Extract metadata
  const aliasMatch = matterResult.content.match(/\*\*Alias \/ Title:\*\* (.*)/);
  const homeDimensionMatch = matterResult.content.match(/\*\*Home Dimension:\*\* (.*)/);
  const statusMatch = matterResult.content.match(/\*\*Status:\*\* (.*)/);

  return {
    title: matterResult.data.title as string || slug.replace(/_/g, ' '),
    alias: aliasMatch ? aliasMatch[1] : '',
    homeDimension: homeDimensionMatch ? homeDimensionMatch[1] : '',
    status: statusMatch ? statusMatch[1] : '',
    summary: summaryMatch ? summaryMatch[1] : '',
    powers: powersMatch ? powersMatch[1] : '',
    origin: originMatch ? originMatch[1] : '',
    helpWanted: helpWantedMatch ? helpWantedMatch[1] : '',
    contentHtml,
  };
}

// Character page component
export default async function CharacterPage({ params }: { params: { slug: string } }) {
  const characterData = await getCharacterData(params.slug);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />
      <Navbar />

      <main className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
        <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 md:p-8 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{characterData.title}</h1>

          {characterData.alias && (
            <div className="text-xl text-purple-300 mb-4">
              <span className="font-semibold">Alias / Title:</span> {characterData.alias}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {characterData.homeDimension && (
              <div className="text-white">
                <span className="font-semibold text-purple-300">Home Dimension:</span> {characterData.homeDimension}
              </div>
            )}

            {characterData.status && (
              <div className="text-white">
                <span className="font-semibold text-purple-300">Status:</span> {characterData.status}
              </div>
            )}
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            {characterData.summary && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-purple-300 mb-4">Summary</h2>
                <div 
                  className="text-white prose prose-invert max-w-none" 
                  dangerouslySetInnerHTML={{ __html: characterData.summary.replace(/\n/g, '<br>') }}
                />
              </section>
            )}

            {characterData.powers && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-purple-300 mb-4">Powers & Abilities</h2>
                <div 
                  className="text-white prose prose-invert max-w-none" 
                  dangerouslySetInnerHTML={{ __html: characterData.powers.replace(/\n/g, '<br>') }}
                />
              </section>
            )}

            {characterData.origin && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-purple-300 mb-4">Origin Story</h2>
                <div 
                  className="text-white prose prose-invert max-w-none" 
                  dangerouslySetInnerHTML={{ __html: characterData.origin.replace(/\n/g, '<br>') }}
                />
              </section>
            )}

            {characterData.helpWanted && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-purple-300 mb-4">(Help Wanted!)</h2>
                <div 
                  className="text-white prose prose-invert max-w-none" 
                  dangerouslySetInnerHTML={{ __html: characterData.helpWanted.replace(/\n/g, '<br>') }}
                />
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const characterData = await getCharacterData(params.slug);

  return {
    title: `${characterData.title} - ParaDark`,
    description: characterData.summary || `Learn more about ${characterData.title} from the ParaDark universe.`,
  };
}
