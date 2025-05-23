import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import { Platform } from 'react-native';

export const pickAndConvertFile = async () => {
  try {
    const res = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
    });

    const destPath = `${RNFS.TemporaryDirectoryPath}/${res.name}`;
    await RNFS.copyFile(res.uri, destPath);

    return {
      uri: Platform.OS === 'android' ? `file://${destPath}` : destPath,
      name: res.name,
      type: res.type || 'application/octet-stream',
    };
  } catch (err) {
    console.log("File pick error:", err);
    return null;
  }
};
