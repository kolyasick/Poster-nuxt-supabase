import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, postId } = body;

  if (!userId || !postId ) {
    throw createError({ statusCode: 400, message: 'userId, postId are required' });
  }

  const likes = await prisma.likes.create({
    data: {
      userId,
      postId
    }
  })
  console.log(likes);
  
  return likes;
});