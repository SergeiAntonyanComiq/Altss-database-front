import { NewsItem } from "@/services/newsService.ts";

export const NewsCard = ({ news }: { news: NewsItem }) => {
  const maxLength = 100;

  return (
    <div
      className="w-full pb-3 flex flex-row justify-start items-center"
      key={news.id}
    >
      <div
        style={{ color: news.textColor }}
        className="flex-shrink-0 flex items-center justify-center text-xl font-bold rounded-md overflow-hidden"
      >
        <div
          style={{ color: news.textColor }}
          className="flex-shrink-0 flex items-center justify-center text-xl font-bold rounded-md overflow-hidden w-[60px] h-[60px]"
        >
          {news.logo && news.logo.startsWith("http") ? (
            <img
              src={news.logo}
              alt="favicon"
              className="max-w-[60px] max-h-[60px]"
              onError={(e) => {
                const fallback = document.createElement("div");
                fallback.className =
                  "w-[60px] h-[60px] flex items-center justify-center bg-black text-white text-lg font-semibold";
                fallback.innerText = news.source
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase();
                e.currentTarget.replaceWith(fallback);
              }}
            />
          ) : (
            <div className="w-[60px] h-[60px] flex items-center justify-center bg-black text-white text-lg font-semibold">
              {news.source
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </div>
          )}
        </div>
      </div>
      <div className="pl-3 leading-[18px] text-base text-[#637381]">
        {news.date}
        <div>
          {news.content && news.content?.length > maxLength
            ? news.content.slice(0, maxLength).trimEnd() + "..."
            : news.content?.trimEnd().endsWith("...")
            ? news.content
            : news.content + "..."}
          {news.url && (
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-1 text-sm cursor-pointer"
            >
              Read more
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
