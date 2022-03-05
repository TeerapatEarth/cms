export type Comment = {
    id: number,
    post?: number,
    author_name: string,
    date: string,
    avatar_urls: {"24": string, "48": string, "96": string}
    content: {rendered: string}
}