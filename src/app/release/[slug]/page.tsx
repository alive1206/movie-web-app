import { YearComponent } from "@/containers";
import axios from "axios";

export default async function YearScreen({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {
  const { slug } = params;

  const fetchData = async (slug: string, page: number = 1) => {
    try {
      const res = await axios.get(
        `https://phim.nguonc.com/api/films/nam-phat-hanh/${slug}?page=${page}`
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const movies = await fetchData(slug, page);

  return <YearComponent slug={slug} data={movies} />;
}
