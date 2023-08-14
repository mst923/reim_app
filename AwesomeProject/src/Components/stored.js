import { AsyncStorage } from "react-native";

export const save = async (reimbursementName, user, total, selected, perPerson) => {
    const key = reimbursementName;

    const value = JSON.stringify({
        reimbursementName,
        user,
        total,
        selected,
        perPerson,
    });

    await AsyncStorage.setItem(key, value);
};

export const loadAll = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const entryList = await AsyncStorage.multiGet(keys);
    return entryList.map(entry => JSON.parse(entry[1]));
};

export const clearStorage = async() => {
    try{
        await AsyncStorage.clear();
    }catch (error){
        console.log(error)
    };
};