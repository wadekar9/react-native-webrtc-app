//JoinScreen.js

import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, Button, View} from 'react-native';

import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
  MediaStream,
} from 'react-native-webrtc';
import CallActionBox from '../components/CallActionBox';
import firestore from '@react-native-firebase/firestore';

const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function JoinScreen({roomId, screens, setScreen}) {
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [cachedLocalPC, setCachedLocalPC] = useState();

  const [isMuted, setIsMuted] = useState(false);
  const [isOffCam, setIsOffCam] = useState(false);

  //Automatically start stream
  useEffect(() => {
    startLocalStream();
  }, []);
  useEffect(() => {
    if (localStream) {
      joinCall(roomId);
    }
  }, [localStream]);

  //End call button
  async function endCall() {
    if (cachedLocalPC) {
      const senders = cachedLocalPC.getSenders();
      senders.forEach(sender => {
        cachedLocalPC.removeTrack(sender);
      });
      cachedLocalPC.close();
    }

    await firestore().collection('rooms').doc(roomId).update({
      answer: '00',
      connected: false,
    });
    // await updateDoc(roomRef, { answer: deleteField(), connected: false });

    setLocalStream();
    setRemoteStream(); // set remoteStream to null or empty when callee leaves the call
    setCachedLocalPC();
    // cleanup
    setScreen(screens.ROOM); //go back to room screen
  }

  //start local webcam on your device
  const startLocalStream = async () => {
    // isFront will determine if the initial camera should face user or environment
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? 'front' : 'environment';
    const videoSourceId = devices.find(
      device => device.kind === 'videoinput' && device.facing === facing,
    );
    const facingMode = isFront ? 'user' : 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
  };

  //join call function
  const joinCall = async id => {
    const COLLECTION_REF = firestore().collection('rooms').doc(id);

    const roomSnapshot = await COLLECTION_REF.get();

    if (!roomSnapshot.exists()) return;
    const localPC = new RTCPeerConnection(configuration);
    localStream.getTracks().forEach(track => {
      localPC.addTrack(track, localStream);
    });

    const callerCandidatesCollection =
      firestore().collection('callerCandidates');
    const calleeCandidatesCollection =
      firestore().collection('calleeCandidates');

    localPC.addEventListener('icecandidate', e => {
      if (!e.candidate) {
        console.log('Got final candidate!');
        return;
      }
      calleeCandidatesCollection.add(e.candidate.toJSON());
    });

    localPC.ontrack = e => {
      const newStream = new MediaStream();
      e.streams[0].getTracks().forEach(track => {
        newStream.addTrack(track);
      });
      setRemoteStream(newStream);
    };

    const offer = roomSnapshot.data().offer;
    await localPC.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await localPC.createAnswer();
    await localPC.setLocalDescription(answer);

    await firestore()
      .collection('rooms')
      .doc(id)
      .update({answer, connected: true});

    callerCandidatesCollection.onSnapshot(
      snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            let data = change.doc.data();
            localPC.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      },
      err => {
        console.log(err);
      },
    );

    COLLECTION_REF.onSnapshot(
      doc => {
        const data = doc.data();
        if (!data.answer) {
          setScreen(screens.ROOM);
        }
      },
      err => {
        console.log(err);
      },
    );

    setCachedLocalPC(localPC);
  };

  const switchCamera = () => {
    localStream.getVideoTracks().forEach(track => track._switchCamera());
  };

  // Mutes the local's outgoing audio
  const toggleMute = () => {
    if (!remoteStream) {
      return;
    }
    localStream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  const toggleCamera = () => {
    localStream.getVideoTracks().forEach(track => {
      track.enabled = !track.enabled;
      setIsOffCam(!isOffCam);
    });
  };

  return (
    <View className="flex-1">
      <RTCView
        className="flex-1"
        streamURL={remoteStream && remoteStream.toURL()}
        objectFit={'cover'}
      />

      {remoteStream && !isOffCam && (
        <RTCView
          className="w-32 h-48 absolute right-6 top-8"
          streamURL={localStream && localStream.toURL()}
        />
      )}
      <View className="absolute bottom-0 w-full">
        <CallActionBox
          switchCamera={switchCamera}
          toggleMute={toggleMute}
          toggleCamera={toggleCamera}
          endCall={endCall}
        />
      </View>
    </View>
  );
}
