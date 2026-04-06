import type { FC } from "react";
import { PROFILE_DETAILS } from "@config/profileDetails";
import type { UserResponse } from "@schemas/user.schema";

import { UserInfoItem } from "../UserInfoItem";
import styles from "./UserInfoList.module.scss";

interface UserInfoListProps {
  user: UserResponse;
}

export const UserInfoList: FC<UserInfoListProps> = ({ user }) => {
  return (
    <ul className={styles.info}>
      {PROFILE_DETAILS.map((detail) => {
        return (
          <li className={styles.info__item} key={detail.label}>
            <UserInfoItem
              iconName={detail.iconName ? detail.iconName : undefined}
              iconContent={
                detail.getIconContent ? detail.getIconContent(user) : undefined
              }
              label={detail.label}
              value={detail.getValue(user)}
            />
          </li>
        );
      })}
    </ul>
  );
};
