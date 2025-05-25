import { FlatList, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { ITaskDetailsInfoData } from "../App";
import { View } from "react-native";
import SwipeableItem from "./SwipeableItem";
import TaskCard from "./TaskCard";
import { Dispatch, SetStateAction } from "react";
import { TaskDetailsInfoType } from "./TaskDetailsModal";

interface IProps {
    taskData: ITaskDetailsInfoData[];
    handleDeleteTask: (index: number) => void;
    setIsTaskDetailsModalVisible: Dispatch<SetStateAction<boolean>>;
    setTaskDetailsModalInfo: Dispatch<SetStateAction<TaskDetailsInfoType>>;
};

const TaskContainer: React.FC<IProps> = ({ taskData, handleDeleteTask, setIsTaskDetailsModalVisible, setTaskDetailsModalInfo }) => {

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
                                setModalVisible={setIsTaskDetailsModalVisible}
                                setDetailsModalInfo={setTaskDetailsModalInfo}
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