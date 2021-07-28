import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, View, Button} from 'react-native';
import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  RTCView,
  mediaDevices,
} from 'react-native-webrtc';
import io from 'socket.io-client';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default WebRTCWatch = _ => {
  let socket, peer;
  let config = {
    iceServers: [
      {urls: 'stun:stun.services.mozilla.com'},
      {urls: 'stun:stun.l.google.com:19302'},
    ],
  };

  const [remoteStream, setRemoteStream] = useState();
  const [localStream, setLocalStream] = useState();
  let clients = {};

  const remote = () => {
    socket = io();
    socket
      .on('connect', _ => socket.emit('watcher'))
      .on('offer', async (id, desc) => {
        peer = new RTCPeerConnection(config);
        peer
          .setRemoteDescription(new RTCSessionDescription(desc))
          .then(_ => peer.createAnswer())
          .then(sdp => peer.setLocalDescription(sdp))
          .then(_ => socket.emit('answer', id, peer.localDescription));
        peer.onicecandidate = e => {
          e.candidate && socket.emit('candidate', id, e.candidate);
        };
        peer.onaddstream = e =>
          e.stream && remoteStream !== e.stream && setRemoteStream(e.stream);
      })
      .on('candidate', (id, candidate) =>
        peer.addIceCandidate(new RTCIceCandidate(candidate)),
      )
      .on('disconnectPeer', _ => {
        peer.close();
        socket.disconnect(true);
      });
  };

  const broadcast = async _ => {
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    socket = io('http://192.168.15.3:4000');
    socket
      .on('connect', _ => socket.emit('broadcaster'))
      .emit('watcher')
      .on('watcher', id => {
        peer = new RTCPeerConnection(config);
        clients[id] = peer;
        peer.addStream(stream);
        peer
          .createOffer()
          .then(sdp => peer.setLocalDescription(sdp))
          .then(_ => socket.emit('offer', id, peer.localDescription));
        peer.onicecandidate = e =>
          e.candidate && socket.emit('candidate', id, e.candidate);
      })
      .on('answer', (id, desc) =>
        clients[id].setRemoteDescription(new RTCSessionDescription(desc)),
      )
      .on('candidate', (id, candidate) =>
        clients[id].addIceCandidate(new RTCIceCandidate(candidate)),
      )
      .on('disconnectPeer', id => {
        const client = clients[id];

        if (client) {
          clients[id].close();
          delete clients[id];
        }
      });

    setLocalStream(stream);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {(localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            zIndex={0}
            objectFit={'cover'}
            style={styles.fullScreen}
          />
        )) || <Button title="INICIAR TRANSMISSÃO" onPress={_ => broadcast()} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
  },
});
