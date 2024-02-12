/**
 * 
 * @param {import('@vercel/postgres').VercelPoolClient} client 
 * @returns 
 */
async function seedArtworks(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
      console.log('Creating table: artworks')
  
      await client.sql`CREATE TABLE IF NOT EXISTS artworks (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        url VARCHAR(255)
      );`
  
      console.log('Cleanup');
  
      await client.sql`TRUNCATE artworks`;
  
      console.log('Inserting artworks');
  
      const data = require(`./artworks.json`);
      await Promise.all(
        data.map(
          (item) => client.sql`
          INSERT INTO artworks (title, description, url)
          VALUES (${item.title}, ${item.description}, ${item.url})
          ON CONFLICT (id) DO NOTHING;
        `,
        ),
      );
  
    } catch (error) {
      console.error('Error seeding artworks:', error);
      throw error;
    }
  }

  module.exports = seedArtworks;