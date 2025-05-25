import { Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS, withTiming } from "react-native-reanimated";
import React from "react";

interface IProps<T = any> {
    onDismiss: (args: T) => void;
    args: T;
    children: React.ReactNode;
    simultaneousGesture?: any;
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

const SwipeableItem: React.FC<IProps> = ({ onDismiss, args, children, simultaneousGesture }) => {
    const translateX = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .activeOffsetX(20)
        .failOffsetY(0)
        .onUpdate((event) => {
            translateX.value = Math.max(0, event.translationX); // Allow swipe right only
        })
        .onEnd(() => {
            if (translateX.value > SWIPE_THRESHOLD) {
                translateX.value = withTiming(SCREEN_WIDTH, {}, () => {
                    runOnJS(onDismiss)(args);
                });
            } else {
                translateX.value = withSpring(0);
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
        width: "100%",
    }));

    return (
        <GestureDetector gesture={panGesture.simultaneousWithExternalGesture(simultaneousGesture)}>
            <Animated.View style={animatedStyle}>
                {children}
            </Animated.View>
        </GestureDetector>
    );
};

export default SwipeableItem;