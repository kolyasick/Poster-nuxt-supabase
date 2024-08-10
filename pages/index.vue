
<script setup lang='ts'>
import { useLoadingStore } from '~/stores/loading.store';
import { usePostStore } from '~/stores/post.store';
import type { Post } from '~/types/db.types';


const loadingStore = useLoadingStore()
const postStore = usePostStore()
const posts = ref<Post[]>([])


useSeoMeta({
    title: 'Poster | Home',
    description: 'Poster | Home',
    ogImage: '/public/poster-logo.png'
})

onBeforeMount(async () => {
    try {
        await postStore.getPosts()
        loadingStore.set(false)
    } catch (err) {
        console.error(err)
    } finally {
        loadingStore.set(false)
    }
    
})



onMounted(async () => {
    watchEffect(() => {
        if (postStore.posts && postStore.posts.length >= 1) {
            posts.value = postStore.posts
        }
    })
    
})
</script>
<template>
    <ClientOnly v-if="loadingStore.isLoading" >
        <Loader />
    </ClientOnly>
    
    
    <section v-else>
        <Post v-for="post in postStore.posts" :key="post.id" :post="post" />
        <div class="h-20"></div>
        <BottomNav/>
    </section>

</template>

