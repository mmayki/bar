import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Modal,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";

const flowers = [
  {
    id: "1",
    name: "Иван-чай",
    latin: "Chamaenerion angustifolium",
    image: require("../../app/assets/flowers/1111.png"),
    description:
      "Многолетнее растение с яркими розово-пурпурными цветами. Часто образует большие заросли на открытых пространствах.",
    habitat: "Лесные опушки, поляны, вырубки и берега водоёмов.",
    flowering: "Июнь — август",
    fact: "Иван-чай привлекает пчёл и других насекомых-опылителей.",
  },
  {
    id: "2",
    name: "Якутский мак",
    latin: "Matricaria chamomilla",
    image: require("../../app/assets/flowers/1112.png"),
    description: "Небольшое растение с белыми лепестками и жёлтой серединкой.",
    habitat: "Луга, поля, обочины дорог.",
    flowering: "Май — сентябрь",
    fact: "Соцветие ромашки состоит из множества мелких цветков.",
  },
  {
    id: "3",
    name: "Василёк",
    latin: "Centaurea cyanus",
    image: require("../../app/assets/flowers/1113.png"),
    description:
      "Полевой цветок с яркими синими соцветиями, знакомый по летним лугам.",
    habitat: "Луга, поля и открытые солнечные места.",
    flowering: "Июнь — август",
    fact: "Васильки часто встречаются среди злаковых растений.",
  },
  {
    id: "4",
    name: "Мак",
    latin: "Papaver",
    image: require("../../app/assets/flowers/1114.png"),
    description: "Цветок с тонкими лепестками и 1114 серединкой.",
    habitat: "Луга, поля и солнечные открытые участки.",
    flowering: "Весна — лето, в зависимости от вида",
    fact: "Лепестки мака очень тонкие и легко колышутся на ветру.",
  },
  {
    id: "5",
    name: "Лилия",
    latin: "Lilium",
    image: require("../../app/assets/flowers/1115.png"),
    description: "Многолетнее растение с крупными декоративными цветками.",
    habitat: "Лесные поляны и сады; зависит от вида.",
    flowering: "Обычно лето",
    fact: "У разных видов лилий сильно различаются форма и окраска цветков.",
  },
];

export default function GalleryScreen() {
  const [selectedFlower, setSelectedFlower] = useState<
    (typeof flowers)[number] | null
  >(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerIcon}>❀</Text>
        <Text style={styles.headerTitle}>Галерея</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {flowers.map((flower) => (
            <Pressable
              key={flower.id}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() => setSelectedFlower(flower)}
            >
              <Image
                source={flower.image}
                style={styles.flowerImage}
                resizeMode="cover"
              />

              <Text style={styles.flowerName} numberOfLines={2}>
                {flower.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={selectedFlower !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedFlower(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setSelectedFlower(null)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>

            {selectedFlower && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.detailsContent}
              >
                <Image
                  source={selectedFlower.image}
                  style={styles.detailsImage}
                  resizeMode="cover"
                />

                <Text style={styles.detailsTitle}>{selectedFlower.name}</Text>

                <Text style={styles.latinName}>{selectedFlower.latin}</Text>

                <Text style={styles.sectionTitle}>Описание</Text>
                <Text style={styles.detailsText}>
                  {selectedFlower.description}
                </Text>

                <Text style={styles.sectionTitle}>Где растёт</Text>
                <Text style={styles.detailsText}>{selectedFlower.habitat}</Text>

                <Text style={styles.sectionTitle}>Период цветения</Text>
                <Text style={styles.detailsText}>
                  {selectedFlower.flowering}
                </Text>

                <View style={styles.factBox}>
                  <Text style={styles.factTitle}>🌿 Интересный факт</Text>
                  <Text style={styles.detailsText}>{selectedFlower.fact}</Text>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#142317",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 12,
  },

  headerIcon: {
    color: "#FFFFFF",
    fontSize: 32,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontStyle: "italic",
    fontWeight: "500",
  },

  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 30,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "24%",
    marginBottom: 14,
    alignItems: "center",
    backgroundColor: "#202B20",
    borderRadius: 5,
    paddingBottom: 8,
    overflow: "hidden",
  },

  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },

  flowerImage: {
    width: "100%",
    aspectRatio: 0.82,
    backgroundColor: "#D9D9D9",
  },

  flowerName: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 2,
    paddingTop: 8,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  modalCard: {
    backgroundColor: "#18291C",
    height: "88%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },

  closeButton: {
    position: "absolute",
    zIndex: 2,
    right: 16,
    top: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },

  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },

  detailsContent: {
    padding: 20,
    paddingBottom: 40,
  },

  detailsImage: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    marginBottom: 18,
    backgroundColor: "#263629",
  },

  detailsTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },

  latinName: {
    color: "#A7C5A3",
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 5,
    marginBottom: 18,
  },

  sectionTitle: {
    color: "#D8EACD",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 6,
  },

  detailsText: {
    color: "#F0F2ED",
    fontSize: 15,
    lineHeight: 23,
  },

  factBox: {
    marginTop: 22,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#293D2A",
  },

  factTitle: {
    color: "#D8EACD",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
});
