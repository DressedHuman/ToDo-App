import { useEffect, useMemo, useState } from "react";
import { Button, StatusBar, useColorScheme, View } from "react-native";
import TaskDetailsModal, { TaskDetailsInfoType } from "./components/TaskDetailsModal";
import AddTaskModal from "./components/AddTaskModal";
import { getSavedTasksData, removeTaskData, updateSavedTask } from "./components/StorageFunctions";
import Header from "./components/Header";
import TaskContainer from "./components/TaskContainer";

export interface ITaskDetailsInfoData {
  time_stamp: string;
  title: string;
  details: string;
  done: boolean;
  completedAt?: string;
};



const themeStyle = {
  backgroundColor: "#2D62F1",
  fontColor: "white",
};


const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(useColorScheme() === "dark");
  const [isTaskDetailsModalVisible, setIsTaskDetailsModalVisible] = useState<boolean>(false);
  const [taskDetailsModalInfo, setTaskDetailsModalInfo] = useState<TaskDetailsInfoType>({
    title: "",
    details: "",
  });
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState<boolean>(false);
  const [taskData, setTaskData] = useState<ITaskDetailsInfoData[]>([]);


  // handler for updating task status
  const handleUpdateStatus = (time_stamp: string, status: boolean) => {
    // store current task info for using to update saved tasks below
    const targetTask = taskData.find(item => item.time_stamp === time_stamp)!;

    // update at the app ui
    setTaskData(prevTaskData => {
      const newTaskData = [...prevTaskData];
      return newTaskData.map(item => {
        if (item.time_stamp === time_stamp) {
          item.done = status;
          if (status) {
            item.completedAt = new Date().toString();
          } else {
            item.completedAt = "";
          }
        }
        return item;
      })
    })

    // update at AsyncStorage
    targetTask.done = status;
    updateSavedTask(time_stamp, targetTask);
  }

  // handler for deleting task
  const handleDeleteTask = (taskIndex: number) => {
    const removedTask = taskData[taskIndex];

    // remove it from taskData state
    setTaskData(prevTaskData => {
      const newTaskData = [...prevTaskData];
      newTaskData.splice(taskIndex, 1);
      return newTaskData;
    });

    // remove the task from storage
    removeTaskData(removedTask.time_stamp);
  }

  // initialize taskData with tasks saved into the AsyncStorage
  useEffect(() => {
    getSavedTasksData()
      .then(saved_tasks_data => {
        saved_tasks_data.sort((a, b) => {
          if (a.done === b.done) {
            if (!a.done) return 0;
            return new Date(a.completedAt!).valueOf() - new Date(b.completedAt!).valueOf();
          }
          return a.done ? 1 : -1;
        })
        setTaskData(saved_tasks_data);
      })
  }, []);


  // sort taskData whenever tasks get updated
  // sorting the tasks first
  const sortedTasks = useMemo(() => {
    return taskData.slice().sort((a, b) => {
      if (a.done === b.done) {
        if (!a.done) return 0;
        return new Date(a.completedAt!).valueOf() - new Date(b.completedAt!).valueOf();
      }
      return a.done ? 1 : -1;
    })
  }, [taskData]);

  return (
    <View>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={themeStyle.backgroundColor}
      />
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 7,
          backgroundColor: "#5A84F9",
          paddingBottom: 17,
        }}
      >
        {/* Header */}
        <Header />


        {/* Task Cards Container */}
        <TaskContainer
          taskData={sortedTasks}
          handleStatusUpdate={handleUpdateStatus}
          handleDeleteTask={handleDeleteTask}
          setIsTaskDetailsModalVisible={setIsTaskDetailsModalVisible}
          setTaskDetailsModalInfo={setTaskDetailsModalInfo}
        />

        {/* Add New Task Button */}
        <View
          style={{
            width: "100%",
            paddingHorizontal: "25%",
          }}
        >
          <Button title={"+Add Task"} color={themeStyle.backgroundColor} onPress={() => setIsAddTaskModalVisible(true)} />
        </View>
      </View>

      {/* Modal Containers */}
      <>
        {/* Task Details Modal */}
        <TaskDetailsModal
          isModalVisible={isTaskDetailsModalVisible}
          setIsModalVisible={setIsTaskDetailsModalVisible}
          taskDetailsInfo={taskDetailsModalInfo}
        />

        {/* Add Task Modal */}
        <AddTaskModal isModalVisible={isAddTaskModalVisible} setIsModalVisible={setIsAddTaskModalVisible} setTaskData={setTaskData} />
      </>

    </View>
  )
}

export default App;
export { themeStyle };