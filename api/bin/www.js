const { start } = require('../app');
const http = require('http');

(async () => {
    const app = await start();
    const port = process.env.PORT || '3000';
    app.set('port', port);

    const server = http.createServer(app);
    server.listen(port);

    server.on('listening', _ => {
        console.log('Listening on ' + port);
    });
})();


