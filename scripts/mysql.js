const colors = require('colors');
exports.run = (client) => {

    var mysql = require('mysql');
    client.connection = mysql.createConnection({
        host: client.config.mysql.localhost,
        user: client.config.mysql.user,
        password: client.config.mysql.password,
        database: client.config.mysql.database,
        charset: client.config.mysql.charset
    });


    function startConnection() {
        console.error('Connecting to mysql'.yellow);
        client.connection.connect(function(err) {
            if (err) {
                console.error('Connection failed to mysql'.red, err.code);
                if (err.code != "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
                    if (client.errorChan) client.errorChan.send("Cannot connect to MySQL Server [Connect function]".red)
                    startConnection();
                }
                client.mysqlStatus = false;
            }
            else {
                console.log("Connected to the MySQL instance.".green);
                client.mysqlStatus = true;
            }
        });

        client.connection.on('error', function(err) {
            if (err.fatal) {
              client.mysqlStatus = false;
              console.log("Fatal Mysql Error.")
              if (client.errorChan) client.errorChan.send("Fatal Mysql Error [On Event]".red)
              startConnection();
            }
        });
    }

    startConnection();
}
