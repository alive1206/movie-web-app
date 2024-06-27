import { Home } from "@/containers";
import axios from "axios";

export default async function HomeScreen() {
  const getPhimMoiCapNhat = async () => {
    try {
      const data = await axios.get(
        "https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=1"
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const phimMoi = await getPhimMoiCapNhat();

  return <Home phimMoi={phimMoi?.data?.items} />;
}
