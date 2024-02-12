/**
 * 
 * @param {import('@vercel/postgres').VercelPoolClient} client 
 * @returns 
 */
async function seedBookshelf(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
      console.log('Creating table: bookshelf')
  
      await client.sql`CREATE TABLE IF NOT EXISTS bookshelf (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        thoughts TEXT NOT NULL
      );`
  
      console.log('Cleanup');
  
      await client.sql`TRUNCATE bookshelf`;
  
      console.log('Inserting bookshelf');
  
      const data = require(`./bookshelf.json`);
      await Promise.all(
        data.map(
          (item) => client.sql`
          INSERT INTO bookshelf (title, author, thoughts)
          VALUES (${item.title}, ${item.author}, ${item.thoughts})
          ON CONFLICT (id) DO NOTHING;
        `,
        ),
      );
  
    } catch (error) {
      console.error('Error seeding bookshelf:', error);
      throw error;
    }
  }

  module.exports = seedBookshelf;