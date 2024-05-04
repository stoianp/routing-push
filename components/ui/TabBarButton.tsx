import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function TabBarButton({
  children,
  onPress,
}: BottomTabBarButtonProps) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    shadowRadius: 4,
    shadowOpacity: 0.02,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.gray50
  },
  touchable: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: GlobalStyles.colors.primary500,
  },
});
