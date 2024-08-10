import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
    const posts = await prisma.posts.findMany({
        include: {
            user: true,
            comments: {
                include: {
                    user: true
                }
            },
            likes: true
        }
    });
    return posts;
}); 