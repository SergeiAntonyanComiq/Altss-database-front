import { formatDate } from "@/utils/dateUtils";
import { getRandomColor } from "@/utils/colorUtils";
import apiClient from "@/lib/axios.ts";

export interface NewsItem {
  id: string;
  logo: string;
  color: string;
  textColor: string;
  content: string;
  date: string;
  source: string;
  url?: string;
}

export interface NewsArticle {
  position: number;
  link: string;
  title: string;
  source: string;
  date: string;
  snippet: string;
  favicon: string;
  highResFavicon: string;
  thumbnail: string;
}

export interface NewsResponse {
  metadata: {
    query: string;
    current: number;
    next: string | null;
    previous: string | null;
    totalReturned: number;
    other_pages: {
      page: number;
      url: string;
    }[];
  };
  articles: NewsArticle[];
}

export interface NewsResponseData {
  data: NewsResponse;
}

export const fetchPaginatedNews = async ({
  name,
  page,
  limit,
  isContactNews,
}: {
  name: string;
  page: number;
  limit: number;
  isContactNews: boolean;
}): Promise<{ data: NewsItem[]; totalPages: number }> => {
  try {
    const response = await apiClient.get<NewsResponseData>(
      isContactNews ? "contact-news" : "/news",
      {
        params: {
          ...(isContactNews ? { contact: name } : { company: name }),
          page,
          limit,
        },
      }
    );

    const { articles, metadata } = response.data.data;

    const data: NewsItem[] = articles?.map((article, index) => ({
      id: `news-${page}-${index}`,
      logo: article.highResFavicon,
      color: getRandomColor(index),
      textColor: "#ffffff",
      content: article.snippet ?? article.title ?? "",
      date: formatDate(article.date),
      source: article.source,
      url: article.link,
    }));

    return { data, totalPages: metadata.other_pages.length + 1 };
  } catch (error) {
    return { data: [], totalPages: 0 };
  }
};
