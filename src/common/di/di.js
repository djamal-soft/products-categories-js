const awilix = require('awilix');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.CLASSIC
});

module.exports = container;