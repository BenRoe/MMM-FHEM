# Module: MMM-FHEM
This [MagicMirror](https://github.com/MichMich/MagicMirror) module, shows values like temperature/humidity of [FHEM](http://fhem.de) devices.

![Magic-Mirror Module MMM-FHEM screenshot](https://github.com/BenRoe/MMM-FHEM/blob/gh-pages/Screenshot1.png?raw=true)
![Magic-Mirror Module MMM-FHEM screenshot](https://github.com/BenRoe/MMM-FHEM/blob/gh-pages/Screenshot2.png?raw=true)

## Dependencies
- An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
- [request](https://www.npmjs.com/package/request)
- [underscore](https://www.npmjs.com/package/underscore)

## Installation

Navigate into your MagicMirror's `modules` folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/BenRoe/MMM-FHEM
```

Navigate to the new `MMM-FHEM` folder and install the node dependencies.
```
npm install
```

Configure the module in your `config.js` file.

## Update the module

Navigate into the `MMM-FHEM` folder with `cd ~/MagicMirror/modules/MMM-FHEM` and get the latest code from Github with `git pull`.

If you haven't changed the modules, this should work without any problems. Type `git status` to see your changes, if there are any, you can reset them with `git reset --hard`. After that, git pull should be possible.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
```javascript
modules: [
  {
    module: 'MMM-FHEM',
    position: 'bottom_bar',
    config: {
      host: 'localhost',
      port: '8083',
      https: false,
      devices: [
                  { deviceName: 'FhemDeviceName1',
                    deviceReadings: [
                                      { name: 'temperature', icon: 'wi wi-thermometer', suffix: '&deg;' },
                                      { name: 'humidity', icon: 'wi wi-humidity', suffix: '%' },
                                    ],
                  },
                  { deviceName: 'FhemDeviceName2',
                    deviceReadings: [
                                      { name: 'temperature', icon: 'wi wi-thermometer', suffix: '&deg;' },
                                    ],
                  },
                ],
    },
  },
]
```

## Configuration options

The following properties can be configured:

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>

		<tr>
			<td><code>host</code></td>
			<td>Hostname/IP of the FHEM Server.  
        Is only necessary, if FHEM and Magic-Mirror is <u>not</u> on the same machine (Raspberry Pi).
        <br>
				<br>
        <b>Possible values:</b> <code>localhost</code> or a IP
        <br>
				<b>Default value:</b> <code>localhost</code>
			</td>
		</tr>

		<tr>
			<td><code>port</code></td>
			<td>FHEM Port
        <br>
        <br>
        <b>Possible values:</b> any number
        <br>
				<b>Default value:</b> <code>8083</code>
			</td>
		</tr>

    <tr>
			<td><code>https</code></td>
			<td>If your FHEM use https
        <br>
        <br>
        <b>Possible values:</b> <code>true</code> or <code>false</code>
        <br>
				<b>Default value:</b> <code>false</code>
			</td>
		</tr>

    <tr>
			<td><code>devices</code></td>
			<td>Array of objects.
        <br>
        Object for the different FHEM devices.
<<<<<<< HEAD
        <pre><code>
          { deviceName: 'FhemDeviceName1',
            deviceReadings: [
                              { name: 'temperature', icon: 'wi wi-thermometer', suffix: '&deg;' },
                              { name: 'humidity', icon: 'wi wi-humidity', suffix: '%' },
                            ],
          },
        </code></pre>
=======
<pre><code>
  { deviceName: 'FhemDeviceName1',
    deviceReadings: [
                      { name: 'temperature', icon: 'wi wi-thermometer', suffix: '&deg;' },
                      { name: 'humidity', icon: 'wi wi-humidity', suffix: '%' },
                    ],
  },
</code></pre>
>>>>>>> - fixed typo in readme
        <b>deviceName</b>: Go to the FHEM Web-UI, find the device under Unsorted or another room and find <code>NAME</code> under <code>Internals</code>.
        <br />
        <b>deviceReadings</b>: array of objects for the device readings you want to display.
        <br />
        <b>name:</b> Name of the Reading (Required)
        <br>
        <b>icon:</b> CSS class of an icon (<a href="http://fontawesome.io/icons/">Font-Awesome</a> and <a href="https://erikflowers.github.io/weather-icons/">Weather Icons</a> are pre installed)
        <br>
        <b>suffix:</b> any string/text
			</td>
		</tr>

    <tr>
			<td><code>initialLoadDelay</code></td>
			<td>The initial delay before loading. (Milliseconds)
        <br>
				<br>
        <b>Default value:</b> <code>1000</code> 1 second
			</td>
		</tr>

    <tr>
			<td><code>updateInterval</code></td>
			<td>How often does the content should to be updated? (Milliseconds)
        <br>
        <br>
        <b>Possible values:</b> <code>1000</code> 1 second - <code>86400000</code> 24 hours
        <br>
				<b>Default value:</b> <code>60000</code> 1 minute
			</td>
		</tr>

	</tbody>
</table>
