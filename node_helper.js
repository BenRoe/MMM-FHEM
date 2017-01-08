'use strict';

/* Magic Mirror
 * Module: MMM-FHEM
 *
 * By Benjamin Roesner http://benjaminroesner.com
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
var request = require('request');
var _ = require('underscore');

module.exports = NodeHelper.create({
  start: function() {
    this.config = {};
  },

  buildFhemUrl: function (config) {
    var deviceString = '';
    config.devices.forEach(function(element, index, array) {
      deviceString += element.deviceName + ',';
    });
    if (config.https) {
      return 'https://' + config.host + ':' + config.port +
              '/fhem?cmd=jsonlist2%20NAME=' + deviceString + '&XHR=1';
    } else {
      return 'http://' + config.host + ':' + config.port +
              '/fhem?cmd=jsonlist2%20NAME=' + deviceString + '&XHR=1';
    }
  },

  getFhemJson: function(config, callback) {
    request({
      url: this.buildFhemUrl(config),
      json: true,
    }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(body);
        callback(body);
      }
    });
  },

  /**
   * use fhem alias as label if it is set
   * @param  {object} device fhem device object
   * @return {string}
   */
  getDeviceName: function (device) {
    if (device.Attributes.alias) {
      return device.Attributes.alias;
    } else {
      return device.Name;
    }
  },

  getReadingsValue: function (readingsName, device) {
    var values = [];

    readingsName.forEach(function(element, index, array) {
      var readingName = element;
      if (device.Readings[readingName]) {
        values.push(device.Readings[readingName].Value);
      } else {
        values.push('Reading not exist');
      }
    });

    return values;
  },

  parseJson: function (json) {
    var self = this;
    var parsedJson = [];
    var resultsArray = json.Results;

    resultsArray.forEach(function(element, index, array) {
      var device = {};
      // save value of property 'name' an array
      var readingsName = _.pluck(self.config.devices[index].deviceReadings, 'name');

      device.name = self.getDeviceName(element);
      device.values = self.getReadingsValue(readingsName, element);

      parsedJson.push(device);
    });

    return parsedJson;
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'GETDATA') {
      var self = this;
      self.config = payload;
      this.getFhemJson(this.config ,function(data) {
        // console.log(data);
        var structuredData = self.parseJson(data);
        self.sendSocketNotification('DATARECEIVED', structuredData);
      });
    }
  }

});
