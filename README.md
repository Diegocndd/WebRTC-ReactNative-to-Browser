# React Native Configuration

1) Navigate to the <i>react</i> folder.

2) In the terminal, run the following command to download the project's dependencies:

> yarn

3) Now, with the device connected, execute the command:

> yarn android

4) With the application running, access the <i>react/App.js</i> file and, on line 60, replace the <i>ip</i> with your local <i>ip</i> , without changing port 4000.

5) In the running application, click on the "START TRANSMISSION" button. The image from your camera should cover the entire screen.

# Socket Configuration (port 4000)

1) Browse to the <i>server-js</i> folder.

2) In the terminal, run the following command to download the project's dependencies:

> npm install

3) Now, execute the following command to start the socket:

> node index.js

4) If everything works out, the message <i>Server running on port 4000</i> should appear without any errors.

# Browser Configuration

1) Navigate to the <i>browser</i> folder.

2) In the <i>index.html</i> file, on line 30, replace the <i>ip</i> with your local <i>ip</i>, without changing port 4000.

3) The Chrome browser must be opened (make sure you have it on your computer) and then the camera image of the device where the React Native application is running is displayed. 
