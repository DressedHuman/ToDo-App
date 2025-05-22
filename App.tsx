import { useState } from "react";
import { Button, ScrollView, StatusBar, Text, useColorScheme, View } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen";
import BouncyCheckbox from "react-native-bouncy-checkbox"

interface TaskProps {
  title: string;
  description: string;
};

const Task: React.FC<TaskProps> = ({ title, description }: TaskProps) => {
  return (
    <View
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
    >
      <View>
        <BouncyCheckbox
          size={25}
          fillColor="green"
          unFillColor="transparent"
          iconStyle={{ borderRadius: 7 }}
          innerIconStyle={{ borderWidth: 2, borderColor: "green", borderRadius: 7 }}
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
          {description.length < 35 ? description : description.slice(0, 35) + "..."}
        </Text>
      </View>
    </View>
  )
}

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(useColorScheme() === "dark");
  const [dateTime, setDateTime] = useState(new Date());

  const themeStyle = {
    backgroundColor: isDarkMode ? "#2D62F1" : Colors.lighter,
    fontColor: isDarkMode ? "white" : "black",
  };

  const handleToggleThemeMode = () => {
    setIsDarkMode(currentBooleanVal => !currentBooleanVal);
  }

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
          <Task title="First Task" description="This is description" />
          <Task title="Second Task" description="This is the second task's description. This contains more characters." />
          <Task title="Third Task" description="This is the third task's description." />
          <Task title="This is a Task" description="This is another description." />
          <Task title="This is a Task" description="This is another description." />
          <Task title="This is a Task" description="This is another description." />
          <Task title="This is a Task" description="এটি হলো সপ্তম টাস্ক এর বিস্তারিত বিবরণ।" />
          <Task title="This is a Task" description="This is another description." />
          <Task title="This is a Task" description="This is another description." />
        </ScrollView>

        <View
          style={{
            width: "100%",
            paddingHorizontal: "25%",
          }}
        >
          <Button title={"+Add Task"} color={themeStyle.backgroundColor} />
        </View>
      </View>
    </View>
  )
}

export default App;