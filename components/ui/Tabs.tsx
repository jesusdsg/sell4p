import { Colors } from "@/constants/Colors";
import { ITab } from "@/types/Tabs";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface TabsProps {
  tabs: ITab[];
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab == tab.id ? styles.tabActive : null]}
          onPress={() => setActiveTab(tab.id)}
        >
          <Text
            style={{
              color: Colors.default.white,
            }}
          >
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    margin: "auto",
    alignSelf: "center",
    flexWrap: "wrap",
  },
  tab: {
    backgroundColor: Colors.dark.backgroundLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: Colors.default.main,
  },
});

export default Tabs;
