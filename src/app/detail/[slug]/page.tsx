import { Detail } from "@/containers";
import axios from "axios";

export default async function DetailScreen({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const getMovieDetail = async () => {
    try {
      const res = await axios.get(`https://phim.nguonc.com/api/film/${slug}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const movieDetail = await getMovieDetail();
  console.log(movieDetail.movie);
  return <Detail movieDetail={movieDetail?.movie} />;
}
