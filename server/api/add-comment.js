// server/api/create-post.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.text || !body.userId || !body.postId) {
    throw createError({ statusCode: 400, message: 'Text, userId, and postId are required' });
  }

  const post = await prisma.comments.create({
    data: {
      text: body.text,
      postId: body.postId,
      userId: body.userId,
    },
  });

  return post;
});
