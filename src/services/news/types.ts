
export interface NewsItem {
  id: string;
  logo: string;
  color: string;
  textColor: string;
  content: string;
  date: string;
  source?: string;
  url?: string;
}

export interface NewsApiResponse {
  answer?: {
    text: string;
  };
  sources?: Array<{
    pageContent: string;
    metadata?: {
      title?: string;
      url?: string;
    };
  }>;
  request?: any;
  endpoint?: string;
}
