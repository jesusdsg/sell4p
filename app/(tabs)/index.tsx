import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  FlatList,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Tabs from "@/components/ui/Tabs";
import { ITab } from "@/types/Tabs";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import axiosClient from "../api/axiosClient";

/* const tabs: ITab[] = [
  { id: 1, title: "Tecnología" },
  { id: 2, title: "Hogar" },
]; */

interface ICategory {
  id: number;
  name: string;
  image: string;
}

const mockContent = [
  {
    id: 1,
    content: "Celulares",
    categoryId: 1,
    image:
      "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCO/129558635_01/w=800,h=800,fit=pad",
  },
  {
    id: 2,
    content: "Lavadoras",
    categoryId: 1,
    image:
      "https://www.lg.com/content/dam/channel/wcms/co/images/lavadoras-y-secadoras/wd16eg2s6_aesecol_escb_co_c/gallery/Medium_01.jpg",
  },
  {
    id: 3,
    content: "Gadgets",
    categoryId: 1,
    image:
      "https://celltophone.com/wp-content/uploads/2024/03/Top-10-Latest-Electronic-Gadgets-One-Can-Buy-in-2024-1200x900.jpg",
  },
  {
    id: 4,
    content: "Consolas",
    categoryId: 1,
    image:
      "https://http2.mlstatic.com/D_NQ_NP_736574-MLU72670829971_112023-O.webp",
  },
  {
    id: 5,
    content: "Alfombras",
    categoryId: 2,
    image:
      "https://http2.mlstatic.com/D_Q_NP_630788-MLU74424017271_022024-O.webp",
  },
  {
    id: 6,
    content: "Neveras",
    categoryId: 1,
    image:
      "https://img.global.news.samsung.com/co/wp-content/uploads/2018/11/FH.jpg",
  },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState(1);
  const [filteredContent, setFilteredContent] = useState<any[]>();
  const [sliderData, setSliderData] = useState<any>([]);
  const [categoryData, setCategoryData] = useState<ICategory[]>([]);
  const [tabs, setTabs] = useState<ITab[]>([]);

  const formatCategories = () => {
    const newCategories = categoryData.map((category) => {
      return {
        id: category.id,
        title: category.name,
      };
    });
    setTabs(newCategories);
  };

  const getData = async () => {
    try {
      const response = await axiosClient.get("");
      //console.log("response is category ==>  ", response.data.category);
      //console.log("response is slider ===> ", response.data.slider);
      const { category, slider } = response.data;
      console.log("Category", slider);
      if (category) setCategoryData(category);
      if (slider) setSliderData(slider);
      formatCategories();
    } catch (error) {
      console.log("Error ", error);
    }
  };

  useEffect(() => {
    filterContent();
    getData();
    console.log("Slider ", sliderData);
  }, [activeTab]);

  const filterContent = () => {
    const activeCategory = activeTab;
    const filtered = mockContent.filter(
      (content) => content.categoryId == activeCategory
    );
    setFilteredContent(filtered);
  };

  const images = [
    {
      id: "1",
      source:
        "https://img.freepik.com/photos-gratuite/couleurs-neons-brillantes-brillent-cameleon-sauvage_23-2151682804.jpg",
    },
    /* { id: "2", source: require("@/assets/images/another-image.png") },
    { id: "3", source: require("@/assets/images/yet-another-image.png") }, */
    // Agrega más imágenes si lo deseas
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <FlatList
          data={sliderData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ width: 600, backgroundColor: "red", height: 600 }}>
              <Image
                source={{ uri: item.img }}
                style={{ width: "100%", height: 200, resizeMode: "cover" }}
              />
            </View>
          )}
        />
      }
    >
      <ThemedView>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </ThemedView>
      <ThemedView style={styles.categoryContainer}>
        {filteredContent?.map((content) => (
          <Card key={content.id}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: content.image }}
                resizeMode="cover"
                style={{ height: "100%", borderRadius: 10 }}
              />
            </View>
            <Text style={{ color: "#fff", marginVertical: 2 }}>
              {content.content}
            </Text>
          </Card>
        ))}
      </ThemedView>

      {/* <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  imageContainer: {
    height: 100,
    width: "100%",
    borderRadius: 10,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  categoryContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  image: {
    width: "100%",
    height: 300, // Ajusta el tamaño según sea necesario
    resizeMode: "cover",
  },
  sliderContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
