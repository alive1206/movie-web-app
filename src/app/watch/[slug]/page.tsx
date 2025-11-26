import { Watch } from "@/containers";
import axios from "axios";

export const dynamic = "force-dynamic";

export default async function WatchScreen({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {
  const { slug } = params;
  const episode = searchParams?.tap;

  const getMovieDetail = async () => {
    try {
      const res = await axios.get(`https://phim.nguonc.com/api/film/${slug}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const movieDetail = await getMovieDetail();

  return <Watch movieDetail={movieDetail?.movie} episode={episode} />;
}
