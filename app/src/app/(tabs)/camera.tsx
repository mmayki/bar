import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from "react-native";
import * as MediaLibrary from "expo-media-library"; 
export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [libraryPermission, requestLibraryPermission] =
    MediaLibrary.usePermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);

  
  if (!cameraPermission || !libraryPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Приложению требуется разрешение на использование камеры.
        </Text>
        <Button
          onPress={requestCameraPermission}
          title="Предоставить доступ к камере"
        />
      </View>
    );
  }


  if (!libraryPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Приложению требуется доступ к галерее для сохранения снимков.
        </Text>
        <Button
          onPress={requestLibraryPermission}
          title="Предоставить доступ к галерее"
        />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo?.uri) {
          setPhotoUri(photo.uri);

          await MediaLibrary.saveToLibraryAsync(photo.uri);
          Alert.alert("Успешно", "Фотография сохранена в галерею!");
        }
      } catch (e) {
        console.error("Ошибка при съемке или сохранении:", e);
        Alert.alert("Ошибка", "Не удалось сохранить фотографию");
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.text}>Snap</Text>
        </TouchableOpacity>
      </View>

      {photoUri && <Image source={{ uri: photoUri }} style={styles.preview} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  message: {
    textAlign: "center",
    paddingBottom: 15,
    paddingHorizontal: 30,
    color: "#fff",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 64,
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 32,
  },
  button: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  preview: {
    position: "absolute",
    bottom: 160,
    left: 42,
    width: 80,
    height: 120,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
  },
});
