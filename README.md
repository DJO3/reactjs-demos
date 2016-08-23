# reactjs-program
A collection of ReactJS examples.

### Requirements
1) NodeJS & npm

2) python (optional, used for serving up HTTP)

### Getting Started
You can view the examples through any HTTP server. The following assumes use of [Python's SimpleHTTPServer] (https://docs.python.org/2/library/simplehttpserver.html#module-SimpleHTTPServer)

1) Clone repo and cd into it.

2) Install dependencies: `npm install`

2) Start HTTP server: `python -m SimpleHTTPServer 8000`. You may need to install Python if not already installed.

3) Navigate to desired example, e.g., http://localhost:8000/todo/

### Create An Example
At the moment I'm enjoying using [browserify](http://browserify.org/) to organize and bundle dependencies within the browser. To get start, try the following:

1) `mkdir my_new_app && cd my_new_app`

2) `touch index.html && mkdir src && mkdir build`

2) `npm init`

3) `npm install --save react react-dom`

4) `npm install --save-dev babelify babel-preset-react`

5) `npm install -g browserify`

6) Bundle all dependencies: `browserify -t [ babelify --presets [ react ] ] src/main.js -o build/app.js` (assumes your final render takes place in `src/main.js`)

7) Include the following script tag in your index.html: `<script src="build/app.js"></script>`

8) Fire up your example on http://localhost:8000/my_new_app
