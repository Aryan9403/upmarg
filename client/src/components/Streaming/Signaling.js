// SignalingService.js
class SignalingService {
    constructor(wsUrl) {
      this.ws = new WebSocket(wsUrl);
      this.pc = new RTCPeerConnection();
      this.setupWebSocket();
      this.setupPeerConnection();
    }
  
    setupWebSocket() {
      this.ws.onmessage = async (message) => {
        const data = JSON.parse(message.data);
  
        switch (data.type) {
          case 'offer':
            await this.handleOffer(data.offer);
            break;
          case 'answer':
            await this.handleAnswer(data.answer);
            break;
          case 'ice-candidate':
            await this.handleIceCandidate(data.candidate);
            break;
          default:
            console.log('Unknown message type:', data.type);
        }
      };
    }
  
    setupPeerConnection() {
      this.pc.onicecandidate = ({ candidate }) => {
        if (candidate) {
          this.ws.send(JSON.stringify({ type: 'ice-candidate', candidate }));
        }
      };
    }
  
    async handleOffer(offer) {
      await this.pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answer);
      this.ws.send(JSON.stringify({ type: 'answer', answer }));
    }
  
    async handleAnswer(answer) {
      await this.pc.setRemoteDescription(new RTCSessionDescription(answer));
    }
  
    async handleIceCandidate(candidate) {
      if (candidate) {
        await this.pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    }
  
    // Additional methods for sending offers, handling media streams, etc.
  }
  
  export default SignalingService;
  