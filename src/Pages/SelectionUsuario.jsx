import React from 'react';
import { View, StyleSheet, Text } from "react-native-web";
import { Image } from 'react-bootstrap';
import sectionImg from '../assets/img/Asset01.png';
import UserMascotero from '../assets/img/UserMascotero.png';
import UserProtectors from '../assets/img/UserProtectors.png';
import asset1 from '../assets/img/Asset@4x.png';
import asset from '../assets/img/Asset-blanco@4x.png';

const SelectionUsuario = () => {
  return (
    <>
      <View style={styles.container}>
        <Image 
          src={sectionImg} 
          style={styles.backgroundImage} 
          resizeMode="contain"
        />

        <View style={styles.imageContainer}>
          <input
            type='image'
            src={UserMascotero} 
            style={styles.overlayImage} 
            resizeMode="contain"
          />
          <Image 
            src={asset1}
            style={styles.imageAsset} 
            resizeMode="contain"
        />
          <Text style={styles.imageText}>Mascotero</Text>
        </View>

        <View style={styles.imageContainer1}>
          <input
            type="image" 
            src={UserProtectors} 
            style={styles.overlayImage} 
            resizeMode="contain"
          />
          <Image 
            src={asset} 
            style={styles.imageAsset1} 
            resizeMode="contain"
          />
          <Text style={styles.imageText}>Protectora</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '70px',
    marginBottom: '240px',
  },
  imageContainer1: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 280,
    paddingRight: '110px',
  },
  overlayImage: {
    width: 150,
    height: 150,
    objectFit: 'contain',
  },
  imageText: {
    fontSize: 18,
    color: '#000',
    width: '85px',
    height: '24px',
    gap: '0px',
    opacity: '0px',
  },

  imageAsset: {
    position: 'absolute',
    width: '45%',
    height: '45%',
    objectFit: 'contain',
    paddingTop: '50px',
  },

  imageAsset1: {
    position: 'absolute',
    width: '45%',
    height: '45%',
    objectFit: 'contain',
    paddingTop: '50px',
  }
});

export default SelectionUsuario;