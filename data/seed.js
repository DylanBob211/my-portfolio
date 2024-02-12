const { db } = require('@vercel/postgres');
const seedProjects = require('./seedProjects');
const seedExperiences = require('./seedExperiences');
const seedBookshelf = require('./seedBookshelf');
const seedArtworks = require('./seedArtworks');

async function main() {
  const client = await db.connect();

  await Promise.all([
    seedProjects(client),
    seedExperiences(client),
    seedBookshelf(client),
    seedArtworks(client),
  ])
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});