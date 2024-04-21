/** react */
import { FC, ReactElement } from "react";

/** styles */
import styles from "./styles.module.scss";
import { PiStarFourFill } from "react-icons/pi";
import { FaBitcoin } from "react-icons/fa";
///////////////////////////////////////////////////////////////////////////////////

interface Props {
  investment: {
    id: number;
    name: string;
    value: number;
    icon: ReactElement;
    time: string;
  };
}

const InvestmentCard: FC<Props> = ({
  investment: { name, value, icon, time },
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardHeader}>
        <PiStarFourFill color="var(--primary)" size={24} />
        <p>Investment</p>
      </div>
      <div className={styles.cardContent}>
        <div>
          <h3>$ {value}</h3>
          <span>{name}</span>
        </div>
        {icon}
      </div>
      <div className={styles.cardFooter}>
        <p>Last transaction: {time}</p>
      </div>
    </div>
  );
};

export default InvestmentCard;
