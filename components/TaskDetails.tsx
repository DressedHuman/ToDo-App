import { Text, View } from "react-native";

interface Props {
    title: string;
    details: string;
};

const TaskDetails: React.FC<Props> = ({ title, details }) => {
    return (
        <View
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start"
            }}
        >
            <Text
                style={{
                    fontFamily: "Ubuntu-Medium",
                    fontSize: 17,
                    color: "#1E293B",
                }}
            >{title}</Text>
            <Text
                style={{
                    color: "#64748B",
                    fontSize: 15,
                    fontFamily: "Ubuntu-Regular",
                }}
            >
                {details}
            </Text>
        </View>
    )
}

export default TaskDetails;