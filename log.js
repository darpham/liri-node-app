var fs = require('fs');

var logData = {
    log: function(data) {
        fs.open('log.txt', 'a', (err, fd) => {
            if (err) throw err;
            fs.appendFile(fd, data.join('\n'), 'utf8', (err) => {

              fs.close(fd, (err) => {
                if (err) throw err;
              });
              if (err) throw err;

            });
          });
    }
};

module.exports = logData