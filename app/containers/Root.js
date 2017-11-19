if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Root.prod');
} else if (process.env.NODE_ENV === 'server') {
  module.exports = require('./Root.server');
} else {
  module.exports = require('./Root.dev');
}
