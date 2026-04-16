import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  // Delete existing data to avoid unique constraint issues during re-seeds
  await prisma.note.deleteMany();
  await prisma.book.deleteMany();

  const books = [
    {
      isbn: "978-0132350884",
      title: "Clean Code",
      author: "Robert C. Martin",
      description: "A Handbook of Agile Software Craftsmanship.",
      review:
        "Essential reading for anyone wanting to write professional-grade code.",
      rating: 5,
      image_url: "https://example.com/clean-code.jpg",
      notes: {
        create: [
          { content: "Names should be descriptive and avoid disinformation." },
          { content: "Functions should do one thing and do it well." },
        ],
      },
    },
    {
      isbn: "978-0201616224",
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      description: "Your journey to mastery.",
      review:
        "A classic that covers everything from career development to technical advice.",
      rating: 5,
      image_url: "https://example.com/pragmatic.jpg",
      notes: {
        create: [
          { content: "Don’t live with broken windows (fix bad code early)." },
          { content: "Orthogonality: keep unrelated things unrelated." },
        ],
      },
    },
    {
      isbn: "978-1491904244",
      title: "You Don’t Know JS: Scope & Closures",
      author: "Kyle Simpson",
      description: "Deep dive into JavaScript mechanisms.",
      review: 'Great for understanding the "why" behind JS behavior.',
      rating: 4,
      image_url: "https://example.com/ydkjs.jpg",
      notes: {
        create: [
          {
            content: "Hoisting is a metaphorical look at how code is compiled.",
          },
        ],
      },
    },
  ];

  for (const b of books) {
    const book = await prisma.book.create({
      data: b,
    });
    console.log(`Created book with id: ${book.id}`);
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
