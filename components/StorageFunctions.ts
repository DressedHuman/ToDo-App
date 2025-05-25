import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITaskDetailsInfoData } from "../App";


// save raw value with a key in AsyncStorage by stringifying it
const storeRawDataToAsyncStorage = async (key: string, value: any) => {
    const value_stringified: string = JSON.stringify(value);
    await AsyncStorage.setItem(key, value_stringified);
}



// save a new task in the AsyncStorage
const saveTaskData = async (new_task: ITaskDetailsInfoData): Promise<void> => {
    try {
        const saved_tasks = await getSavedTasksData();

        // inserting the new task to the first position
        saved_tasks.unshift(new_task);
        await storeRawDataToAsyncStorage("saved_tasks", saved_tasks);

        // updating saved_tasks_count
        const saved_tasks_count = await getSavedTasksCount();
        await setSavedTasksCount(saved_tasks_count+1);
    } catch (e) {
        throw e;
    }
}


// get all the saved tasks as raw data (parsed)
const getSavedTasksData = async (): Promise<ITaskDetailsInfoData[]> => {
    try {
        const saved_tasks_string: string | null | undefined = await AsyncStorage.getItem("saved_tasks");
        if (saved_tasks_string) {
            const saved_tasks_parsed = JSON.parse(saved_tasks_string) as ITaskDetailsInfoData[];
            return saved_tasks_parsed;
        }
        return []
    } catch (e) {
        throw e;
    }
}


// update a task at given index with an updated task value
const updateSavedTask = async (index: number, updated_value: ITaskDetailsInfoData) => {
    try {
        const saved_tasks_count = await getSavedTasksCount();
        if (index < 0 || index >= saved_tasks_count) throw Error(`Index ${index} out of range`);

        const saved_tasks = await getSavedTasksData();
        saved_tasks[index] = updated_value;
        await storeRawDataToAsyncStorage("saved_tasks", saved_tasks);
    } catch (e) {
        throw e;
    }
}


// remove a task at a given index
const removeTaskData = async (time_stamp: string) => {
    try {
        const saved_tasks = await getSavedTasksData();
        const updated_saved_tasks = saved_tasks.filter(taskItem => taskItem.time_stamp != time_stamp);
        await storeRawDataToAsyncStorage("saved_tasks", updated_saved_tasks);
        await setSavedTasksCount(updated_saved_tasks.length);
    } catch (e) {
        throw e;
    }
}


// get the number of total tasks saved in the AsyncStorage
const getSavedTasksCount = async (): Promise<number> => {
    try {
        const saved_tasks_count = await AsyncStorage.getItem("saved_tasks_count");
        if(saved_tasks_count) {
            return parseInt(saved_tasks_count);
        }
        return 0;
    } catch (e) {
        throw e;
    }
}

// set the number of total tasks saved in the AsyncStorage
const setSavedTasksCount = async (count: number): Promise<void> => {
    try {
        await AsyncStorage.setItem("saved_tasks_count", `${count}`);
    } catch (e) {
        throw e;
    }
}


export { saveTaskData, getSavedTasksData, updateSavedTask, removeTaskData };