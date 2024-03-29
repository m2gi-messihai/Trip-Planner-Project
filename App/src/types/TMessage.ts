import { TChatbotQuestionType } from "./TChatbot";
import { UserDto } from "./dto/common/UserDto";

export type TMessage<V = any> = {
    sender: TMessageUser;
    dataType: "text" | "bot-question";
    data: V;
    sentAt: string;
};
export type TMessageUser = {
    displayName: string;
    avatar: string;
    id: number;
};
export type TMessageBotQuestionData = {
    code: string;
    type: TChatbotQuestionType;
    text: string;
    answers?: { code: string; text: string }[];
};
