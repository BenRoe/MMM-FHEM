/* global Module */

/* Magic Mirror
 * Module: MMM-FHEM
 *
 * By Benjamin Roesner http://benjaminroesner.com
 * MIT Licensed.
 */

// TODO: implement the weather icons
// TODO: add support for https

Module.register('MMM-FHEM', {

  defaults: {
    host: 'localhost',
    port: '8083',
    initialLoadDelay: 1000,
    updateInterval: 1 * 60 * 1000, // every 1 minutes
    title: null,
    titleSuffix: '',
  },

  // Define required scripts.
  getStyles: function () {
    return ['MMM-FHEM.css'];
  },

  // Override socket notification handler.
  // Module notifications from node_helper
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'DATARECEIVED') {
      this.devices = payload;
      // Log.log(payload);
      this.updateDom(2000);
      this.scheduleUpdate(this.config.updateInterval);
    }
  },

  // Method is called when all modules are loaded an the system is ready to boot up
  start: function() {
    this.devices = [];
    this.updateTimer = null;
    this.scheduleUpdate(this.config.initialLoadDelay);
    Log.info('Starting module: ' + this.name);
  },

  /* scheduleUpdate()
   * Schedule next update.
   *
   * argument delay number - Milliseconds before next update. If empty, this.config.updateInterval is used.
   */
  scheduleUpdate: function (delay) {
    var nextLoad = this.config.updateInterval;
    if (typeof delay !== 'undefined' && delay >= 0) {
      nextLoad = delay;
    }

    var self = this;
    clearTimeout(this.updateTimer);
    this.updateTimer = setTimeout(function () {
      self.sendSocketNotification('GETDATA', self.config);
      // Log.log('FHEM new data fetched...');
    }, nextLoad);
  },

  // Update the information on screen
  getDom: function() {
    var self = this;
    var devices = this.devices;
    var wrapper = document.createElement('div');
    wrapper.className = 'flex-container small';

    devices.forEach(function(element, index, array) {
      var device = element;

      var deviceWrapper = document.createElement('div');
      deviceWrapper.className = 'flex-item normal';

      // add device alias/name
      var titleWrapper = document.createElement('div');
      if (self.config.title == null) {
        titleWrapper.innerHTML = device.name + self.config.titleSuffix;
      } else {
        titleWrapper.innerHTML = self.config.title;
      }
      titleWrapper.className = 'title';
      deviceWrapper.appendChild(titleWrapper);

      // add reading 1
      device.values.forEach(function(elementValue, indexValue, arrayValue) {
        var value = elementValue;
        var valueWrapper = document.createElement('div');

        //add icon
        if (self.config.devices[index].deviceReadings[indexValue].icon) {
          valueWrapper.innerHTML = '<i class="dimmed ' + self.config.devices[index].deviceReadings[indexValue].icon + '"></i>';
        }

        valueWrapper.innerHTML += value;

        // add suffix
        if (self.config.devices[index].deviceReadings[indexValue].suffix) {
          valueWrapper.innerHTML += self.config.devices[index].deviceReadings[indexValue].suffix;
        }
        valueWrapper.className = 'value medium bright';
        deviceWrapper.appendChild(valueWrapper);
      });

      wrapper.appendChild(deviceWrapper);

    });

    return wrapper;
  }

});
