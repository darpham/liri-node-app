// imports fs module
var fs = require('fs');

// function to log data in log.txt
var logData = {
    log: function(data) {
      data.splice(0, 0, '\n *** New Function request*** \n');
      console.log(data)
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