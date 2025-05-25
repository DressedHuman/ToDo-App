import { Dispatch, SetStateAction, useState } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import AddTaskForm from "./AddTaskForm";
import LinkedList from "./LinkedList";
import { ITaskDetailsInfoData } from "../App";
import { saveTaskData } from "./StorageFunctions";

interface Props {
    isModalVisible: boolean,
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;
    setTaskData: Dispatch<SetStateAction<ITaskDetailsInfoData[]>>;
};

const AddTaskModal: React.FC<Props> = ({ isModalVisible, setIsModalVisible, setTaskData }) => {
    const [title, setTitle] = useState<string>("");
    const [details, setDetails] = useState<string>("");

    const handleSaveTask = async () => {
        // initializing new task info
        const new_task_info: ITaskDetailsInfoData = {
            time_stamp: new Date().toString(),
            title: title,
            details: details,
        };

        // saving to the frontend LinkedList<ITaskDetailsInfoData>
        setTaskData(prevData => {
            prevData.unshift(new_task_info);
            return prevData;
        });

        // saving to the AsyncStorage
        saveTaskData(new_task_info);

        // hiding the Add Task Modal
        setIsModalVisible(false);

        // resetting form data
        setTitle("");
        setDetails("");
    }

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
                    <AddTaskForm
                        title={title}
                        setTitle={setTitle}
                        details={details}
                        setDetails={setDetails}
                    />

                    {/* buttons */}
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            gap: 35,
                        }}
                    >
                        {/* Cancel Button */}
                        <Pressable
                            onPress={() => setIsModalVisible(false)}
                            style={{
                                backgroundColor: "#2D62F1",
                                paddingHorizontal: 14,
                                paddingVertical: 12,
                                borderRadius: 7,
                            }}
                        >
                            <Text style={{
                                color: "white",
                                fontFamily: "Ubuntu-Medium",
                                fontSize: 17,
                            }}>Cancel</Text>
                        </Pressable>
                        
                        {/* Save Task Button */}
                        <Pressable
                            onPress={handleSaveTask}
                            style={{
                                backgroundColor: "#2D62F1",
                                paddingHorizontal: 14,
                                paddingVertical: 12,
                                borderRadius: 7,
                            }}
                        >
                            <Text style={{
                                color: "white",
                                fontFamily: "Ubuntu-Medium",
                                fontSize: 17,
                            }}>Save Task</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AddTaskModal;