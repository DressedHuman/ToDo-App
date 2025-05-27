import { FlatList, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { ITaskDetailsInfoData } from "../App";
import { View } from "react-native";
import SwipeableItem from "./SwipeableItem";
import TaskCard from "./TaskCard";
import { Dispatch, SetStateAction } from "react";
import { TaskDetailsInfoType } from "./TaskDetailsModal";

interface IProps {
    taskData: ITaskDetailsInfoData[];
    handleStatusUpdate: (time_stamp: string, status: boolean) => void;
    handleDeleteTask: (index: number) => void;
    setIsTaskDetailsModalVisible: Dispatch<SetStateAction<boolean>>;
    setTaskDetailsModalInfo: Dispatch<SetStateAction<TaskDetailsInfoType>>;
};

const TaskContainer: React.FC<IProps> = ({ taskData, handleDeleteTask, setIsTaskDetailsModalVisible, setTaskDetailsModalInfo, handleStatusUpdate }) => {

    return (
        <GestureHandlerRootView>
            <FlatList
                data={taskData}
                keyExtractor={item => item.time_stamp}
                renderItem={({ item, index }) => {
                    const scrollGesture = Gesture.Native();
                    return (
                        <SwipeableItem
                            onDismiss={() => handleDeleteTask(index)}
                            args={null}
                            simultaneousGesture={scrollGesture}
                        >
                            <TaskCard
                                title={item.title}
                                details={item.details}
                                isChecked={item.done}
                                setModalVisible={setIsTaskDetailsModalVisible}
                                setDetailsModalInfo={setTaskDetailsModalInfo}
                                handleStatusUpdate={() => handleStatusUpdate(item.time_stamp, !item.done)}
                            />
                        </SwipeableItem>)
                }}
                contentContainerStyle={{
                    flexGrow: 1,
                    minWidth: "100%",
                    paddingHorizontal: 17,
                    paddingVertical: 17,
                    gap: 12,
                }}
            />
        </GestureHandlerRootView>
    )
}


export default TaskContainer;