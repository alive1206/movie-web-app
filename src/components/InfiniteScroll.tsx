import { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { Space, Spin } from "antd"; // Import spin component from Ant Design
import { LoadingOutlined } from "@ant-design/icons";
import { throttle } from "lodash";

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
  debounce(() => {});

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
        }, 2000);

        setPage((prevPage) => prevPage + 1);
        return () => clearTimeout(timeoutFetch);
      }
    }
  }, [fetchData, page]);

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
              className="text-5xl relative z-40  text-[#ffffff]"
            />
          </Space>
        </div>
      )}
    </div>
  );
};
