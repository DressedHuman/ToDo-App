import { Text, TouchableOpacity, View } from "react-native";
import { themeStyle } from "../App";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
    const [dateTime, setDateTime] = useState(new Date());

    const handleToggleThemeMode = () => {
        return null;
    }

    // updating the date every 1 hour
    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        });

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    return (
        < View
            style={{
                width: "100%",
                backgroundColor: themeStyle.backgroundColor,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                paddingVertical: 12,
                paddingHorizontal: 17,
            }
            }
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
            {/* <TouchableOpacity
                onPress={handleToggleThemeMode}
                style={{
                    backgroundColor: "green",
                }}
            >
                <Text>Dark</Text>
            </TouchableOpacity> */}
        </View >
    )
}

export default Header;