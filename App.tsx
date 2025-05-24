import { useEffect, useState } from "react";
import { Button, ScrollView, StatusBar, Text, useColorScheme, View } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen";
import TaskDetailsModal, { TaskDetailsInfoType } from "./components/TaskDetailsModal";
import TaskCard from "./components/TaskCard";
import TaskDetails from "./components/TaskDetails";
import AddTaskModal from "./components/AddTaskModal";
import LinkedList from "./components/LinkedList";
import { getSavedTasksData } from "./components/StorageFunctions";

export interface ITaskDetailsInfoData {
  title: string;
  details: string;
};


const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(useColorScheme() === "dark");
  const [dateTime, setDateTime] = useState(new Date());
  const [isTaskDetailsModalVisible, setIsTaskDetailsModalVisible] = useState<boolean>(false);
  const [taskDetailsModalInfo, setTaskDetailsModalInfo] = useState<TaskDetailsInfoType>({
    title: "",
    details: "",
  });
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState<boolean>(false);
  const [taskData, setTaskData] = useState<LinkedList<ITaskDetailsInfoData>>(new LinkedList<ITaskDetailsInfoData>);

  const themeStyle = {
    backgroundColor: isDarkMode ? "#2D62F1" : Colors.lighter,
    fontColor: isDarkMode ? "white" : "black",
  };

  const handleToggleThemeMode = () => {
    setIsDarkMode(currentBooleanVal => !currentBooleanVal);
  }

  // initialize taskData with tasks saved into the AsyncStorage
  useEffect(() => {
    getSavedTasksData()
    .then(saved_tasks_data => {
      // initializing a new LinkedList with the saved tasks data
      const newLinkedList = new LinkedList<ITaskDetailsInfoData>();
      saved_tasks_data.forEach((value: ITaskDetailsInfoData) => {
        newLinkedList.push(value);
      });

      // updating taskData with newLinkedList
      setTaskData(newLinkedList);
    })
  }, []);

  return (
    <View>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={themeStyle.backgroundColor}
        // hidden
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
        <View
          style={{
            width: "100%",
            backgroundColor: themeStyle.backgroundColor,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingVertical: 12,
            paddingHorizontal: 17,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <Text style={{
              color: themeStyle.fontColor,
              fontSize: 25,
              fontFamily: "Ubuntu-Medium",
            }}>Today</Text>

            <Text
              style={{
                color: themeStyle.fontColor,
                fontSize: 17,
                fontFamily: "Ubuntu-Regular",
              }}>
              {dateTime.toDateString()}
            </Text>
          </View>
          
          {/* Theme toggle button */}
          <Button title={isDarkMode ? "Light" : "Dark"} onPress={handleToggleThemeMode} />
        </View>

        {/* Task Cards Container */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            minWidth: "100%",
            paddingHorizontal: 17,
            paddingVertical: 17,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Task Cards will appear here */}
          {
            Array.from({ length: taskData.size() }, (_, i) => {
              const task = taskData.get(i);
              return <TaskCard
                key={i}
                title={task.title}
                details={task.details}
                setModalVisible={setIsTaskDetailsModalVisible}
                setDetailsModalInfo={setTaskDetailsModalInfo}
              />
            })
          }
        </ScrollView>
        
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

      {/* Task Details Modal */}
      <TaskDetailsModal
        isModalVisible={isTaskDetailsModalVisible}
        setIsModalVisible={setIsTaskDetailsModalVisible}
        taskDetailsInfo={taskDetailsModalInfo}
      />

      {/* Add Task Model */}
      <AddTaskModal isModalVisible={isAddTaskModalVisible} setIsModalVisible={setIsAddTaskModalVisible} setTaskData={setTaskData} />

    </View>
  )
}

export default App;