export interface User { 
    id: string, 
    name: string, 
    email: string, 
    avatar: string 
    likes?: Like[]
    comments?: Comment[]
    posts?: Post[]
    createdAt?: Date
    updatedAt?: Date
}

export interface Post {
    id: number
    title: string
    url: string
    userId: string
    isLiked: boolean
    user?: User
    likes: Like[]
    comments: Comment[]
    createdAt?: Date
    updatedAt?: Date
}

export interface Like {
    id?: string
    userId: string
    postId?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface Comment {
    id: number
    text: string
    userId: string
    postId: number
    user: User
    createdAt?: Date
    updatedAt?: Date
}