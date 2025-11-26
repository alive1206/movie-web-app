import { CountryComponent } from "@/containers";
import axios from "axios";

export const dynamic = "force-dynamic";

export default async function CountryScreen({
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
        `https://phim.nguonc.com/api/films/quoc-gia/${slug}?page=${page}`
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const movies = await fetchData(slug, page);

  return <CountryComponent slug={slug} data={movies} />;
}
