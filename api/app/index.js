const async = require('async');
const express = require('express');
const http = require('http');
const cron = require('node-cron');

const globalConfig = require('../config');
const { ENVIRONMENTS } = require('../config/constants');

// Individual module configurations
const authConfig = require('./config/auth/passport');
const expressConfig = require('./config/express');
const mongoConfig = require('./config/mongo');
const cronJobs = require('./config/cronJobs');

const ENV = process.env.NODE_ENV || ENVIRONMENTS.DEVELOPMENT;
const ENV_CONFIG = globalConfig[ENV];
const PORT = process.env.PORT || ENV_CONFIG.PORT;

/**
 * Initialize server configuration
 * */
const app = express();

async.auto(
    {
        /**
         *
         * Set environment specific configuration values to the app container
         * We could access this configuration in other modules
         * */
        config: (cb) => {
          app.set('config', { ...ENV_CONFIG, ENV });

            return cb(null);
        },

        /**
         * Connect server to MongoDB
         * */
        database: ['config', (scope, cb) => {
            mongoConfig.init(app, (error) => cb(error))
        }],

        /**
         * Prepare authentication
         * */
        auth: ['database', (scope, cb) => {
          authConfig.init(app, (error) => cb(error))
        }],

        /**
         * Configure REST server
         * */
        express: ['auth', (scope, cb) => {
            expressConfig.init(app, (error) => cb(error));
        }],

        /**
         * Start cron jobs
         * */
        cronJobs: ['express', (scope, cb) => {
          cronJobs.forEach(taskConfig => {
            const task = taskConfig(app);

            const isTaskValid = cron.validate(task.interval);
            if (isTaskValid) cron.schedule(task.interval, task.task);
          });

          cb(null);
        }],
    },


    /**
     * Once server configuration process is finished, make the api server visible on the specified port
     * */
    (error) => {
        if (error) console.error(error);
        else {
            const server = http.createServer(app);

            server.listen(PORT, () => {
                console.info('Started')
                console.info(`Server started on port: ${PORT}`); // visual indicator that server is up and running
            });
        }
    },
);
