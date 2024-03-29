import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { IconButton, styled } from "@mui/material";
import { Link } from "react-router-dom";
const ChatbotButtonElement = styled(IconButton)({
    backgroundColor: "black",
    color: "white",
    bottom: 0,
    margin: "10px",
    position: "fixed",
    right: 0,
    zIndex: 10,
    "&:hover": {
        backgroundColor: "white",
        color: "black",
    },
});
export const ChatbotButton = () => {
    return (
        <Link to="/chatbot">
            <ChatbotButtonElement size="large">
                <ChatRoundedIcon fontSize="large" />
            </ChatbotButtonElement>
        </Link>
    );
};
