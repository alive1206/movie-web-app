import { Watch } from "@/containers";
import axios from "axios";

export const dynamic = "force-dynamic";

export default async function WatchScreen({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const episode = resolvedSearchParams?.tap;

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
