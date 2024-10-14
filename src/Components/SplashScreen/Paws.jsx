import { View, StyleSheet } from "react-native-web";
import Paws from '../../assets/img/PawPrints.png';
import { Image } from 'react-bootstrap';

function Paw() {
    return (
        <View style={styles.container}>
            <div>
                <Image
                    style={styles.paw}
                    src={Paws} 
                />
            </div>
                <Image
                    style={styles.paw1}
                    src={Paws}
                />
                <Image
                    style={styles.paw2}
                    src={Paws}
                />
            <div>
                <Image
                    style={styles.paw3}
                    src={Paws}
                />
                <Image
                    style={styles.paw4}
                    src={Paws}
                />
                <Image
                    style={styles.paw5}
                    src={Paws}
                />
            </div>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F3E9EC",
        width: "100%",
        height: "100vh",
        padding: 10,
    },
    paw: {
        marginLeft: 40,
        width: 40,
        height: 40,
        backgroundColor: "#F3E9EC",
    },
    paw1: {
        marginLeft: 0,
        width: 40,
        height: 40,
        backgroundColor: "#F3E9EC",
    },
    paw2: {
        marginRight: 60,
        width: 40,
        height: 40,
        backgroundColor: "#F3E9EC",
    },
    paw3: {
        width: 30,
        height: 30,
        backgroundColor: "#F3E9EC",
    },
    paw4: {
        marginLeft: 10,
        width: 40,
        height: 40,
        backgroundColor: "#F3E9EC",
    },
    paw5: {
        marginRight: 200,
        marginLeft: 20,
        width: 40,
        height: 40,
        backgroundColor: "#F3E9EC",
    },
});

export default Paw;