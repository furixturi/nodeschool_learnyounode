# Learn super basics of node!

This repository is a learning project I created along the way of doing the [learnyounode workshop](https://github.com/workshopper/learnyounode) from [nodeschool](http://nodeschool.io/#workshoppers). It was a weekend project that went very smoothly and great fun.

As the new week began, to keep the fun and the challenge sweetness, as well as to let the knowledge sink in, I decided to use the README.md to take learning notes. 

Hence the following long notes collecting the commands and ideas I've picked up, in the chapters' order of the workshop.


## 1. HELLO WORLD

* To run a node JS program
```
$ node program.js
```

* To write to the standard output in node
```javascript
console.log('text')
```

## 2. BABY STEPS

* To get command-line arguments

   There is this global `process` object with an `argv` property, through which command-line arguments can be accessed, i.e. `process.argv`.

   * `process.argv` is actually an array containing the complete command-line input separated with whitespaces, which means its first two elements are always `"node"` and `<program JS file name>`. Therefore, to get the command-line arguments we have to start with

	   ```javascript
	   process.argv[2]
	   ```


	   To keep it dynamic I sliced it like this:


	   ```javascript
	   var arguments = process.argv.slice(2);
	   ```

	* Also be careful that the arguments you got from `process.argv` are all strings. You have to parse them before using, e.g. for numbers:

		```javascript
		var numberArg = Number(process.argv[2])
		```

		or

		```javascript
		var numberArg = +(process.argv[2])
		```

## 3. MY FIRST I/O

* To perform a filesystem operation, we need the `fs` module

	```javascript
	var fs = require('fs')
	```

* All synchronous filesystem methods in the `fs` module end with "Sync". To read a file synchronusly

	```javascript
	var fileBuffer = fs.readFileSync('path/to/file')
	```

	The returned value is a `Buffer` object, which is Node's way of efficiently representing arbitrary arrays of data, be it ascii, binary or some other format. 

	* To convert the file Buffer object we've got earlier to string

		```javascript
		var fileStr = fileBuffer.toString()
		```

* To count new line characters (`"\n"`) in the file that we just read in and converted to string
	
	```javascript
	var numNewLine = fileStr.split('\n').length - 1 
	//there's no newline character at the end of the sample file in this exercise
	```

## 4. MY FIRST ASYNC I/O

* To read a file asynchronously, we use the asynchronous counterpart of the `fs.readFileSync()` function, which is also in the `fs` module. 

	Instead of receiving its return value as data, we gain the data in a callback that we provide as the second parameter, with the signature  `function( err, data ) { }` 

	```javascript

	var fileBuffer; 

	fs.readFile( 'path/to/file', function( err, data ) {

		if( err ) console.error( err );

		fileBuffer = data;
	})
	```

* You can also supply `'utf8'` as the second argument and the callback as the third parameter, in this way the returned data will be automatically converted to a string

	```javascript
	
	var fileStr; 

	fs.readFile( 'path/to/file', 'utf8', function( err, data ){

		if( err ) console.error( err );

		fileStr = data;
	})
	```

## 5. FILTERED LS

* To read a list of file names in a given directory

	```javascript
	fs.readdir('path/to/directory', function( err, list ) {

		if ( err ) console.error( err )

		//do something with the list
	})
	```
	The `list` is an array of file name `strings`.

* The `path` module comes in handy when handling and transforming file paths

	```javascript
	var path = require('path')
	```

	* E.g., to get the file extention

	```javascript
	var fileNameStr = 'readme.md'
	
	var fileExtention = path.extname( fileNameStr )
	// returns '.md'
	```

## 6. MAKE IT MODULAR

* To create a new module of e.g. a single function, create a new JS file and write the function in `module.exports`

	```javascript
	/* in the module JS file mymodule.js */

	module.exports = function ( args ) {
		// do something
	}
	```
	
	This module can then be used in another Node JS program by requiring it with its path

	```javascript
	/* in the program JS file */

	var myModule = require('./mymodule.js') //Here the '.js' is optional

	myModule( myArg );
	```

* It is idiomatic to check for errors and do early-returns in callback functions. If your module takes a callback, you can do it as follows:

	```javascript
	module.exports = function ( args, callback ) {

		foo ( /* <use the args here, maybe>, */ function ( err, data ) {

			if ( err ) return callback ( err )

			// do things with data
			// ...

			// first argument of a callback is normally an error, so pass null if there is none

			callback ( null, data ) 
		})

	}
	```

## 7. HTTP CLIENT

* To use the `http` core module
	
	```javascript
	var http = require('http')
	```
	* To use the simple `get()` method of the `http` core module

	```javascript
	http.get( 'url/to/get', function ( response ) {
		// do things with response
	})
	```

	* The response is a Node `Stream` object which emits events. The most interesting events are `"data"`, `"error"`, and `"end"`. Use them as follows:

	```javascript
	http.get( 'url/to/get', function ( response ) {

		response.on('data', function( data ) {

		})

		response.on('error', console.error)
	})
	```

	* By using `setEncoding('utf8')` on the `response` object, the `Stream` object is automatically converted to string

	```javascript
	response.setEncoding('utf8')
	//then it can be handled as a string
	response.on('data', console.log)
	```

## 8. HTTP COLLECT

* To collect all data from a `http.get()`, not just listen for the first `"data"` event, we can either append all the `"data"` event's response together and listen for the `"end"`event, or use a third-party package to do that for us.

	E.g., using the http://npm.im/bl package:

	* First, install the package with `npm`

	```
	$ npm install bl
	```

	* Then require and use it in our code

	```javascript
	var http = require('http')
	var bl = require('bl')

	http.get( 'url/to/get', function ( response ) {

		response.pipe ( bl ( function ( err, data ) {

			if ( err ) console.error( err )

			var result = data.toString();

			console.log( result.length )
			console.log( result )

		}))
	})
	```

	The bl can have a `Stream` piped in to it and do the data collection for you. Once the stream ended, a callback with the signature `function( err, data )` will be fired with the collected data.