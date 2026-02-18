import {
  FacebookFilled,
  InstagramFilled,
  TwitterOutlined,
} from "@ant-design/icons";

type Props = {};

export const Footer: React.FC<Props> = () => {
  return (
    <div className="bg-[#04050a] text-white py-6 px-2">
      <div className="container">
        <div className="flex justify-center gap-6 max-[576px]:flex-col max-[576px]:items-center">
          <ul className="text-white list-none flex flex-col gap-1">
            <li className="text-[#e74c3c]">Trợ giúp</li>
            <li className="cursor-pointer hover:opacity-70">Hỏi đáp</li>
            <li className="cursor-pointer hover:opacity-70">Liên hệ</li>
            <li className="cursor-pointer hover:opacity-70">Tin tức</li>
          </ul>
          <ul className="text-white list-none flex flex-col gap-1">
            <li className="text-center text-[#e74c3c]">Thông tin</li>
            <li className="cursor-pointer hover:opacity-70">
              Điều khoản sử dụng
            </li>
            <li className="cursor-pointer hover:opacity-70">
              Chính sách riêng tư
            </li>
            <li className="cursor-pointer hover:opacity-70">
              Khiếu nại bản quyền
            </li>
          </ul>
          <ul className="text-white list-none flex flex-col gap-2">
            <li className="text-[#e74c3c]">Theo dõi</li>
            <div className="flex gap-3">
              <li>
                <InstagramFilled
                  className="text-lg cursor-pointer hover:opacity-70"
                  title="Instagram"
                />
              </li>
              <li>
                {" "}
                <TwitterOutlined
                  className="text-lg cursor-pointer hover:opacity-70"
                  title="Twitter"
                />
              </li>
              <li>
                <FacebookFilled
                  className="text-lg cursor-pointer hover:opacity-70"
                  title="Facebook"
                />
              </li>
            </div>
          </ul>
        </div>
        <div className="text-center mt-6 border-t py-3 opacity-70 uppercase text-[#e74c3c] font-bold">
          Đây là dự án demo cá nhân chỉ mang tính chất học tập
        </div>
      </div>
    </div>
  );
};
