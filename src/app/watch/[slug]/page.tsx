import { Watch } from "@/containers";
import axios from "axios";

export default async function WatchScreen({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {
  const { slug } = params;
  const episode =
    searchParams?.tap === "full"
      ? "full"
      : searchParams?.tap
      ? parseInt(searchParams.tap)
      : 1;

  const getChiTietPhim = async () => {
    try {
      const data = await axios.get(`https://phim.nguonc.com/api/film/${slug}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const chiTietPhim = await getChiTietPhim();

  return <Watch chiTietPhim={chiTietPhim?.data?.movie} episode={episode} />;
}
