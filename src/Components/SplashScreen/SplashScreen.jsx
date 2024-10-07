import { View, StyleSheet } from "react-native-web";
import SplashScreenImage from '../../assets/img/SplashScreen.png';

function SplashScreen() {
    return (
        <View style={styles.container}>
            <img 
                src={SplashScreenImage} 
                style={styles.image} 
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3E9EC",
        padding: 20,
    },
    image: {
        width: "100%",
        maxWidth: "300px",
        height: "auto",
        objectFit: "contain",
        margin: "0 auto",
    },
});

export default SplashScreen;