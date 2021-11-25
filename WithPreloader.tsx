import { FC } from "react";
import Preloader from "./Preloader";

interface IProps {
  children: JSX.Element;
  isLoading: boolean;
}

const WithPreloader: FC<IProps> = ({ children, isLoading }) => {
  return isLoading ? <Preloader /> : children;
};

export default WithPreloader;
