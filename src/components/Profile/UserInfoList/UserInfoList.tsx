import { PROFILE_DETAILS } from "@config/profileDetails";
import type { FC } from "react";
import { UserInfoItem } from "../UserInfoItem";
import styles from "./UserInfoList.module.scss";
import type { TUserResponse } from "@schemas/user.schema";

interface IUserInfoListProps {
  user: TUserResponse;
}

export const UserInfoList: FC<IUserInfoListProps> = ({ user }) => {
  return (
    <ul className={styles.info}>
      {PROFILE_DETAILS.map((detail, index) => {
        return (
          <li className={styles.info__item} key={index}>
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
