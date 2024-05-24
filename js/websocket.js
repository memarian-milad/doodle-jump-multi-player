class WebSocketManager {
	constructor(url) {
		this.url = url;
		this.ws = new WebSocket(this.url);
		this.setupWebSocket();
		this.onMessageCallback = null;
	}

	setupWebSocket() {
		this.ws.onopen = () => {
			console.log('WebSocket connection established');
		};

		this.ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (this.onMessageCallback) {
				this.onMessageCallback(data);
			}
		};

		this.ws.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		this.ws.onclose = () => {
			console.log('WebSocket connection closed');
		};
	}

	onMessage(callback) {
		this.onMessageCallback = callback;
	}

	sendGameState(data) {
		if (this.ws.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(data));
			return true;
		}
		return false;
	}
}
