import { Dispatch, SetStateAction } from "react";
import { Text, TextInput, View } from "react-native";

interface Props {
    name: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    multiLine?: boolean;
    numberOfLines?: number;
};

const TextInputComponent: React.FC<Props> = ({ name, value, setValue, multiLine, numberOfLines }) => {
    return (
        <View>
            <Text
                style={{
                    color: "#1E293B",
                    fontFamily: "Ubuntu-Medium",
                    fontSize: 17,
                    marginBottom: 5,
                }}
            >{name}</Text>
            <TextInput
                style={{
                    color: "#64748B",
                    fontFamily: "Ubuntu-Regular",
                    fontSize: 16,
                    borderWidth: 2,
                    borderColor: "#CBD5E1",
                    borderRadius: 7,
                    height: multiLine ? 105 : "auto",
                    textAlignVertical: "top",
                }}
                onChangeText={(newValue: string) => setValue(newValue)}
                defaultValue={value}
                multiline={multiLine}
                numberOfLines={numberOfLines}
            />
        </View>
    )
}

export default TextInputComponent;