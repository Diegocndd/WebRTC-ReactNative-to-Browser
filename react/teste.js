import React, { Component } from 'react';
import { Platform } from 'react-native';
import {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  mediaDevices,
  MediaStreamDescription,
  getUserMeadia,
} from 'react-native-webrtc';

let URL = "";

const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
const pc = new RTCPeerConnection(configuration);
const isFront = true;
mediaDevices.enumerateDevices().then(sourceInfos => {
  console.log('mediaDevices.getSources', sourceInfos);
  let videoSourceId;
  for (let i = 0; i < sourceInfos.length; i++) {
    const sourceInfo = sourceInfos[i];
    if (
      sourceInfo.kind === 'videoinput' &&
      sourceInfo.facing === (isFront ? 'front' : 'environment')
    ) {
      videoSourceId = sourceInfo.deviceId;
    }
  }
  mediaDevices
    .getUserMedia({
      audio: true,
      video:
        Platform.OS === 'ios'
          ? false
          : {
              width: 640,
              height: 480,
              frameRate: 30,
              facingMode: isFront ? 'user' : 'environment',
              deviceId: videoSourceId,
            },
    })
    .then(stream => {
      console.log('lll', stream.toURL());
      URL = stream.toURL();
      pc.addStream(stream);
    })
    .catch(error => {
      console.log('Oops, we getting error: ', error);
      throw error;
    });

  pc.createOffer().then(desc => {
    pc.setLocalDescription(desc).then(() => {
      // Send pc.localDescription to peer
    });
  });

  pc.onicecandidate = function (event) {
    // send event.candidate to peer
    console.log('onicecandidate', event);
  };
});

class App extends Component {
  state = {
    videoUrl: null,
    isFront: true,
  };

  render() {
    console.log('kk', URL)
    return <RTCView streamURL={'7de11f01-a1cb-447c-9dce-24ac120b6fcc'} style={styles.container} />;
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderColor: '#000',
  },
};

export default App;