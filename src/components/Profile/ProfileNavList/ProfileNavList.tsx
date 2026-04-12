import { CustomNavLink } from "@components/UI/CustomLink";
import { Icon } from "@components/UI/Icon";
import { PROFILE_TABS } from "@config/profileTabs";
import styles from "./ProfileNavList.module.scss";

export const ProfileNavList = () => {
  return (
    <nav className={styles.nav}>
      {PROFILE_TABS.map((tab) => {
        return (
          <CustomNavLink to={tab.linkTo} key={tab.label}>
            <Icon name={tab.iconName} />
            {tab.label}
          </CustomNavLink>
        );
      })}
    </nav>
  );
};
