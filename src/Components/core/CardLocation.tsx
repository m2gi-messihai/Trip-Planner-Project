import { FC } from "react";
import { useTranslation } from "react-i18next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, IconButton, styled } from "@mui/material";
import { Location } from "../../models/Location";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "../core/Typography";
import styles from "./CardLocation.module.css";

interface CardLocationProps {
  location: Location;
}
const FavoriteButton = styled(IconButton)({
  position: "absolute",
  backgroundColor: "white",
  top: 4,
  right: 10,
});

export const CardLocation: FC<CardLocationProps> = ({ location }) => {
  const { t } = useTranslation();
  return (
    <Card className={styles.item} sx={{ width: 320, height: 320 }}>
      <CardActionArea>
        <FavoriteButton>
          <FavoriteIcon />
        </FavoriteButton>
        <CardMedia
          component="img"
          image={location.coverImage}
          alt="Location Cover"
          className={styles.image}
          sx={{ height: 220 }}
        />
        <CardContent className={styles.locationContent}>
          <Typography text={location.name} variant="h4" />
          <Typography text={location.country} />
          <Typography text={location.activities} variant="body2" />
          <Typography text={t("common.activities")} variant="body2" />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
