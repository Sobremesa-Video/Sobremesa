import { useEffect, useState } from "react";

export default function useWebRTC() {
  const [pc, setPc] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "RTCPeerConnection" in window) {
      const newPc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
      setPc(newPc);
    }
    return () => {
      pc?.close(); // Clean up the peer connection on unmount
    };
  }, []);

  return { pc };
}
