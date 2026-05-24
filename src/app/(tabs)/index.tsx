import { addMeal, getMeals, Meal } from "@/src/storage/meals";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/global";
import HomeHeader from "../components/HomeScreen/HomeHeader";
import MacroGrid from "../components/HomeScreen/MacroGrid";
import RecentMeals from "../components/HomeScreen/RecentMeals";

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const handleAddMealTest = async () => {
    await addMeal({
      name: "test",
      calories: 323,
      carbs: 32,
      fat: 42,
      protein: 32,
    });
    Alert.alert("Meal successfully added!");
    loadMeals();
  };

  const loadMeals = async (): Promise<void> => {
    const loadedMeals = await getMeals();
    setMeals(loadedMeals);
    console.log(loadedMeals);
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, [meals]),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>MacroZone</Text>
      <TouchableOpacity onPress={() => handleAddMealTest()}>
        <Text
          style={{
            color: "white",
            padding: 10,
            borderColor: "white",
            borderWidth: 2,
            borderRadius: 5,
            width: 150,
            marginVertical: 15,
          }}
        >
          Add Meal for test
        </Text>
      </TouchableOpacity>
      <HomeHeader />
      <MacroGrid meals={meals} />
      <RecentMeals meals={meals} onDelete={loadMeals} />
    </ScrollView>
  );
}
