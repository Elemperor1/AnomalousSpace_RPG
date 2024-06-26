define([
	'socket',
	'js/library/events'
], function (
	io,
	events
) {
    return {
        doneConnect: false,

        init: function (cb) {
            this.socket = io({
                transports: ['websocket']
            });

            this.socket.on('connect', this.onConnected.bind(this, cb));
			this.socket.on('handshake', this.onHandshake.bind(this));
			this.socket.on('dc', this.onDisconnect.bind(this));

			events.emit('onBuildIngameUis');
        },
        onConnected: function (cb) {
			if (this.doneConnect)
				this.onDisconnect();
			else
				this.doneConnect = true;

			if (cb)
				cb();
		},
        onDisconnect: function () {
			window.location = window.location;
		},
        onHandshake: function () {
			console.log('handshake initiated')
			this.socket.emit('handshake');
		},
		request: function (msg) {
			this.socket.emit('request', msg, msg.callback);
		},
    }
})