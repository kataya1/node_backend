const net = require('net');
const crypto = require('crypto');

// Generate a key for WebSocket handshakes
const WS_KEY = crypto.randomBytes(16).toString('base64');

// Create the WebSocket server
const server = net.createServer(socket => {
    console.log('New connection');

    // Handle incoming data
    let receivedData = '';
    socket.on('data', data => {
        receivedData += data.toString();

        // Check for WebSocket handshake request
        if (receivedData.indexOf('\r\n\r\n') !== -1) {
            const handshakeEndIndex = receivedData.indexOf('\r\n\r\n') + 4;
            const requestHeaders = receivedData.substring(0, handshakeEndIndex);
            receivedData = receivedData.substring(handshakeEndIndex);

            if (requestHeaders.indexOf('GET / HTTP/1.1\r\n') === 0) {
                // Validate handshake and extract key
                const lines = requestHeaders.split('\r\n');
                const reqKeyLine = lines.find(line => line.startsWith('Sec-WebSocket-Key:'))
                let reqKey
                if (reqKeyLine) {
                    reqKey = reqKeyLine.split(':')[1].trim();
                    // Rest of the code
                } else {
                    // Handle the case when the 'Sec-WebSocket-Key' header is missing
                    reqKey = ""
                }


                const expectedResKey = crypto
                    .createHash('sha1')
                    .update(reqKey + WS_KEY)
                    .digest('base64');

                console.log('reqKey', reqKey);
                console.log('Sending Sec-WebSocket-Accept:', expectedResKey);

                // Send response to complete handshake
                const response = [
                    'HTTP/1.1 101 Switching Protocols',
                    'Upgrade: websocket',
                    'Connection: Upgrade',
                    `Sec-WebSocket-Accept: ${expectedResKey}\r\n\r\n`
                ].join('\r\n');

                socket.write(response);

                // Handle incoming messages
                socket.on('data', data => {
                    const rawData = data.toString();
                    const opcode = rawData.charCodeAt(0) & 0xf;

                    // Continuation frame
                    if (opcode === 0) {
                        console.log('Received continuation frame:', rawData);
                    }
                    // Text frame
                    else if (opcode === 1) {
                        const payload = decodePayload(rawData);
                        console.log('Received text frame:', payload);
                    }
                    // Binary frame
                    else if (opcode === 2) {
                        console.log('Received binary frame:', rawData);
                    }
                    // Connection close frame
                    else if (opcode === 8) {
                        console.log('Received close frame');
                        socket.end();
                    }
                    // Ping frame
                    else if (opcode === 9) {
                        console.log('Received ping frame');
                        sendPongFrame(socket);
                    }
                    // Pong frame
                    else if (opcode === 10) {
                        console.log('Received pong frame');
                    }
                });

                // Send outgoing messages
                setInterval(() => {
                    const message = 'Hello from server!';
                    const payload = encodePayload(message);
                    const frame = createTextFrame(payload);
                    socket.write(frame);
                }, 2000);
            }
        }
    });

    socket.on('close', () => {
        console.log('Connection closed');
    });

    socket.on('error', error => {
        console.error('Socket error:', error);
    });
});

server.listen(8080, () => {
    console.log('WebSocket server is running on port 8080');
});

// Helper functions

function decodePayload(rawData) {
    const payloadLength = rawData.charCodeAt(1) & 0x7f;
    let payloadStartIndex = 2;
    let maskStartIndex = payloadStartIndex + 4;

    if (payloadLength === 126) {
        payloadStartIndex += 2;
        maskStartIndex += 2;
    } else if (payloadLength === 127) {
        payloadStartIndex += 8;
        maskStartIndex += 8;
    }

    const payload = Buffer.alloc(payloadLength);

    for (let i = 0; i < payloadLength; i++) {
        const maskedIndex = maskStartIndex + (i % 4);
        payload[i] = rawData.charCodeAt(payloadStartIndex + i) ^ rawData.charCodeAt(maskedIndex);
    }

    return payload.toString();
}

function encodePayload(payload) {
    const payloadLength = Buffer.byteLength(payload);
    const header = Buffer.alloc(payloadLength + 2);
    header.writeUInt8(0b10000001, 0); // FIN + Opcode (Text frame)
    header.writeUInt8(payloadLength, 1); // Payload length

    Buffer.from(payload).copy(header, 2);
    return header;
}

function createTextFrame(payload) {
    const frameLength = payload.length;
    const header = Buffer.alloc(frameLength + 2);
    header.writeUInt8(0b10000001, 0); // FIN + Opcode (Text frame)
    header.writeUInt8(frameLength, 1); // Payload length

    payload.copy(header, 2);
    return header;
}

function sendPongFrame(socket) {
    const frame = Buffer.from([0b10001010, 0]);
    socket.write(frame);
}
