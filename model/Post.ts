import { Comment } from "./Comment"

export type Post = {
    id: number,
    date: string,
    title: {rendered: string}
    content: {rendered: string, protected: boolean},
    author: number,
    tags: number[],
    comment: Comment[]
}
