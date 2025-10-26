export type Article = {
    title: string;
    description: string | null;
    content?: string | null;
    url: string;
    urlToImage: string | null;
    source: {
        name: string;
    };
    author?: string | null;
    publishedAt: string;
};

// Fetch top headlines
export async function fetchTopHeadlines(): Promise<Article[]> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_NEWS_API_BASE_URL}/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );

    if (!res.ok) throw new Error("Failed to fetch news");

    const data = await res.json();
    return data.articles;
}

// Fetch single article by exact URL (filter top headlines)
export async function getArticleByUrl(articleUrl: string): Promise<Article | null> {
    const articles = await fetchTopHeadlines();
    return articles.find((a) => a.url === articleUrl) || null;
}

export async function fetchNewsByCategory(category: string): Promise<Article[]> {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
    );

    if (!res.ok) {
        console.error("Failed to fetch news by category", res.status);
        return [];
    }

    const data = await res.json();
    return data.articles || [];
}

// Optional: helper to strip HTML
export function stripHtml(html: string) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}
