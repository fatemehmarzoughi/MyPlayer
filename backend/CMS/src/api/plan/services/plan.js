'use strict';

/**
 * plan service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::plan.plan');
