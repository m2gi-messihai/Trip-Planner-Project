import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Button, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { UserDto } from "../../types/dto/common/UserDto";
import styles from "./ProfileHeader.module.css";
import { useTranslation } from "react-i18next";

interface ProfileHeaderProps {
    loggedInUser: UserDto;

    logOut: () => void;
}
export const ProfileHeader: FC<ProfileHeaderProps> = ({ loggedInUser, logOut }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <Paper className={styles.header}>
            <div className={styles.userInfo}>
                <Avatar sx={{ width: 40, height: 40, fontSize: "xx-large" }}>
                    {loggedInUser.firstName.charAt(0)}
                </Avatar>
                <div>
                    <Typography variant="h4">
                        {loggedInUser?.firstName} {loggedInUser.lastName}
                    </Typography>
                    <Typography variant="subtitle2">{loggedInUser?.email}</Typography>
                </div>
            </div>
            <Button
                variant="text"
                sx={{ color: "black", gap: "5px" }}
                onClick={() => {
                    logOut();
                    navigate("/auth/login");
                }}
            >
                <LogoutIcon />
                <Typography variant="subtitle2">{t("user.logOut")}</Typography>
            </Button>
        </Paper>
    );
};
