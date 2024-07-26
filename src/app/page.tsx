import { Home } from "@/containers";
import axios from "axios";

export default async function HomeScreen() {
  const getPhimThinhHanh = async () => {
    try {
      const res = await axios.get(
        "https://phim.nguonc.com/api/films/danh-sach/phim-dang-chieu?page=1&sort_field=view"
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPhimMoiCapNhat = async () => {
    try {
      const res = await axios.get(
        "https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=1"
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const phimMoi = await getPhimMoiCapNhat();
  const phimTop = await getPhimThinhHanh();

  return <Home phimMoi={phimMoi} phimTop={phimTop} />;
}
