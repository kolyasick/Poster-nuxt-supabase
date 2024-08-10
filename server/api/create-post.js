// server/api/create-post.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.title || !body.userId) {
    throw createError({ statusCode: 400, message: 'Title and userId are required' });
  }

  const post = await prisma.posts.create({
    data: {
      title: body.title,
      url: body.url || null,
      userId: body.userId,
    },
  });

  return post;
});
