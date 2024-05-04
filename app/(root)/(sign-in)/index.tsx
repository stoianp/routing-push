import { useSession } from "@/providers/AuthProvider";
import { router } from "expo-router";
import { View, Text } from "react-native";

router.replace('/(root)/(sign-in)/login');

export default function Navigator() {
    const { session, isLoading } = useSession();

    return (
        <View>
            <Text>Sign in screen!</Text>
        </View>
    )
}