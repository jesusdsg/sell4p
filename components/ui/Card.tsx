import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.dark.backgroundLight,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "black",
    width: 150,
  },
});

export default Card;
