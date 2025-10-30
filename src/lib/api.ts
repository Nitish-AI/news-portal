import { NewsArticle, NewsResponse, PaginationInfo } from '@/types/news';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';
const PAGE_SIZE = 9; // 3x3 grid

export interface NewsApiResult {
    articles: NewsArticle[];
    pagination: PaginationInfo;
}

export class NewsApiService {
    static async getTopHeadlines(
        country: string = 'us',
        category?: string,
        page: number = 1
    ): Promise<NewsApiResult> {
        try {
            // 1. Check API key existence
            if (!API_KEY) {
                throw new Error('NewsAPI key is not configured. Please add NEXT_PUBLIC_NEWS_API_KEY to your .env.local file');
            }

            // 2. Prepare request parameters using URLSearchParams
            const params = new URLSearchParams({
                country,                       // Country filter
                apiKey: API_KEY,               // API credentials
                pageSize: PAGE_SIZE.toString(), // Number of articles per page (fixed at 9 in your code)
                page: page.toString(),          // Page number for pagination
                ...(category && { category })   // Include category if provided
            });

            // 3. Fetch news from NewsAPI 'top-headlines' endpoint
            const response = await fetch(`${BASE_URL}/top-headlines?${params}`);

            // 4. Handle any unsuccessful HTTP response
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || `API Error: ${response.status} ${response.statusText}`;
                throw new Error(`Failed to fetch news: ${errorMessage}`);
            }

            // 5. Parse JSON response into typed object
            const data: NewsResponse = await response.json();

            // 6. Filter out articles with the title '[Removed]' which NewsAPI sometimes returns
            // Also check and replace problematic image URLs with a placeholder
            const problematicDomains = ['biztoc.com', 'cdn.biztoc.com'];
            const articles = data.articles
                .filter(article => article.title !== '[Removed]')
                .map(article => {
                    const hasProblematicImage = article.urlToImage && problematicDomains.some(domain => article.urlToImage?.includes(domain));
                    const safeId = article.url ? encodeURIComponent(article.url) : Math.random().toString(36).substring(2, 9);
                    return {
                        ...article,
                        id: safeId,  // Encodes URL safely to be used as article ID (e.g. in routing)
                        image: (hasProblematicImage || !article.urlToImage)
                            ? 'https://placehold.co/400x300/e5e7eb/6b7280?text=News+Image' // Placeholder for bad/missing images
                            : article.urlToImage
                    };
                });

            // 7. Calculate total pages available based on API's totalResults and page size used in calls
            const totalPages = Math.ceil(data.totalResults / PAGE_SIZE);

            // 8. Return articles and pagination info for use in UI
            return {
                articles,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalResults: data.totalResults,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            };
        } catch (error) {
            console.error('Error fetching headlines:', error);
            // 9. On error, provide empty results with pagination defaults for graceful failure
            return {
                articles: [],
                pagination: {
                    currentPage: 1,
                    totalPages: 1,
                    totalResults: 0,
                    hasNextPage: false,
                    hasPrevPage: false
                }
            };
        }
    }


    static async searchNews(
        query: string,
        page: number = 1
    ): Promise<NewsApiResult> {
        try {
            // 1. Validate API key presence
            if (!API_KEY) {
                throw new Error('NewsAPI key is not configured. Please add NEXT_PUBLIC_NEWS_API_KEY to your .env.local file');
            }

            // 2. Construct request parameters with search query and other options
            const params = new URLSearchParams({
                q: query,                       // Search keyword(s)
                apiKey: API_KEY,                // API key for authorization
                sortBy: 'publishedAt',          // Sort results by most recent
                language: 'en',                 // Filter articles to English language
                pageSize: PAGE_SIZE.toString(), // Number of results per page (9 here)
                page: page.toString()            // Page number for pagination
            });

            // 3. Perform GET request against NewsAPI's 'everything' endpoint
            const response = await fetch(`${BASE_URL}/everything?${params}`);

            // 4. Handle unsuccessful responses with meaningful error message
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || `API Error: ${response.status} ${response.statusText}`;
                throw new Error(`Failed to search news: ${errorMessage}`);
            }

            // 5. Parse JSON response with the articles and total counts
            const data: NewsResponse = await response.json();

            // 6. Filter out articles with title '[Removed]', fix problematic images
            const problematicDomains = ['biztoc.com', 'cdn.biztoc.com'];
            const articles = data.articles
                .filter(article => article.title !== '[Removed]')
                .map(article => {
                    const hasProblematicImage = article.urlToImage && problematicDomains.some(domain => article.urlToImage?.includes(domain));
                    const safeId = article.url ? encodeURIComponent(article.url) : Math.random().toString(36).substring(2, 9);
                    return {
                        ...article,
                        id: safeId,  // Unique article ID from encoded URL
                        image: (hasProblematicImage || !article.urlToImage)
                            ? 'https://placehold.co/400x300/e5e7eb/6b7280?text=News+Image' // Placeholder for broken/missing images
                            : article.urlToImage
                    };
                });

            // 7. Calculate total pages for pagination based on total results returned by API
            const totalPages = Math.ceil(data.totalResults / PAGE_SIZE);

            // 8. Return article list and pagination info for UI consumption
            return {
                articles,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalResults: data.totalResults,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            };

        } catch (error) {
            console.error('Error searching news:', error);
            // 9. Return fallback empty result with default pagination on failure
            return {
                articles: [],
                pagination: {
                    currentPage: 1,
                    totalPages: 1,
                    totalResults: 0,
                    hasNextPage: false,
                    hasPrevPage: false
                }
            };
        }
    }


    static async getArticleById(id: string): Promise<NewsArticle | null> {
        try {
            // 1. Decode the URL-encoded ID back to the full article URL or fragment
            const decodedId = decodeURIComponent(id);

            // 2. Attempt to find the article by searching NewsAPI using the decoded URL as a query
            let result = await this.searchNews(decodedId);
            let article = result.articles.find(art => art.url === decodedId);

            // 3. If not found, try a fallback search by extracting a possible title fragment from the URL
            if (!article) {
                const urlParts = decodedId.split('/');
                const titleFragment = urlParts[urlParts.length - 1]?.replace(/[-_]/g, ' ');
                if (titleFragment) {
                    result = await this.searchNews(titleFragment);
                    article = result.articles.find(
                        art => art.url === decodedId || art.title.toLowerCase().includes(titleFragment.toLowerCase())
                    );
                }
            }

            // 4. Last fallback: fetch current top headlines and search again by URL
            if (!article) {
                result = await this.getTopHeadlines('us'); // You may parameterize country if needed
                article = result.articles.find(art => art.url === decodedId);
            }

            // 5. Return the found article or null if none matched after all tries
            return article || null;
        } catch (error) {
            console.error('Error fetching article:', error);
            // Return null in case of an error instead of crashing
            return null;
        }
    }

}