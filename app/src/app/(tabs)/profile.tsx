import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import ac1 from "../../app/assets/achievements/ac1.png";
import ac2 from "../../app/assets/achievements/ac2.png";
import ac3 from "../../app/assets/achievements/ac3.png";
import ac4 from "../../app/assets/achievements/ac4.png";
import ac5 from "../../app/assets/achievements/ac5.png";
import ac6 from "../../app/assets/achievements/ac6.png";
import ac7 from "../../app/assets/achievements/ac7.png";
import ac8 from "../../app/assets/achievements/ac8.png";
import locked from "../../app/assets/achievements/locked.png";

export default function ProfileScreen() {
  const [avatar, setAvatar] = useState(null);
  const [nickname, setNickname] = useState("Новый пользователь");
  const [isEditing, setIsEditing] = useState(false);
  const [draftNick, setDraftNick] = useState(nickname);

  const achievements = [
    { id: 1, icon: ac1, title: "Первое распознавание", unlocked: true },
    { id: 2, icon: ac2, title: "Узнал редкий вид", unlocked: true },
    {
      id: 3,
      icon: ac3,
      title: "Исследователь ленских столбов",
      unlocked: false,
    },
    { id: 4, icon: ac4, title: "Знаток флоры", unlocked: false },
    { id: 5, icon: ac5, title: "Фотограф-натуралист", unlocked: false },
    { id: 6, icon: ac6, title: "Сохраняем вместе", unlocked: false },
    { id: 7, icon: ac7, title: "Легенда Ленских столбов", unlocked: false },
    { id: 8, icon: ac8, title: "Цветочный эксперт", unlocked: false },
    { id: 9, icon: locked, title: "Сектретное достижение", unlocked: false },
  ];

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Нужно разрешение", "Разреши доступ к галерее в настройках.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const saveNickname = () => {
    if (draftNick.trim().length === 0) {
      Alert.alert("Ошибка", "Ник не может быть пустым");
      return;
    }
    setNickname(draftNick.trim());
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setDraftNick(nickname);
    setIsEditing(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={pickImage} style={styles.avatarWrapper}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarPlaceholderText}>+</Text>
          </View>
        )}
        <View style={styles.cameraBadge}>
          <Text style={styles.cameraBadgeText}>📷</Text>
        </View>
      </Pressable>

      <Text style={styles.hint}>Нажми на аватар, чтобы сменить</Text>

      <View style={styles.nickBlock}>
        {isEditing ? (
          <>
            <TextInput
              value={draftNick}
              onChangeText={setDraftNick}
              style={styles.input}
              placeholder="Введи ник"
              autoFocus
              maxLength={20}
            />
            <View style={styles.editRow}>
              <Pressable
                onPress={saveNickname}
                style={[styles.smallBtn, styles.saveBtn]}
              >
                <Text style={styles.smallBtnText}>Сохранить</Text>
              </Pressable>
              <Pressable
                onPress={cancelEditing}
                style={[styles.smallBtn, styles.cancelBtn]}
              >
                <Text style={styles.smallBtnText}>Отмена</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.nickname}>{nickname}</Text>
            <Pressable
              onPress={() => setIsEditing(true)}
              style={styles.editBtn}
            >
              <Text style={styles.editBtnText}>Изменить ник</Text>
            </Pressable>
          </>
        )}
      </View>

      <Text style={styles.sectionTitle}>Достижения</Text>
      <View style={styles.achievementsGrid}>
        {achievements.map((item) => (
          <View
            key={item.id}
            style={[
              styles.achievement,
              !item.unlocked && styles.achievementLocked,
            ]}
          >
            <Image source={item.icon} style={styles.achievementIcon} />
            <Text
              style={[
                styles.achievementTitle,
                !item.unlocked && styles.achievementTitleLocked,
              ]}
            >
              {item.title}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "#fff",
    flexGrow: 1,
  },

  avatarWrapper: {
    marginTop: 20,
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eee",
  },
  avatarPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
  },
  avatarPlaceholderText: {
    fontSize: 40,
    color: "#ccc",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#d0c9f1",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  cameraBadgeText: {
    fontSize: 16,
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: "#999",
  },

  nickBlock: {
    marginTop: 24,
    alignItems: "center",
    width: "100%",
  },
  nickname: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2D3436",
  },
  editBtn: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#F1F0FF",
  },
  editBtnText: {
    color: "#8a7def",
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    textAlign: "center",
  },
  editRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  smallBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveBtn: {
    backgroundColor: "#6C5CE7",
  },
  cancelBtn: {
    backgroundColor: "#B2BEC3",
  },
  smallBtnText: {
    color: "#fff",
    fontWeight: "600",
  },

  sectionTitle: {
    marginTop: 32,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "700",
    alignSelf: "flex-start",
    color: "#2D3436",
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
    width: "100%",
  },
  achievement: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "#F8F7FF",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#E8E6FF",
  },
  achievementLocked: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E0E0E0",
    opacity: 0.7,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    marginBottom: 6,
    resizeMode: "contain",
  },
  achievementTitle: {
    fontSize: 11,
    textAlign: "center",
    color: "#2D3436",
    fontWeight: "600",
  },
  achievementTitleLocked: {
    color: "#999",
  },
});
