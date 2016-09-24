/* global Module */

/* Magic Mirror
 * Module: MMM-FHEM
 *
 * By Benjamin Roesner http://benjaminroesner.com
 * MIT Licensed.
 */

// TODO: icons for temperature and humidity
// TODO: make it more sexy

Module.register('MMM-FHEM', {

  defaults: {
    host: 'localhost',
    port: '8083',
    initialLoadDelay: 1000,
    updateInterval: 5 * 60 * 1000, // every 5 minutes
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
      titleWrapper.innerHTML = device.name;
      titleWrapper.className = 'title';
      deviceWrapper.appendChild(titleWrapper);

      // add reading 1
      device.values.forEach(function(element, index, array) {
        var value = element;
        var valueWrapper = document.createElement('div');

        //add icon
        if (self.defaults.deviceReadings[index].icon) {
          valueWrapper.innerHTML = '<i class="dimmed ' + self.defaults.deviceReadings[index].icon + '"></i>';
        }

        valueWrapper.innerHTML += value;

        // add suffix
        if (self.defaults.deviceReadings[index].suffix) {
          valueWrapper.innerHTML += self.defaults.deviceReadings[index].suffix;
        }
        valueWrapper.className = 'value medium bright';
        deviceWrapper.appendChild(valueWrapper);
      });

      wrapper.appendChild(deviceWrapper);

    });

    return wrapper;
  }

});
