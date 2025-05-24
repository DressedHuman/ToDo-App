import { Dispatch, SetStateAction } from "react";
import { Text, TextInput, View } from "react-native";
import TextInputComponent from "./TextInputComponent";

interface Props {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    details: string;
    setDetails: Dispatch<SetStateAction<string>>;
};

const AddTaskForm: React.FC<Props> = ({ title, setTitle, details, setDetails }) => {
    return (
        <View
            style={{
                width: "100%",
            }}
        >
            <Text
                style={{
                    color: "#1E293B",
                    fontFamily: "Ubuntu-Medium",
                    fontSize: 21,
                    textAlign: "center",
                    marginBottom: 12,
                }}
            >Add New Task</Text>
            <View
                style={{
                    display: "flex",
                    gap: 7,
                }}
            >
                <TextInputComponent name="Title" value={title} setValue={setTitle} />
                <TextInputComponent name="Details" value={details} setValue={setDetails} multiLine numberOfLines={7} />
            </View>
        </View>
    )
}

export default AddTaskForm;