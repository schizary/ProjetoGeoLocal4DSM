import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, Image, Button } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Camera from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function CameraPage() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);
  


}
