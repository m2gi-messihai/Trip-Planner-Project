import { Button, Tab, Tabs, Typography } from "@mui/material";
import dayjs from "dayjs";
import { range } from "lodash";
import { FC, useState } from "react";
import { TripDto } from "../../../types/dto/common/TripDto";
import styles from "./TripTimelineIntro.module.css";
import { TripUpdateDialogue } from "./TripUpdateDialogue";

interface TripTimelineIntroProps {
    trip: TripDto;
    visibleDay: string | null;
    loading: boolean;
    setVisibleDay: (day: string) => void;
    onUpdateTrip: (label: string) => Promise<void>;
}

export const TripTimelineIntro: FC<TripTimelineIntroProps> = ({
    trip,
    visibleDay,
    setVisibleDay,
    onUpdateTrip,
    loading,
}) => {
    // TODO : fix - sometimes tripDurationInDays is 1 day less than the actual duration
    const tripDurationInDays = dayjs(trip.endDate).diff(dayjs(trip.startDate), "day") + 1;
    const tabValue = visibleDay ? dayjs(visibleDay).diff(dayjs(trip.startDate), "day") : 0;
    const [updatePopupState, setUpdatePopupState] = useState<boolean>(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setVisibleDay(dayjs(trip.startDate).add(newValue, "day").toISOString());
    };

    const handleUpdateTrip = () => {
        setUpdatePopupState(true);
        // TODO : Handle update trip. A user can update the label of the trip, the start date and duration.
        // If user updates the start date, all the destinations will be updated accordingly.
        // If user updates the duration, a new recalculation for the trip is necessary
    };
    const onCloseUpdatePopup = () => {
        setUpdatePopupState(false);
    };

    return (
        <div className={styles.intro}>
            <Typography variant="h4">{trip.label || "Your Recommended trip"}</Typography>
            <div className={styles.actions}>
                <Button variant="outlined" onClick={handleUpdateTrip}>
                    Update
                </Button>
            </div>

            <Tabs
                sx={{ width: "100%" }}
                variant="scrollable"
                scrollButtons="auto"
                value={tabValue}
                onChange={handleChange}
                aria-label="basic tabs example"
            >
                {range(tripDurationInDays).map(day => (
                    <Tab
                        key={day}
                        label={dayjs(trip.startDate).add(day, "day").format("DD MMM")}
                        {...a11yProps(day)}
                    />
                ))}
            </Tabs>
            <TripUpdateDialogue
                open={updatePopupState}
                loading={loading}
                tripLabel={trip.label}
                onUpdateTrip={onUpdateTrip}
                onClose={onCloseUpdatePopup}
            />
        </div>
    );
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
