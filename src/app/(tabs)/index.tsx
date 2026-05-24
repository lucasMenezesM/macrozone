import { getMeals, Meal } from "@/src/storage/meals";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text } from "react-native";
import { globalStyles } from "../../styles/global";
import HomeHeader from "../components/HomeScreen/HomeHeader";
import MacroGrid from "../components/HomeScreen/MacroGrid";
import RecentMeals from "../components/HomeScreen/RecentMeals";

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async (): Promise<void> => {
    const loadedMeals = await getMeals();
    setMeals(loadedMeals);
    console.log(loadedMeals);
  };

  // useEffect(() => {
  //   loadMeals();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>MacroZone</Text>
      <HomeHeader />
      <MacroGrid meals={meals} />
      <RecentMeals meals={meals} onDelete={loadMeals} />
    </ScrollView>
  );
}
