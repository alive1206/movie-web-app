import { useEffect, useState, useCallback } from "react";
import { Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const InfiniteScroll = ({
  fetchData,
  renderData,
  hasMore,
}: {
  fetchData: (page: number) => any;
  renderData: () => JSX.Element;
  hasMore: boolean;
}) => {
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight / 2
    ) {
      if (hasMore && !loading) {
        setLoading(true);
        const timeoutFetch = setTimeout(() => {
          fetchData(page).finally(() => {
            setLoading(false);
          });
        }, 2500);

        setPage((prevPage) => prevPage + 1);
        return () => clearTimeout(timeoutFetch);
      }
    }
  }, [fetchData, page, hasMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <div>{renderData()}</div>

      {loading && (
        <div className="w-full flex justify-center">
          <Space>
            <Spin
              indicator={<LoadingOutlined spin />}
              size="large"
              className="text-5xl relative z-40 text-[#ffffff]"
            />
          </Space>
        </div>
      )}
    </div>
  );
};
