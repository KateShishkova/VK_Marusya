import { CustomNavLink } from "@components/UI/CustomLink";
import { Icon } from "@components/UI/Icon";
import { PROFILE_TABS } from "@config/profileTabs";
import { useMediaQuery } from "@hooks/useMediaQuery";
import styles from "./ProfileNavList.module.scss";

export const ProfileNavList = () => {
  const isMobile = useMediaQuery("mobile");

  return (
    <nav className={styles.nav}>
      {PROFILE_TABS.map((tab) => {
        return (
          <CustomNavLink to={tab.linkTo} kind="icon-text" key={tab.label}>
            <Icon name={tab.iconName} />
            {isMobile ? tab.shortLabel : tab.label}
          </CustomNavLink>
        );
      })}
    </nav>
  );
};
