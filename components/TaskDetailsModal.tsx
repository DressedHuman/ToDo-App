import { Dispatch, SetStateAction } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import TaskDetails from "./TaskDetails";

export interface TaskDetailsInfoType {
    title: string;
    details: string;
};

interface Props {
    isModalVisible: boolean,
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;
    taskDetailsInfo: TaskDetailsInfoType;
};

const TaskDetailsModal: React.FC<Props> = ({ isModalVisible, setIsModalVisible, taskDetailsInfo }) => {
    return (
        <Modal
            transparent={true}
            visible={isModalVisible}
        >
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    padding: 14,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#2D62F199",
                }}
            >
                <View
                    style={{
                        width: "100%",
                        padding: 21,
                        paddingBottom: 12,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 17,
                        backgroundColor: "#FFFFFF",
                        borderRadius: 7,
                    }}
                >
                    <TaskDetails
                        title={taskDetailsInfo.title}
                        details={taskDetailsInfo.details}
                    />
                    <Pressable
                        onPress={() => setIsModalVisible(false)}
                        style={{
                            backgroundColor: "#2D62F1",
                            paddingHorizontal: 12,
                            paddingVertical: 7,
                            borderRadius: 7,
                        }}
                    >
                        <Text style={{
                            color: "white",
                            fontFamily: "Ubuntu-Medium",
                            fontSize: 17,
                        }}>Back</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default TaskDetailsModal;