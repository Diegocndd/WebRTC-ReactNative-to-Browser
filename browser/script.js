socket
      .on('connect', _ => socket.emit('watcher'))
      .on('offer', async (id, desc) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        peer = new RTCPeerConnection(config);
        peer
          .setRemoteDescription(new RTCSessionDescription(desc))
          .then(_ => peer.createAnswer())
          .then(sdp => peer.setLocalDescription(sdp))
          .then(_ => socket.emit('answer', id, peer.localDescription));
        peer.onicecandidate = e => {
          console.log(e);
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