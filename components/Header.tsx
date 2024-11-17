import { Colors } from "@/constants/Colors";
import { StyleSheet, View, Text, SafeAreaView, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const Header = () => (
  <SafeAreaView style={styles.container}>
    <Text style={{ color: "#fff" }}>Bienvenido</Text>
    <Image
      source={require("../assets/images/logo.png")}
      resizeMode="contain"
      style={{ width: "50%", height: 50 }}
    />
    <Icon name="shopping-cart" size={30} color="#fff" />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    minHeight: "auto",
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.dark.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    width: 60,
  },
});

export default Header;
