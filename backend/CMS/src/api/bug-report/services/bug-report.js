'use strict';

/**
 * bug-report service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bug-report.bug-report');
