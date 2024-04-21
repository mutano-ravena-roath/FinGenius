/** next */
import { useRouter } from "next/router";

/** react */
import { FC, ReactNode } from "react";

/** components */
import HeaderNew from "./HeaderNew";
import Navbar from "./Navbar";
///////////////////////////////////////////////////////////////////////////////////////

interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <>
      {router.pathname !== "/" && <HeaderNew />}
      {children}
      {router.pathname !== "/" && <Navbar />}
    </>
  );
};

export default Layout;
