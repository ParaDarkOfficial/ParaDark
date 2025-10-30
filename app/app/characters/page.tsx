import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Define the character data interface
interface Character {
  slug: string;
  title: string;
  alias?: string;
  homeDimension?: string;
  status?: string;
  summary?: string;
  source: 'canon' | 'community';
}

// Function to get all characters
async function getAllCharacters(): Promise<Character[]> {
  const charactersDirectory = path.join(process.cwd(), '../lore');
  const characters: Character[] = [];

  // Process canon characters
  const canonFiles = fs.readdirSync(path.join(charactersDirectory, 'canon/characters'))
    .filter(file => file.endsWith('.md'));

  for (const file of canonFiles) {
    const slug = file.replace(/\.md$/, '');
    const filePath = path.join(charactersDirectory, 'canon/characters', file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);

    // Extract metadata
    const aliasMatch = matterResult.content.match(/\*\*Alias \/ Title:\*\* (.*)/);
    const homeDimensionMatch = matterResult.content.match(/\*\*Home Dimension:\*\* (.*)/);
    const statusMatch = matterResult.content.match(/\*\*Status:\*\* (.*)/);

    // Extract summary
    const summaryMatch = matterResult.content.match(/## Summary\n\n([\s\S]*?)(?=\n##|\n---|$)/);

    characters.push({
      slug,
      title: matterResult.data.title as string || slug.replace(/_/g, ' '),
      alias: aliasMatch ? aliasMatch[1] : '',
      homeDimension: homeDimensionMatch ? homeDimensionMatch[1] : '',
      status: statusMatch ? statusMatch[1] : '',
      summary: summaryMatch ? summaryMatch[1].substring(0, 200) + (summaryMatch[1].length > 200 ? '...' : '') : '',
      source: 'canon'
    });
  }

  // Process community characters
  const communityFiles = fs.readdirSync(path.join(charactersDirectory, 'community/characters'))
    .filter(file => file.endsWith('.md') && file !== '_template.md');

  for (const file of communityFiles) {
    const slug = file.replace(/\.md$/, '');
    const filePath = path.join(charactersDirectory, 'community/characters', file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);

    // Extract metadata
    const aliasMatch = matterResult.content.match(/\*\*Alias \/ Title:\*\* (.*)/);
    const homeDimensionMatch = matterResult.content.match(/\*\*Home Dimension:\*\* (.*)/);
    const statusMatch = matterResult.content.match(/\*\*Status:\*\* (.*)/);

    // Extract summary
    const summaryMatch = matterResult.content.match(/## Summary\n\n([\s\S]*?)(?=\n##|\n---|$)/);

    characters.push({
      slug,
      title: matterResult.data.title as string || slug.replace(/_/g, ' '),
      alias: aliasMatch ? aliasMatch[1] : '',
      homeDimension: homeDimensionMatch ? homeDimensionMatch[1] : '',
      status: statusMatch ? statusMatch[1] : '',
      summary: summaryMatch ? summaryMatch[1].substring(0, 200) + (summaryMatch[1].length > 200 ? '...' : '') : '',
      source: 'community'
    });
  }

  return characters;
}

// Characters page component
export default async function CharactersPage() {
  const characters = await getAllCharacters();
  const canonCharacters = characters.filter(c => c.source === 'canon');
  const communityCharacters = characters.filter(c => c.source === 'community');

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />
      <Navbar />

      <main className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Characters</h1>
          <p className="text-xl text-purple-300 max-w-3xl mx-auto">
            Explore the diverse cast of characters from the ParaDark universe. From heroes to villains, 
            each has their own unique story and powers.
          </p>
        </div>

        {/* Canon Characters Section */}
        {canonCharacters.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-300 mb-6">Canon Characters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {canonCharacters.map((character) => (
                <Link 
                  href={`/characters/${character.slug}`} 
                  key={character.slug}
                  className="block bg-black/30 backdrop-blur-md rounded-lg p-6 transition-all duration-300 hover:bg-purple-900/30 hover:scale-105 shadow-xl"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{character.title}</h3>
                  {character.alias && (
                    <div className="text-purple-300 mb-3">
                      <span className="font-semibold">Alias:</span> {character.alias}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    {character.homeDimension && (
                      <div className="text-gray-300">
                        <span className="font-semibold text-purple-300">Dimension:</span> {character.homeDimension}
                      </div>
                    )}
                    {character.status && (
                      <div className="text-gray-300">
                        <span className="font-semibold text-purple-300">Status:</span> {character.status}
                      </div>
                    )}
                  </div>
                  {character.summary && (
                    <p className="text-gray-300 text-sm">{character.summary}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Community Characters Section */}
        {communityCharacters.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-purple-300 mb-6">Community Characters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityCharacters.map((character) => (
                <Link 
                  href={`/characters/${character.slug}`} 
                  key={character.slug}
                  className="block bg-black/30 backdrop-blur-md rounded-lg p-6 transition-all duration-300 hover:bg-purple-900/30 hover:scale-105 shadow-xl"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{character.title}</h3>
                  {character.alias && (
                    <div className="text-purple-300 mb-3">
                      <span className="font-semibold">Alias:</span> {character.alias}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    {character.homeDimension && (
                      <div className="text-gray-300">
                        <span className="font-semibold text-purple-300">Dimension:</span> {character.homeDimension}
                      </div>
                    )}
                    {character.status && (
                      <div className="text-gray-300">
                        <span className="font-semibold text-purple-300">Status:</span> {character.status}
                      </div>
                    )}
                  </div>
                  {character.summary && (
                    <p className="text-gray-300 text-sm">{character.summary}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Generate metadata for the page
export const metadata = {
  title: 'Characters - ParaDark',
  description: 'Explore the diverse cast of characters from the ParaDark universe.',
};
