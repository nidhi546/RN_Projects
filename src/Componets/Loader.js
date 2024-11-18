import React from 'react';
import { View, ActivityIndicator, Modal, StyleSheet ,Text} from 'react-native';
import LottieView from 'lottie-react-native';


const Loader = (props) => {
  const{text}=props
return(

  <Modal transparent={true} visible={true}>
    <View style={styles.container}>
      <LottieView style={{height:300,width:300}}
        source={require('../../assets/images/Animation - 1731922478115.json')}
        autoPlay
        loop
      />
    </View>
  </Modal>
)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  loaderBackground: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    margin:40

  },
});

export default Loader;