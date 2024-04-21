/** next */
import { useRouter } from "next/router";

/** icons */
import { GoHomeFill } from "react-icons/go";
import { RiRobot2Fill } from "react-icons/ri";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";

/** styles */
import styles from "./styles.module.scss";
import Link from "next/link";
///////////////////////////////////////////////////////////////////////////////////

const Navbar = () => {
  const router = useRouter();

  return (
    <ul className={styles.navContainer}>
      <li>
        <Link
          href="/home"
          className={router.pathname === "/home" ? styles.active : ""}
        >
          <GoHomeFill size={28} />
          <p>Home</p>
        </Link>
      </li>
      <li>
        <Link
          href="/chatbot"
          className={router.pathname === "/chatbot" ? styles.active : ""}
        >
          <RiRobot2Fill size={28} />
          <p>Chatbot</p>
        </Link>
      </li>
      <li>
        <Link
          href="/loan"
          className={router.pathname === "/loan" ? styles.active : ""}
        >
          <FaMoneyBillTransfer size={28} />
          <p>Loan</p>
        </Link>
      </li>
      <li>
        <Link
          href="/profile"
          className={router.pathname === "/profile" ? styles.active : ""}
        >
          <IoPersonCircleSharp size={28} />
          <p>Profile</p>
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
