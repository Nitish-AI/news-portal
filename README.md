# News Portal - Dynamic News Web Application

News Portal is a modern web application built with **Next.js and TypeScript** that allows users to **browse, search, and read news articles** from multiple categories. Users can navigate by category, view full articles, and enjoy a responsive, clean interface.

---

## 🧱 Project Structure
![image](https://github.com/user-attachments/assets/344d8cf7-5d12-4116-b2d0-4b8b9bb844a8)

## How to Run the Project Locally
### ⚙️ Prerequisites
- Node.js 18+  
- npm 9+

### 1. Clone the repository
```bash
git clone https://github.com/your-username/news-portal.git
cd news-portal
```
### 2. Install dependencies
```bash
npm install
npm run dev
```
### 3. Configure environment variables

Create a .env.local file in the root directory and add your News API key:

NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key

### 4. Run sever
```bash
npm run dev
```
### 5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints Overview (Spring Boot)
| Method | Endpoint                            | Description                      |
| ------ | ----------------------------------- | -------------------------------- |
| GET    | `/top-headlines?country=us`         | Fetch latest top news            |
| GET    | `everything?q={keyword}`            | Search news by keyword           |
| GET    | `/top-headlines?category={category}`| Fetch news by category           |

## Features
Home page displaying the latest news articles
Category-wise news filtering (e.g., Sports, Technology, Business)
Detailed article pages with full content
Search functionality by keyword
Placeholder images for missing article images
Responsive UI for desktop and mobile

## Tech Stack
Frontend: Next.js 14+, React, TypeScript
Styling: Tailwind CSS
API: News API for fetching news
State Management: React Context / useState / useEffect
Deployment: Vercel

## Challenges Faced
Handling missing images or empty descriptions in API responses
Implementing pagination with dynamic API results
Ensuring category filtering works consistently across pages
Managing state and API requests efficiently in Next.js App Router
Handling loading states and error messages for failed API calls

## ScreenShots
|Home page|
|---------|
![image](https://github.com/user-attachments/assets/c10ec015-51de-4339-a562-646d558ec07b)
![image](https://github.com/user-attachments/assets/94b03432-2a9a-402a-bab2-b3f1b91ff420)
![image](https://github.com/user-attachments/assets/d9887c1a-ecdb-4865-a858-e88c031a051a)

|Detail News page|
|------------|
![image](https://github.com/user-attachments/assets/bdf525a9-5031-4d26-86ad-4710f9fe5eb4)

## Developer
Name: Nitish
Goal: Full-stack Developer | Passionate about Java, React, and clean architecture
