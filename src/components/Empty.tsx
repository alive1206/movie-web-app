import { Empty } from "antd";

type Props = {
  description: string;
};

export const EmptyScreen: React.FC<Props> = ({ description }) => (
  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={description} />
);
