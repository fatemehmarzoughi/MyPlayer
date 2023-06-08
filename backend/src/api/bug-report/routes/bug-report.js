'use strict';

/**
 * bug-report router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::bug-report.bug-report');
