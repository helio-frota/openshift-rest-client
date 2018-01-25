'use strict';

const test = require('tape');
const nock = require('nock');

const openshiftRestClient = require('../');
const openshiftConfigLoader = require('openshift-config-loader');
const privates = require('../lib/private-map');

test('find - builds - basic findAll', (t) => {
  const settings = {
    configLocation: `${__dirname}/test-config`
  };

  openshiftConfigLoader(settings).then((config) => {
    openshiftRestClient(config).then((client) => {
      t.equal(typeof client.builds.findAll, 'function', 'There is a findAll method on the builds object');

      const clientConfig = privates.get(client).config;

      nock(clientConfig.cluster)
        .matchHeader('authorization', `Bearer ${clientConfig.user.token}`) // taken from the config
        .get(`/oapi/v1/namespaces/${clientConfig.context.namespace}/builds`)
        .reply(200, {kind: 'BuildList'});

      const findResult = client.builds.findAll().then((buildList) => {
        t.equal(buildList.kind, 'BuildList', 'returns an object with BuildList');
        t.end();
      });

      t.equal(findResult instanceof Promise, true, 'should return a Promise');
    });
  });
});

test('find - builds - basic find', (t) => {
  const settings = {
    configLocation: `${__dirname}/test-config`
  };

  openshiftConfigLoader(settings).then((config) => {
    openshiftRestClient(config).then((client) => {
      t.equal(typeof client.builds.find, 'function', 'There is a find method on the builds object');

      const clientConfig = privates.get(client).config;
      const buildName = 'cool-build-name-1';

      nock(clientConfig.cluster)
        .matchHeader('authorization', `Bearer ${clientConfig.user.token}`) // taken from the config
        .get(`/oapi/v1/namespaces/${clientConfig.context.namespace}/builds/${buildName}`)
        .reply(200, {kind: 'Build'});

      const findResult = client.builds.find(buildName).then((build) => {
        t.equal(build.kind, 'Build', 'returns an object with Build');
        t.end();
      });

      t.equal(findResult instanceof Promise, true, 'should return a Promise');
    });
  });
});

test('find - builds - find - no build name', (t) => {
  const settings = {
    configLocation: `${__dirname}/test-config`
  };

  openshiftConfigLoader(settings).then((config) => {
    openshiftRestClient(config).then((client) => {
      client.builds.find().catch((err) => {
        t.equal(err.message, 'Build Name is required', 'error message should return');
        t.end();
      });
    });
  });
});

test('create - build', (t) => {
  const settings = {
    configLocation: `${__dirname}/test-config`
  };

  openshiftConfigLoader(settings).then((config) => {
    openshiftRestClient(config).then((client) => {
      t.equal(typeof client.builds.create, 'function', 'There is a create method on the builds object');

      const clientConfig = privates.get(client).config;
      const build = {
        kind: 'Build'
      };

      nock(clientConfig.cluster)
        .matchHeader('authorization', `Bearer ${clientConfig.user.token}`) // taken from the config
        .post(`/oapi/v1/namespaces/${clientConfig.context.namespace}/builds`)
        .reply(200, {kind: 'Build'});

      const createResult = client.builds.create(build).then((build) => {
        t.equal(build.kind, 'Build', 'returns an object with Build');
        t.end();
      });

      t.equal(createResult instanceof Promise, true, 'should return a Promise');
    });
  });
});

test('update - build', (t) => {
  const settings = {
    configLocation: `${__dirname}/test-config`
  };

  openshiftConfigLoader(settings).then((config) => {
    openshiftRestClient(config).then((client) => {
      t.equal(typeof client.builds.create, 'function', 'There is a create method on the builds object');

      const clientConfig = privates.get(client).config;
      const build = {
        kind: 'Build'
      };
      const buildName = 'cool-build-name-1';

      nock(clientConfig.cluster)
        .matchHeader('authorization', `Bearer ${clientConfig.user.token}`) // taken from the config
        .put(`/oapi/v1/namespaces/${clientConfig.context.namespace}/builds/${buildName}`)
        .reply(200, {kind: 'Build'});

      const createResult = client.builds.update(buildName, build).then((build) => {
        t.equal(build.kind, 'Build', 'returns an object with Build');
        t.end();
      });

      t.equal(createResult instanceof Promise, true, 'should return a Promise');
    });
  });
});

test('remove - builds - basic removeAll', (t) => {
  const settings = {
    configLocation: `${__dirname}/test-config`
  };

  openshiftConfigLoader(settings).then((config) => {
    openshiftRestClient(config).then((client) => {
      t.equal(typeof client.builds.removeAll, 'function', 'There is a removeAll method on the builds object');

      const clientConfig = privates.get(client).config;

      nock(clientConfig.cluster)
        .matchHeader('authorization', `Bearer ${clientConfig.user.token}`) // taken from the config
        .delete(`/oapi/v1/namespaces/${clientConfig.context.namespace}/builds`)
        .reply(200, {kind: 'Status'});

      const removeResult = client.builds.removeAll().then((buildList) => {
        t.equal(buildList.kind, 'Status', 'returns an object with Status');
        t.end();
      });

      t.equal(removeResult instanceof Promise, true, 'should return a Promise');
    });
  });
});

test('remove - builds - basic remove', (t) => {
  const settings = {
    configLocation: `${__dirname}/test-config`
  };

  openshiftConfigLoader(settings).then((config) => {
    openshiftRestClient(config).then((client) => {
      t.equal(typeof client.builds.remove, 'function', 'There is a remove method on the builds object');

      const clientConfig = privates.get(client).config;
      const buildName = 'cool-build-name-1';

      nock(clientConfig.cluster)
        .matchHeader('authorization', `Bearer ${clientConfig.user.token}`) // taken from the config
        .delete(`/oapi/v1/namespaces/${clientConfig.context.namespace}/builds/${buildName}`)
        .reply(200, {kind: 'Status'});

      const removeResult = client.builds.remove(buildName).then((status) => {
        t.equal(status.kind, 'Status', 'returns an object with Status');
        t.end();
      });

      t.equal(removeResult instanceof Promise, true, 'should return a Promise');
    });
  });
});

test('remove - builds - remove - no build name', (t) => {
  const settings = {
    configLocation: `${__dirname}/test-config`
  };

  openshiftConfigLoader(settings).then((config) => {
    openshiftRestClient(config).then((client) => {
      client.builds.remove().catch((err) => {
        t.equal(err.message, 'Build Name is required', 'error message should return');
        t.end();
      });
    });
  });
});
