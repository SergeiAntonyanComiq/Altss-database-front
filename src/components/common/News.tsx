import React, { useEffect, useState } from "react";
import { NewsItem, fetchPaginatedNews } from "@/services/newsService";
import CustomPagination from "@/components/ui/CustomPagination.tsx";
import { Loading } from "@/utils.tsx";
import { NewsCard } from "@/components/familyofficescontacts/tabs/components/NewsCard.tsx";
import { cn } from "@/lib/utils.ts";

const News = ({ firmName }: { firmName: string }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      try {
        const { data, totalPages } = await fetchPaginatedNews({
          company: firmName,
          page: currentPage,
          limit: itemsPerPage,
        });

        setNewsItems(data);
        setTotalPages((prev) => (currentPage === 1 ? totalPages : prev));
      } catch (error) {
        setNewsItems([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    if (firmName) {
      (async () => {
        await loadNews();
      })();
    }
  }, [firmName, currentPage]);

  const recentNews = newsItems.filter((news) => {
    const year = news.date !== "n/a" ? new Date(news.date).getFullYear() : 2025;

    return year > 2023;
  });

  const olderNews = newsItems.filter((news) => {
    const year = news.date !== "n/a" ? new Date(news.date).getFullYear() : 2025;
    return year <= 2023;
  });

  return (
    <>
      <Loading show={isLoading} />

      {newsItems.length === 0 && !isLoading ? (
        <p className="text-sm text-gray-500">No news found.</p>
      ) : (
        <>
          {recentNews.length > 0 ? (
            <>
              <h2 className="font-semibold text-xl py-2 mb-2">Recent</h2>
              <hr className="border-t border-gray-200 mb-4" />
              {recentNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </>
          ) : null}

          {olderNews.length > 0 ? (
            <>
              <h2
                className={cn(
                  "font-semibold text-xl py-2 mb-2",
                  recentNews.length > 0 ? "mt-6" : ""
                )}
              >
                Older
              </h2>
              <hr className="border-t border-gray-200 mb-4" />
              {olderNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </>
          ) : null}
        </>
      )}

      {!isLoading && totalPages > 1 && (
        <div className="mt-6">
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            showPerPage={false}
          />
        </div>
      )}
    </>
  );
};

export { News };
