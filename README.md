# Senior Developer Exercise

##### SPECS
- React, Redux, Thunk

##### DELIVERABLES
- You can view the assignment online at [cbcth.acceptabletone.com](http://cbcth.acceptabletone.com). 
- Code is hosted in the following repo: [github.com/AccepTableTone/CBCTH](https://github.com/AccepTableTone/CBCTH).
- To run the project locally, clone the above repo, run *npm install* then *npm start*
- The site is not IE 11 friendly (a promise polyfill and fetch alternative is the fix) - Chrome and Firefox, all good e!--[oo/]

##### DEVIATIONS
 - The weather information by location is pulled down as XML and parsed to JSON per the technical test summary but the 5 day forecast is pulled down as JSON (sort of a deviation)
 - ...I guess it would come down to one's definition of a 'button', but to refresh the weather data the user needs to click the refresh icon in bottom right of the weather details component
- User can switch between celsius and fahrenheit (UI does not display kelvins, but that could be easily changed)
- The site has a city search feature that returns weather data for that city, data that is refreshed the same way as the location weather data is (refresh icon).
- When any weather data is successfully returned from the OpenWeatherMap API, the city information in that response is used to request a 'skyline' image from the [Pexels image API](https://www.pexels.com/api/). The 'skyline' image is meant to be a location relevant background image for the page. NOTE: turns out the PEXEL library isn't something you would bet on for content accuracy, so some background images don't exactly match the city searched (but the images are great).

##### POINTS OF NOTE
- Cooincidently this assignment was similar to a section in an online Udemy React/Redux course I worked on a couple years ago; and I was able to reuse the same API key.
- There are a couple pieces of code that I pulled from the internet - one being the CSS for the ticker at the bottom of the screen, the other is the xmlToJson function in funcs.js (I made a couple tweaks but not enough to classify it written by me)

##### OUTSTANDING ITEMS
- I am not usually capturing people's location through the browser and perhaps it's a sign of the times but this task is not as easy as it once was without an SSL certificate. You will have to pull down the code and run the site locally to see the location feature at work.
- After reading the technical test summary I had envisioned what I eventually built.... except for the choppy background image transitions; that is something that needs work (but if you revist a city, then your browser has the image cached and the transition is nice and smooth, as it was intended)
- There is also no real error handling outside of a couple state variables - tsk, tsk.
- Safari has an issue parsing the YYYY-MM-DD dates returned from the OpenWeatherMap API; viewing the site in Safari will display 'invalid date'. Some reading tells me IE will return NaN - TODO fix is a reformat of the date string before calling 'new Date()'


Thanks for your time reviewing what I've brought to the table o[''/]o 

-D


[davidmckinnon.ca](http://davidmckinnon.ca/) ||
[acceptabletone.com](http://acceptabletone.com/)
