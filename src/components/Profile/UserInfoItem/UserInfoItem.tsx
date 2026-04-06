import type { FC } from "react";
import { Icon } from "@components/UI/Icon";
import styles from "./UserInfoItem.module.scss";

interface UserInfoItemProps {
  iconName?: string | null;
  iconContent?: string | null;
  label: string;
  value: string;
}

export const UserInfoItem: FC<UserInfoItemProps> = ({
  iconName,
  iconContent,
  label,
  value,
}) => {
  return (
    <div className={styles.info}>
      <span className={styles["info__icon-wrapper"]}>
        {iconName ? (
          <Icon className={styles.info__icon} name={iconName} />
        ) : (
          (iconContent ?? "")
        )}
      </span>
      <div className={styles.info__content}>
        <span className={styles.info__label}>{label}</span>
        <span className={styles.info__value}>{value}</span>
      </div>
    </div>
  );
};
