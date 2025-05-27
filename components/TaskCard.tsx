import { Dispatch, SetStateAction } from "react";
import { Pressable, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { TaskDetailsInfoType } from "./TaskDetailsModal";

interface TaskProps {
    title: string;
    details: string;
    isChecked: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    setDetailsModalInfo: Dispatch<SetStateAction<TaskDetailsInfoType>>;
    handleStatusUpdate: () => void;
};

const TaskCard: React.FC<TaskProps> = ({ title, details, isChecked, setModalVisible, setDetailsModalInfo, handleStatusUpdate }: TaskProps) => {
    const handlePress = () => {
        const info: TaskDetailsInfoType = {
            title,
            details,
        };
        setDetailsModalInfo(info);
        setModalVisible(true);
    }
    
    return (
        <Pressable
            style={{
                backgroundColor: "white",
                width: "100%",
                maxWidth: "100%",
                paddingVertical: 17,
                paddingHorizontal: 21,
                borderRadius: 10,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
            }}
            onPress={handlePress}
        >
            <View>
                <BouncyCheckbox
                    size={25}
                    fillColor="#2D62F1"
                    unFillColor="transparent"
                    iconStyle={{ borderRadius: 7 }}
                    innerIconStyle={{ borderWidth: 2, borderColor: "#2D62F1", borderRadius: 7 }}
                    onPress={handleStatusUpdate}
                    isChecked={isChecked}
                />
            </View>
            <View>
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
                    {details.length < 35 ? details : details.slice(0, 35) + "..."}
                </Text>
            </View>
        </Pressable>
    )
}

export default TaskCard;