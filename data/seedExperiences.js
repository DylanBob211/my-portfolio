/**
 * 
 * @param {import('@vercel/postgres').VercelPoolClient} client 
 * @returns 
 */
async function seedExperiences(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
      console.log('Creating table: experiences')
  
      await client.sql`CREATE TABLE IF NOT EXISTS experiences (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
        company VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        tasks TEXT[] NOT NULL,
        url VARCHAR(255),
        date DATE NOT NULL
      );`
  
      console.log('Cleanup');
  
      await client.sql`TRUNCATE experiences`;
  
      console.log('Inserting experiences');
  
      const data = require(`./experiences.json`);
      await Promise.all(
        data.map(
          (item) => client.sql`
          INSERT INTO experiences (company, description, tasks, url, date)
          VALUES (${item.company}, ${item.description}, ${item.tasks}, ${item.url}, ${item.date})
          ON CONFLICT (id) DO NOTHING;
        `,
        ),
      );
  
    } catch (error) {
      console.error('Error seeding experiences:', error);
      throw error;
    }
  }

  module.exports = seedExperiences;