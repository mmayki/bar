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
    name: "Мак якутский",
    latin: "Papaver jacuticum",
    image: require("../../app/assets/flowers/1111.png"),
    description: "Небольшое растение с белыми лепестками и жёлтой серединкой.",
    habitat: "Каменистые осыпи, подножья величественных скал.",
    flowering: "Июнь — июль",
    fact: "Иваудивительный эндемик Якутии, способный выживать на сухих галечниках в условиях экстремального холода.",
  },
  {
    id: "2",
    name: "Адонис сибирский",
    latin: "Adonis sibirica",
    image: require("../../app/assets/flowers/1112.png"),
    description: "Маленькое растение с яркими золотисто-жёлтыми лепестками.",
    habitat: "Светлые леса, опушки, поляна, кустарники и долины рек.",
    flowering: "Май — июнь",
    fact: "Содержит гликозиды поэтому ядовито, но при этом он используется в медицине для стимуляции работы сердца",
  },
  {
    id: "3",
    name: "Истод сибириский",
    latin: "Polygala sibirica",
    image: require("../../app/assets/flowers/1113.png"),
    description:
      "Растение длинною 10-20см в высоту с сине-фиолетовыми цветками",
    habitat: "Степные леса, лесостепные леса, горные районы",
    flowering: "Май - июль",
    fact: "Содержит большое количество сапонинов, приминяется в касмотике и прафилактическом лечении.",
  },
  {
    id: "4",
    name: "Крашенинниковя ленская",
    latin: "Krascheninnikovia lenensis",
    image: require("../../app/assets/flowers/1114.png"),
    description:
      "редкий локальный эндемик Центральной Якутии, приспособленный к суровым скальным условиям.",
    habitat: "Берег реки и сырые леса",
    flowering: "Июль - август",
    fact: "Его особенность заключается в том что у него нет лепестков, вместо их у него чашечки и волоски",
  },
  {
    id: "5",
    name: "Башмачок пятнистый",
    latin: "Cypripedium guttatum",
    image: require("../../app/assets/flowers/1115.png"),
    description:
      "один из самых распространенных здесь охраняемых видов. Его белые лепестки покрыты контрастными крупными фиолетово-розовыми крапинами.",
    habitat:
      "Негустые хвойные, лиственные, смешанные леса, лесные опушки, кустарники.",
    flowering: "Июнь - июль.",
    fact: "Один из самых зимостойких видов орхидей в мире.",
  },
  {
    id: "6",
    name: "Башмачок настоящий",
    latin: "Cypripedium calceolus",
    image: require("../../app/assets/flowers/1116.png"),
    description:
      "знаменитая европейско-азиатская орхидея с характерной раздутой ярко-желтой «губой» и темно-пурпурными чашелистиками.",
    habitat: "Светлые лиственные, смешанные, хвойно-широколиственные леса.",
    flowering: "Май - июнь",
    fact: "Редкий вид орхидеи, растёт крайне медленно от 10 до 15 лет.",
  },
  {
    id: "7",
    name: "Калипсо клубневая",
    latin: "Calypso bulbosa",
    image: require("../../app/assets/flowers/1117.png"),
    description:
      "рошечная и исключительно редкая лесная орхидея. Нежно-розовый цветок занесен в Федеральную Красную книгу России.",
    habitat: "Тенистые, сырые, зеленомошные хвойные леса.",
    flowering: "Май - июнь.",
    fact: "его не существует",
  },
  {
    id: "8",
    name: "Дельфиниум (живокость) крупноцветковый",
    latin: "Delphinium grandiflorum",
    image: require("../../app/assets/flowers/1118.png"),
    description:
      "травянистое растение с невероятно насыщенными синими, ультрамариновыми соцветиями, украшающее каменистые луга.",
    habitat: "Тенистые, сырые, зеленомошные хвойные леса.",
    flowering: "Май - июнь.",
    fact: "красивое, но полностью ядовитое растение: все его части (особенно корни и семена) содержат токсичные алкалоиды, которые могут вызывать паралич нервной системы.",
  },
  {
    id: "9",
    name: "Ирис гладкий",
    latin: "Iris laevigata",
    image: require("../../app/assets/flowers/1119.png"),
    description:
      "изящное прибрежно-водное растение с глубокими сине-фиолетовыми бутонами.",
    habitat: "Тенистые, сырые, зеленомошные хвойные леса.",
    flowering: "Май - июнь.",
    fact: "красивое, но полностью ядовитое растение: все его части (особенно корни и семена) содержат токсичные алкалоиды, которые могут вызывать паралич нервной системы.",
  },
  {
    id: "10",
    name: "Кувшинка четырехгранная",
    latin: "Delphinium grandiflorum",
    image: require("../../app/assets/flowers/1120.png"),
    description:
      "травянистое растение с невероятно насыщенными синими, ультрамариновыми соцветиями, украшающее каменистые луга.",
    habitat: "Тенистые, сырые, зеленомошные хвойные леса.",
    flowering: "Май - июнь.",
    fact: "красивое, но полностью ядовитое растение: все его части (особенно корни и семена) содержат токсичные алкалоиды, которые могут вызывать паралич нервной системы.",
  },
  {
    id: "11",
    name: "Постенница мелкоцветная",
    latin: "Delphinium grandiflorum",
    image: require("../../app/assets/flowers/1121.png"),
    description:
      "травянистое растение с невероятно насыщенными синими, ультрамариновыми соцветиями, украшающее каменистые луга.",
    habitat: "Тенистые, сырые, зеленомошные хвойные леса.",
    flowering: "Май - июнь.",
    fact: "красивое, но полностью ядовитое растение: все его части (особенно корни и семена) содержат токсичные алкалоиды, которые могут вызывать паралич нервной системы.",
  },
  {
    id: "12",
    name: "Вздутоплодник сибирский",
    latin: "Delphinium grandiflorum",
    image: require("../../app/assets/flowers/1122.png"),
    description:
      "травянистое растение с невероятно насыщенными синими, ультрамариновыми соцветиями, украшающее каменистые луга.",
    habitat: "Тенистые, сырые, зеленомошные хвойные леса.",
    flowering: "Май - июнь.",
    fact: "красивое, но полностью ядовитое растение: все его части (особенно корни и семена) содержат токсичные алкалоиды, которые могут вызывать паралич нервной системы.",
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
