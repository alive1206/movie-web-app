import { Detail } from "@/containers";
import axios from "axios";

export const dynamic = "force-dynamic";

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

  const getPhimThinhHanh = async () => {
    try {
      const res = await axios.get(
        "https://phim.nguonc.com/api/films/danh-sach/phim-dang-chieu?page=1&sort_field=new"
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const movieDetail = await getMovieDetail();
  const phimThinhHanh = await getPhimThinhHanh();
  return (
    <Detail movieDetail={movieDetail?.movie} phimThinhHanh={phimThinhHanh} />
  );
}
