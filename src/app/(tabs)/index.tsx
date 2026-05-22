import { Link } from "expo-router";
import { ScrollView, Text } from "react-native";
import { globalStyles } from "../../styles/global";
import HomeHeader from "../components/HomeHeader";

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>MacroZone</Text>
      <HomeHeader />
      <Link href="/meals" style={{ fontSize: 18, color: "#007bff" }}>
        Go to Meals
      </Link>

      <Link href="/add-meal" style={{ fontSize: 18, color: "#007bff" }}>
        Go to Add Meals
      </Link>
    </ScrollView>
  );
}
