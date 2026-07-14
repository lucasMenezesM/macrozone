import { clearAllMeals, getMeals, Meal } from "@/src/storage/meals";
import { globalStyles } from "@/src/styles/global";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MealItem from "../../components/HomeScreen/MealItem";

export default function AllMealsScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };

  const handleClearAll = async () => {
    if (meals.length === 0) {
      Alert.alert("There are not meals registered yet");
      return;
    }

    const message = "Are you sure you want to delete all meals?";

    if (Platform.OS === "web") {
      // Código para o Navegador no PC
      const confirmed = window.confirm(message);
      if (confirmed) {
        clearAllMeals();
        loadMeals();
      }
    } else {
      // Código para o Celular (Android/iOS)
      Alert.alert("Delete all meals", message, [
        {
          text: "delete all",
          style: "destructive",
          onPress: async () => {
            clearAllMeals();
            loadMeals();
          },
        },
        {
          text: "cancel",
          style: "cancel",
        },
      ]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>All Meals</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearButton}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30 }}>
        {meals.length === 0 ? (
          <Text style={globalStyles.empty}>No meals logged yet.</Text>
        ) : (
          meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              onDelete={loadMeals}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = {
  clearButton: {
    color: "red",
    fontSize: 16,
  },
};
