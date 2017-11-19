if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod');
} else if (process.env.NODE_ENV === 'server') {
  module.exports = require('./configureStore.server');
} else {
  module.exports = require('./configureStore.dev');
}
