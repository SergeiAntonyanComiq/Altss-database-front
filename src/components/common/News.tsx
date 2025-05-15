import React, { useEffect, useState } from "react";
import { NewsItem } from "@/services/newsService.ts";
import { useCompanyNews } from "@/hooks/useCompanyNews.ts";

const News = ({ firmName }: { firmName: string }) => {
  const maxLength = 100;

  const { newsItems } = useCompanyNews(firmName ?? "");

  const [items, setItems] =
    useState<Array<NewsItem & { isLongText?: boolean }>>(newsItems);

  useEffect(() => {
    const newItems = newsItems.map((item) => ({
      ...item,
      isLongText: item.content.length > maxLength,
    }));

    setItems(newItems);
  }, [newsItems]);

  return (
    <>
      <h2 className="font-semibold text-xl py-2 mb-2">Recent</h2>
      <hr className="border-t border-gray-200 mb-4" />
      {items.slice(0, 3).map((news) => (
        <div
          className="w-full pb-3 flex flex-row justify-start items-center"
          key={news.id}
        >
          <div
            style={{
              color: news.textColor,
              backgroundColor: news.color,
            }}
            className="flex-shrink-0 w-14 h-14 flex items-center justify-center text-xl font-bold rounded-md"
          >
            {news.logo}
          </div>
          <div className="pl-3 leading-[18px] text-sm text-[#637381]">
            {news.date}
            <div>
              {news.isLongText
                ? news.content.slice(0, maxLength) + "..."
                : news.content}
              {news.isLongText && (
                <span
                  onClick={() =>
                    setItems((prevState) => {
                      return prevState.map((item) =>
                        item.id === news.id
                          ? { ...item, isLongText: false }
                          : item,
                      );
                    })
                  }
                  className="underline ml-1 text-sm cursor-pointer"
                >
                  Read more.
                </span>
              )}
              {!news.isLongText && news.content.length > maxLength && (
                <span
                  onClick={() =>
                    setItems((prevState) =>
                      prevState.map((item) =>
                        item.id === news.id
                          ? { ...item, isLongText: true }
                          : item,
                      ),
                    )
                  }
                  className="underline ml-1 text-sm cursor-pointer"
                >
                  Show less.
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export { News };
