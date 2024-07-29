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

  const getPhimLe = async () => {
    try {
      const res = await axios.get(
        "https://phim.nguonc.com/api/films/danh-sach/phim-le?page=1"
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPhimBo = async () => {
    try {
      const res = await axios.get(
        "https://phim.nguonc.com/api/films/danh-sach/phim-bo?page=1"
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getTvShows = async () => {
    try {
      const res = await axios.get(
        "https://phim.nguonc.com/api/films/danh-sach/tv-shows?page=1"
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const phimTop = await getPhimThinhHanh();
  const phimMoi = await getPhimMoiCapNhat();
  const phimLe = await getPhimLe();
  const phimBo = await getPhimBo();
  const tvShows = await getTvShows();

  return (
    <Home
      phimMoi={phimMoi}
      phimTop={phimTop}
      phimLe={phimLe}
      phimBo={phimBo}
      tvShows={tvShows}
    />
  );
}
