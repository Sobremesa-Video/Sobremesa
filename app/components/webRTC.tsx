import { useEffect, useState } from "react";

export default function useWebRTC() {
  const [pc, setPc] = useState<RTCPeerConnection | null>(null);
  const [mediaStream, setStream] = useState<MediaStream | undefined>(undefined)

  function createOffer() {
    pc?.createOffer().then(d => {
      pc.setLocalDescription(d);
    })
  }

  async function sendLocal(fallback:RTCPeerConnection) {
    let response;
    if (pc != null) {
      response = await fetch("http://localhost:8080/getStream/0", {
        // mode: "no-cors",
        method: "POST",
        body: btoa(JSON.stringify(pc?.localDescription),),
      })
    } else {
      response = await fetch("http://localhost:8080/getStream/0", {
        // mode: "no-cors",
        method: "POST",
        body: btoa(JSON.stringify(fallback.localDescription),),
      })
    }

    const text = await response.text()
    setRemoteDescription(text, fallback)
  }

  function setRemoteDescription(val:string, fallback:RTCPeerConnection) {
    try {
      if (pc === null) {
        fallback.setRemoteDescription(JSON.parse(atob(val)));
      } else {
        pc.setRemoteDescription(JSON.parse(atob(val)));
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && "RTCPeerConnection" in window) {

      const newPc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      setPc(newPc)

      if (newPc !== null) {

        newPc.onicecandidate = event => {
          if (event.candidate === null) {
            sendLocal(newPc)
          }
        }

        newPc.addTransceiver('video')
        newPc.createOffer()
            .then(d => newPc.setLocalDescription(d))


        newPc.ontrack = function (event) {
          setStream(event.streams[0]);
        }
      }
    }
    return () => {
      pc?.close(); // Clean up the peer connection on unmount
    };
  }, []);

  return {mediaStream, createOffer, setRemoteDescription };
}
