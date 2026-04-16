import clsx from "clsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLogoutMutation } from "@api/authApi";
import { UserInfoList } from "@components/Profile/UserInfoList";
import { Button } from "@components/UI/Button";
import { PATHS } from "@config/paths";
import type { RootState } from "@store/store";
import { getRtkErrorMessage } from "@utils/getRtkErrorMessage";

import detailsStyles from "./ProfileDetails.module.scss";

const ProfileSettingsPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const [logout, { isLoading, error }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout().unwrap();
    navigate(PATHS.HOME);
  };

  if (!user) return null;

  return (
    <section className={clsx("section", detailsStyles.section)}>
      <div className="container">
        <div className={detailsStyles.section__wrapper}>
          <h2 className="visually-hidden">Сохранённая информация</h2>
          <UserInfoList user={user} />
          <div className={detailsStyles["section__logout-wrapper"]}>
            <Button
              background="accent"
              disabled={isLoading}
              onClick={handleLogout}
            >
              {isLoading ? "Выход..." : "Выйти из аккаунта"}
            </Button>
            {error && (
              <span className={detailsStyles.section__error}>
                {getRtkErrorMessage(error, "Не удалось выйти из аккаунта.")}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSettingsPage;
