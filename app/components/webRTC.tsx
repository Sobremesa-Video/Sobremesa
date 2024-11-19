import { useEffect, useState } from "react";

export default function useWebRTC() {
  const [pc, setPc] = useState<RTCPeerConnection | null>(null);
  const [mediaStream, setStream] = useState<MediaStream | undefined>(undefined)

  function createOffer() {
    console.log("AAAH")
  }

  function setRemoteDescription(val:string) {
    console.log("MORE AAAH")
  }

  useEffect(() => {
    if (typeof window !== "undefined" && "RTCPeerConnection" in window) {
      const newPc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      newPc.ontrack = function (event) {
        setStream(event.streams[0]);
      }

      setPc(newPc);

    }
    return () => {
      pc?.close(); // Clean up the peer connection on unmount
    };
  }, []);

  return {mediaStream, createOffer, setRemoteDescription };
}
