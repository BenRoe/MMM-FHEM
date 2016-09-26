# Module: MMM-FHEM
This [MagicMirror](https://github.com/MichMich/MagicMirror) module, shows values like temperature/humidity of [FHEM](http://fhem.de) devices.

![Magic-Mirror Module MMM-FHEM screenshot]()

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

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
```javascript
modules: [
  {
    module: 'MMM-FHEM',
    position: 'bottom_bar',
    config: {
      deviceNames: [
                    'FhemDeviceName1',
                    'FhemDeviceName2',
                    'FhemDeviceName3',
                   ],
      deviceReadings: [
                        { name: 'temperature', icon: 'wi wi-thermometer', suffix: '&deg;' },
                        { name: 'humidity', icon: 'wi wi-humidity', suffix: '%' },
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
			<td><code>deviceNames</code></td>
			<td>Array of FHEM device names.
        <br>
        Go to the FHEM Web-UI, find the device under Unsorted or another room and find <code>NAME</code> under <code>Internals</code>.
        <br>
        <b>Required</b>
        <br>
				<br>
        <code>['...','...','...']</code>
			</td>
		</tr>

    <tr>
			<td><code>deviceReadings</code></td>
			<td>Array with Objects of the FHEM device readings name, icon, and suffix.
        <br>
				<br>
        <b>name:</b> Name of the Reading (Required)
        <br>
        <b>icon:</b> CSS class of an icon (<a href="http://fontawesome.io/icons/">Font-Awesome</a> and <a href="https://erikflowers.github.io/weather-icons/">Weather Icons</a> are pre installed)
        <br>
        <b>suffix:</b> any string/text
        <br>
        <br>
        <code>
        [
          { name: 'temperature', icon: 'wi wi-thermometer', suffix: '&deg;' },
          { name: 'humidity', icon: 'wi wi-humidity', suffix: '%' },
        ]
        </code>
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
