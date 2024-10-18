import { View, StyleSheet } from "react-native-web";
import SplashScreenImage from '../assets/img/icons/Logo-bajada@4x.png';
import Paw from '../Components/SplashScreen/Paws'
import { Image } from 'react-bootstrap';

function SplashScreen() {
    return (
        <>
        <div>
            <View>
                <Paw />
            </View>
            
            <View style={styles.container}>
                <Image 
                    src={SplashScreenImage} 
                    style={styles.image} 
                    // resizeMode="contain"
                />
            </View>
            </div>
        </>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3E9EC",
        width: "100%",
        height: "75vh",
    },
    image: {
        width: "50%",
        maxWidth: "250px",
        height: "auto",
        objectFit: "contain",
        margin: "0 auto",
    },
});

export default SplashScreen;