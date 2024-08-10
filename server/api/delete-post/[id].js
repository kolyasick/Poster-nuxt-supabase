import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const id = event.context.params.id;

    if (!id) {
        throw createError({ statusCode: 400, message: 'Id is required' });
    }
    const postId = parseInt(id, 10);

    const post = await prisma.posts.delete({
        where: { id: postId }
    });
    
    if (!post) {
        throw createError({ statusCode: 404, message: 'Post not found' });
    }

    return post;
})
