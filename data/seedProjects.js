/**
 * 
 * @param {import('@vercel/postgres').VercelPoolClient} client 
 * @returns 
 */
async function seedProjects(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
      console.log('Creating table: projects')
  
      await client.sql`CREATE TABLE IF NOT EXISTS projects (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        stack VARCHAR(255)[] NOT NULL,
        url VARCHAR(255),
        date DATE NOT NULL
      );`
  
      console.log('Cleanup');
  
      await client.sql`TRUNCATE projects`;
  
      console.log('Inserting projects');
  
      const data = require(`./projects.json`);
      await Promise.all(
        data.map(
          (item) => client.sql`
          INSERT INTO projects (title, description, stack, url, date)
          VALUES (${item.title}, ${item.description}, ${item.stack}, ${item.url}, ${item.date})
          ON CONFLICT (id) DO NOTHING;
        `,
        ),
      );
  
    } catch (error) {
      console.error('Error seeding projects:', error);
      throw error;
    }
  }

  module.exports = seedProjects;