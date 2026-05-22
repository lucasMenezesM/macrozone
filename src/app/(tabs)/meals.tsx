import { ScrollView, Text } from "react-native";
import { globalStyles } from "../../styles/global";

export default function MealsScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>All Meals</Text>
    </ScrollView>
  );
}
