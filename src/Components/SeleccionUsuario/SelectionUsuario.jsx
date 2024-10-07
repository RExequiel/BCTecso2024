import React from 'react';
import { View, StyleSheet } from "react-native-web";
import sectionImg from '../../assets/img/Asset01.png';
import UserMascotero from '../../assets/img/UserMascotero.png';
import UserProtectors from '../../assets/img/UserProtectors.png';

const SelectionUsuario = () => {
  return (
    <>
    <View style={styles.container}>

      <img 
        src={sectionImg} 
        style={styles.backgroundImage} 
        resizeMode="contain"
      />

      <input
        type='image'
        src={UserMascotero} 
        style={styles.overlayImage1} 
        resizeMode="contain"
      />
      
      <input
        type="image" 
        src={UserProtectors} 
        style={styles.overlayImage2} 
        resizeMode="contain"
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '80vw',
    height: '80vh',
    overflow: 'hidden',
    marginTop: '40px'
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  overlayImage1: {
    position: 'absolute',
    top: '30%',
    left: '30%',
    width: 120,
    height: 120,
    objectFit: 'contain',
  },
  overlayImage2: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translateX(-50%)', 
    width: 120,
    height: 120,
    objectFit: 'contain',
  }
});

export default SelectionUsuario;
