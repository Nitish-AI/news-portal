# News Portal - Dynamic News Web Application

News Portal is a modern web application built with **Next.js and TypeScript** that allows users to **browse, search, and read news articles** from multiple categories. Users can navigate by category, view full articles, and enjoy a responsive, clean interface.

---

## 🧱 Project Structure
![image](https://github.com/user-attachments/assets/01dce9aa-5ad8-4114-8cfb-6d592305ccbf)
##How to Run the Project Locally
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

### 4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Run sever
```bash
npm run dev
```

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
Deployment (optional): Vercel / Netlify

## Challenges Faced
Handling missing images or empty descriptions in API responses
Implementing pagination with dynamic API results
Ensuring category filtering works consistently across pages
Managing state and API requests efficiently in Next.js App Router
Handling loading states and error messages for failed API calls

## ScreenShots
|Home page|
|---------|
![image](https://github.com/user-attachments/assets/28ef74d4-1455-4fe1-b6b0-d4aca8f752e0)

|Detail News page|
|------------|
![image](https://github.com/user-attachments/assets/bdf525a9-5031-4d26-86ad-4710f9fe5eb4)

## Developer
Name: Nitish
Goal: Full-stack Developer | Passionate about Java, Angular, and clean architecture
