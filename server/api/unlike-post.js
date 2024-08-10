import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, postId } = body;

  if (!userId || !postId ) {
    throw createError({ statusCode: 400, message: 'userId, postId are required' });
  }

  const likes = await prisma.likes.deleteMany({
    where: {
       userId: userId,
       postId: postId
    }
  })
  console.log(likes);
  
  return likes;
});