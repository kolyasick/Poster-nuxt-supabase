import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  console.log('create-user api called');
  
  const body = await readBody(event);
  const { email, name, avatar, id } = body;

  if (!email || !name || !avatar || !id) {
    throw createError({ statusCode: 400, message: 'Email, name, and avatar are required' });
  }

  let user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.users.create({
      data: { id, email, name, avatar },
    });
  }

  
  return user;
});