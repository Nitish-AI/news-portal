export interface NewsArticle {
    id: string;
    title: string;
    description: string;
    content: string;
    url: string;
    image: string;
    urlToImage?: string;
    publishedAt: string;
    source: {
        name: string;
    };
    author?: string;
}

export interface NewsResponse {
    articles: NewsArticle[];
    totalResults: number;
    status: string;
}

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalResults: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}