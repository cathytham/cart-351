/* PLEASE DO NOT CHANGE THIS FRAMEWORK ....
the get requests are all implemented and working ... 
so there is no need to alter ANY of the existing code: 
rather you just ADD your own ... */

window.onload = function () {
  document.querySelector("#queryChoice").selectedIndex = 0;
  //create once :)
  let description = document.querySelector("#Ex4_title");
  //array to hold the dataPoints
  let dataPoints = [];

  // /**** GeT THE DATA initially :: default view *******/
  // /*** no need to change this one  **/
  runQueryDefault("onload");

  /***** Get the data from drop down selection ****/
  let querySelectDropDown = document.querySelector("#queryChoice");

  querySelectDropDown.onchange = function () {
    console.log(this.value);
    let copyVal = this.value;
    console.log(copyVal);
    runQuery(copyVal);
  };

  /******************* RUN QUERY***************************  */
  async function runQuery(queryPath) {
    // // //build the url -end point
    const url = `/${queryPath}`;
    try {
      let res = await fetch(url);
      let resJSON = await res.json();
      console.log(resJSON);

      //reset the
      document.querySelector("#childOne").innerHTML = "";
      description.textContent = "";
      document.querySelector("#parent-wrapper").style.background =
        "rgba(51,102,255,.2)";

      switch (queryPath) {
        case "default": {
          displayAsDefault(resJSON);
          break;
        }
        case "one": {
          //sabine done
          displayInCirclularPattern(resJSON);
          break;
        }
        case "two": {
          //sabine done
          displayByGroups(resJSON, "weather", "eventName");
          break;
        }
        /***** TO DO FOR EXERCISE 4 *************************
         ** 1: Once you have implemented the mongodb query in server.py,
         ** you will receive it from the get request (THE FETCH HAS ALREADY BEEN IMPLEMENTED:: SEE ABOVE) 
         ** and will automatically will enter into the correct select case
         **  - based on the value that the user chose from the drop down list...)
         ** You need to design and call a custom display function FOR EACH query that you construct ...
         ** 4 queries - I want 4 UNIQUE display functions - you can use the ones I created
         ** as inspiration ONLY - DO NOT just copy and change colors ... experiment, explore, change ...
         ** you can create your own custom objects - but NO images, video or sound... (will get 0).
         ** bonus: if your visualizations(s) are interactive or animate.
         ****/
        case "three": {
          console.log("three");
          displayThree(resJSON);
          break;
        }
        case "four": {
          console.log("four");
          displayFour(resJSON);
          break;
        }

        case "five": {
          console.log("five");
          displayFive(resJSON);
          break;
        }
        case "six": {
          console.log("six");
          displaySix(resJSON);
          break;
        }
        default: {
          console.log("default case");
          break;
        }
      } //switch
    } catch (err) {
      console.log(err);
    }
  }

        
  //will make a get request for the data ...

  /******************* RUN DEFAULT QUERY***************************  */
  async function runQueryDefault(queryPath) {
    // // //build the url -end point
    const url = `/${queryPath}`;
    try {
      let res = await fetch(url);
      let resJSON = await res.json();
      console.log(resJSON);
      displayAsDefault(resJSON);
    } catch (err) {
      console.log(err);
    }
  }
  /*******************DISPLAY AS GROUP****************************/

  function displayByGroups(resultObj, propOne, propTwo) {
    dataPoints = [];
    let finalHeight = 0;
    //order by WEATHER and Have the event names as the color  ....

    //set background of parent ... for fun ..
    document.querySelector("#parent-wrapper").style.background =
      "rgba(51, 153, 102,1)";
    description.textContent = "BY WEATHER AND ALSO HAVE EVENT NAMES {COLOR}";
    description.style.color = "rgb(179, 230, 204)";

    let coloredEvents = {};
    let resultSet = resultObj.results;

    //reget
    let possibleEvents = resultObj.events;
    let possibleColors = [
      "rgb(198, 236, 217)",
      "rgb(179, 230, 204)",
      "rgb(159, 223, 190)",
      "rgb(140, 217, 177)",
      "rgb(121, 210, 164)",
      "rgb(102, 204, 151)",
      "rgb(83, 198, 138)",
      "rgb(64, 191, 125)",
      "rgb(255, 204, 179)",
      "rgb(255, 170, 128)",
      "rgb(255, 153, 102)",
      "rgb(255, 136, 77)",
      "rgb(255, 119, 51)",
      "rgb(255, 102, 26)",
      "rgb(255, 85, 0)",
      "rgb(230, 77, 0)",
      "rgb(204, 68, 0)",
    ];

    for (let i = 0; i < possibleColors.length; i++) {
      coloredEvents[possibleEvents[i]] = possibleColors[i];
    }

    let offsetX = 20;
    let offsetY = 150;
    // find the weather of the first one ...
    let currentGroup = resultSet[0][propOne];
    console.log(currentGroup);
    let xPos = offsetX;
    let yPos = offsetY;

    for (let i = 0; i < resultSet.length - 1; i++) {
      dataPoints.push(
        new myDataPoint(
          resultSet[i].dataId,
          resultSet[i].day,
          resultSet[i].weather,
          resultSet[i].start_mood,
          resultSet[i].after_mood,
          resultSet[i].after_mood_strength,
          resultSet[i].event_affect_strength,
          resultSet[i].event_name,
          //map to the EVENT ...
          coloredEvents[resultSet[i].event_name],
          //last parameter is where should this go...
          document.querySelector("#childOne"),
          //which css style///
          "point_two"
        )
      );

      /** check if we have changed group ***/
      if (resultSet[i][propOne] !== currentGroup) {
        //update
        currentGroup = resultSet[i][propOne];
        offsetX += 150;
        offsetY = 150;
        xPos = offsetX;
        yPos = offsetY;
      }
      // if not just keep on....
      else {
        if (i % 10 === 0 && i !== 0) {
          xPos = offsetX;
          yPos = yPos + 15;
        } else {
          xPos = xPos + 15;
        }
      } //end outer else

      dataPoints[i].update(xPos, yPos);
      finalHeight = yPos;
    } //for

    document.querySelector("#childOne").style.height = `${finalHeight + 20}px`;
  } //function

  /*****************DISPLAY IN CIRCUlAR PATTERN:: <ONE>******************************/
  function displayInCirclularPattern(resultOBj) {
    //reset
    dataPoints = [];
    let xPos = 0;
    let yPos = 0;
    //for circle drawing
    let angle = 0;
    let centerX = window.innerWidth / 2;
    let centerY = 350;

    let scalar = 300;
    let yHeight = Math.cos(angle) * scalar + centerY;

    let resultSet = resultOBj.results;
    let coloredMoods = {};

    let possibleMoods = resultOBj.moods;
    let possibleColors = [
      "rgba(0, 64, 255,.5)",
      "rgba(26, 83, 255,.5)",
      "rgba(51, 102, 255,.7)",
      "rgba(51, 102, 255,.4)",
      "rgba(77, 121,255,.6)",
      "rgba(102, 140, 255,.6)",
      "rgba(128, 159, 255,.4)",
      "rgba(153, 179, 255,.3)",
      "rgba(179, 198, 255,.6)",
      "rgba(204, 217, 255,.4)",
    ];

    for (let i = 0; i < possibleMoods.length; i++) {
      coloredMoods[possibleMoods[i]] = possibleColors[i];
    }

    //set background of parent ... for fun ..
    document.querySelector("#parent-wrapper").style.background =
      "rgba(0, 26, 102,1)";
    description.textContent = "BY AFTER MOOD";
    description.style.color = "rgba(0, 64, 255,.5)";

    for (let i = 0; i < resultSet.length - 1; i++) {
      dataPoints.push(
        new myDataPoint(
          resultSet[i].dataId,
          resultSet[i].day,
          resultSet[i].weather,
          resultSet[i].start_mood,
          resultSet[i].after_mood,
          resultSet[i].after_mood_strength,
          resultSet[i].event_affect_strength,
          resultSet[i].event_name,
          //map to the day ...
          coloredMoods[resultSet[i].after_mood],
          //last parameter is where should this go...
          document.querySelector("#childOne"),
          //which css style///
          "point_two"
        )
      );
      /*** circle drawing ***/
      xPos = Math.sin(angle) * scalar + centerX;
      yPos = Math.cos(angle) * scalar + centerY;
      angle += 0.13;

      if (angle > 2 * Math.PI) {
        angle = 0;
        scalar -= 20;
      }
      dataPoints[i].update(xPos, yPos);
    } //for

    document.querySelector("#childOne").style.height = `${yHeight}px`;
  } //function

  /*****************DISPLAY AS DEFAULT GRID :: AT ONLOAD ******************************/
  function displayAsDefault(resultOBj) {
    //reset
    dataPoints = [];
    let xPos = 0;
    let yPos = 0;
    const NUM_COLS = 50;
    const CELL_SIZE = 20;
    let coloredDays = {};
    let resultSet = resultOBj.results;
    possibleDays = resultOBj.days;
    /*
  1: get the array of days (the second entry in the resultOBj)
  2: for each possible day (7)  - create a key value pair -> day: color and put in the
  coloredDays object
  */
    console.log(possibleDays);
    let possibleColors = [
      "rgb(255, 102, 153)",
      "rgb(255, 77, 136)",
      "rgb(255, 51, 119)",
      "rgb(255, 26, 102)",
      "rgb(255, 0, 85)",
      "rgb(255, 0, 85)",
      "rgb(255, 0, 85)",
    ];

    for (let i = 0; i < possibleDays.length; i++) {
      coloredDays[possibleDays[i]] = possibleColors[i];
    }
/* for through each result
1: create a new MyDataPoint object and pass the properties from the db result entry to the object constructor
2: set the color using the coloredDays object associated with the resultSet[i].day
3:  put into the dataPoints array.
**/
    //set background of parent ... for fun ..
    document.querySelector("#parent-wrapper").style.background =
      "rgba(255,0,0,.4)";
    description.textContent = "DEfAULT CASE";
    description.style.color = "rgb(255, 0, 85)";

    //last  element is the helper array...
    for (let i = 0; i < resultSet.length - 1; i++) {
      dataPoints.push(
        new myDataPoint(
          resultSet[i].dataId,
          resultSet[i].day,
          resultSet[i].weather,
          resultSet[i].start_mood,
          resultSet[i].after_mood,
          resultSet[i].after_mood_strength,
          resultSet[i].event_affect_strength,
          resultSet[i].evnet_name,
          //map to the day ...
          coloredDays[resultSet[i].day],
          //last parameter is where should this go...
          document.querySelector("#childOne"),
          //which css style///
          "point"
        )
      );

      /** this code is rather brittle - but does the job for now .. draw a grid of data points ..
//*** drawing a grid ****/
      if (i % NUM_COLS === 0) {
        //reset x and inc y (go to next row)
        xPos = 0;
        yPos += CELL_SIZE;
      } else {
        //just move along in the column
        xPos += CELL_SIZE;
      }
      //update the position of the data point...
      dataPoints[i].update(xPos, yPos);
    } //for
    document.querySelector("#childOne").style.height = `${yPos + CELL_SIZE}px`;
  } //function

  /***********************************************/

  /*********************** NEW VISUALIZATIONS *****************************/
  /*********************** VISUALIZATION THREE *****************************
   * Query 3: Positive After-Mood
   * Goal: Show each positive mood as a "bubble".
   * The bubbles slowly float upward and restart when they reach the top.
   **************************************************************************/
  function displayThree(resultObj) {

    // reset our array that holds the datapoint objects
    dataPoints = [];

    // get the container where points will be drawn
    let parent = document.querySelector("#childOne");

    // change background and title so user knows what view this is
    document.querySelector("#parent-wrapper").style.background = "rgba(255,230,150,0.4)";
    description.textContent = "Positive After-Moods And also Have Event Names (Color)";
    description.style.color = "rgb(200,120,0)";

    // the array of database results
    let resultSet = resultObj.results;

    // assign a simple color to each positive mood
    const moodColors = {
      happy: "rgb(255,255,120)",
      serene: "rgb(170,210,255)",
      calm: "rgb(120,220,170)",
      well: "rgb(255,190,110)",
      neutral: "rgb(200,200,200)"
    };

    // loop through all results
    for (let i = 0; i < resultSet.length; i++) {

      // get the mood of the entry
      let mood = resultSet[i].after_mood;

      // pick the correct color (fallback is white)
      let color = moodColors[mood] || "white";

      // pick a random starting location on the screen
      let x = Math.random() * 800;
      let y = 300 + Math.random() * 200;

      // create the visual point using the myDataPoint class
      let dp = new myDataPoint(
        resultSet[i].dataId,
        resultSet[i].day,
        resultSet[i].weather,
        resultSet[i].start_mood,
        resultSet[i].after_mood,
        resultSet[i].after_mood_strength,
        resultSet[i].event_affect_strength,
        resultSet[i].event_name,
        color,
        parent,
        "point_two"
      );

      // place it on screen
      dp.update(x, y);
      dataPoints.push(dp);

      // how fast the bubble moves upward
      let speed = 0.5;

      // function that moves the bubble up a little bit at a time
      function floatUp() {
        y -= speed;

        // make bubble reappear at bottom if it goes off top
        if (y < 20) y = 350;

        // update position
        dp.update(x, y);

        // repeat forever (animation loop)
        requestAnimationFrame(floatUp);
      }

      // start the bubble animation
      floatUp();
    }
  }

  /*********************** VISUALIZATION FOUR *****************************
   * Query 4: Sorted by Event Name
   * Goal: Show dots in rows (like a grid).
   * Every event gets a different color.
   * Dots gently move up and down in a "wave".
   **************************************************************************/
  function displayFour(resultObj) {
    
    dataPoints = [];
    let parent = document.querySelector("#childOne");

    // background + title
    document.querySelector("#parent-wrapper").style.background = "rgba(220,200,255,0.3)";
    description.textContent = "Sorted by Event Name (COLOR)";
    description.style.color = "purple";

    let resultSet = resultObj.results;

    // layout values for arranging dots
    let x = 20;
    let y = 40;
    let spacingX = 20;  // how far each dot is from the next
    let spacingY = 30;
    let maxWidth = 900; // wrap to next row when past this

    // create color for each event name
    // simple list of colors to use
    let colorList = [
      "#fa929dff", "#fbbb73ff", "#FFFFBA", "#90f7a6ff", "#4598d8ff",
      "#B5B2FF", "#FFB2F5", "#ca4e7dff", "#CDB4DB", "#A2D2FF",
      "#BDE0FE", "#fe8efeff", "#fc81aeff", "#66eb99ff", "#f6caa6ff",
      "#ad6ca1ff", "#b1d676ff", "#99f9a2ff", "#f5b88fff", "#cbe99cff"
    ];

    // make a color for each event name
    let eventColors = {};
    for (let i = 0; i < resultObj.events.length; i++) {
      let eventName = resultObj.events[i];
      eventColors[eventName] = colorList[i % colorList.length]; 
    }

    // this array will store info needed for the wave animation
    let dots = [];

    // loop through each database entry
    for (let i = 0; i < resultSet.length; i++) {

      let eventName = resultSet[i].event_name;
      let color = eventColors[eventName];

      // make the visual dot
      let dp = new myDataPoint(
        resultSet[i].dataId,
        resultSet[i].day,
        resultSet[i].weather,
        resultSet[i].start_mood,
        resultSet[i].after_mood,
        resultSet[i].after_mood_strength,
        resultSet[i].event_affect_strength,
        resultSet[i].event_name,
        color,
        parent,
        "point_two"
      );

      dp.update(x, y);
      dataPoints.push(dp);

      // save its base position so animation can update it later
      dots.push({
        dp: dp,
        baseX: x,
        baseY: y,
        offset: i * 0.3    // slight delay for each dot so wave looks natural
      });

      // hover makes dot grow slightly
      dp.container.onmouseenter = () => dp.container.style.transform = "scale(1.3)";
      dp.container.onmouseleave = () => dp.container.style.transform = "scale(1)";

      // move right
      x += spacingX;

      // if too wide, start new row
      if (x > maxWidth) {
        x = 20;
        y += spacingY;
      }
    }

    // adjust size of container so all dots show
    parent.style.height = (y + 50) + "px";

    // create a small wave motion
    let t = 0;

    function animateWave() {
      t += 0.02;

      // update every dot's Y position based on a sine wave
      for (let i = 0; i < dots.length; i++) {
        let info = dots[i];
        let newY = info.baseY + Math.sin(t + info.offset) * 8;
        info.dp.update(info.baseX, newY);
      }

      requestAnimationFrame(animateWave);
    }

    // start the wave animation
    animateWave();
  }


  /*********************** VISUALIZATION FIVE *****************************
   * Query 5: Monday or Tuesday
   * Goal: Represent entries as "cars" that move horizontally.
   * Monday cars drive on the top lane.
   * Tuesday cars drive on the bottom lane.
   * Stronger affect = faster driving.
   **************************************************************************/
  function displayFive(resultObj) {

    dataPoints = [];
    let parent = document.querySelector("#childOne");

    document.querySelector("#parent-wrapper").style.background = "rgba(200,230,255,0.3)";
    description.textContent = "Monday vs Tuesday, Color by After Mood and Faster by Even Strength";
    description.style.color = "rgb(0,90,160)";

    let resultSet = resultObj.results;

    // lane positions
    let mondayLane = 150;
    let tuesdayLane = 300;

    // colors based on the mood
    let moodColors = {
      happy: "yellow",
      serene: "rgba(173, 208, 235, 1)",
      calm: "lightgreen",
      neutral: "gray",
      angry: "red",
      moody: "purple",
      anxious: "pink",
      sad: "rgba(22, 64, 96, 1)",
      well: "orange"
    };

    parent.style.height = "400px";

    // loop through each item
    for (let i = 0; i < resultSet.length; i++) {
      let entry = resultSet[i];

      // choose which lane based on Monday or Tuesday
      let laneY = (entry.day === "Monday") ? mondayLane : tuesdayLane;

      // pick a color
      let color = moodColors[entry.after_mood] || "white";

      // create the visual point
      let dp = new myDataPoint(
        entry.dataId,
        entry.day,
        entry.weather,
        entry.start_mood,
        entry.after_mood,
        entry.after_mood_strength,
        entry.event_affect_strength,
        entry.event_name,
        color,
        parent,
        "point_two"
      );

      // starting x position (random)
      let x = Math.random() * 600;
      dp.update(x, laneY);

      // affect strength controls speed
      let speed = 1 + entry.event_affect_strength * 0.2;

      // function to move the car across the screen
      function move() {
        x += speed;

        // if car goes too far, restart on left side
        if (x > 900) x = -20;

        dp.update(x, laneY);
        requestAnimationFrame(move);
      }

      // start animation
      move();

      dataPoints.push(dp);
    }
  }


  /*********************** VISUALIZATION SIX *****************************
   * Query 6: Both moods negative
   * Goal: Create small lightning streaks that wiggle and flicker.
   * Each point is narrow and slightly tilted to look like lightning.
   **************************************************************************/
  function displaySix(resultObj) {

    dataPoints = [];
    let parent = document.querySelector("#childOne");

    // dark stormy background
    document.querySelector("#parent-wrapper").style.background = "rgba(20,20,30,0.9)";
    description.textContent = "Negative Mood Storm And Color by Start/After Mood";
    description.style.color = "violet";

    let resultSet = resultObj.results;

    // colors for negative moods
    let badColors = ["purple", "darkred", "navy", "crimson", "indigo"];

    // loop through each entry
    for (let i = 0; i < resultSet.length; i++) {

      // pick a color from the list
      let color = badColors[i % badColors.length];

      // create the lightning piece
      let dp = new myDataPoint(
        resultSet[i].dataId,
        resultSet[i].day,
        resultSet[i].weather,
        resultSet[i].start_mood,
        resultSet[i].after_mood,
        resultSet[i].after_mood_strength,
        resultSet[i].event_affect_strength,
        resultSet[i].event_name,
        color,
        parent,
        "point_two"
      );

      // make the shape look like a lightning streak
      dp.container.style.width = "5px";
      dp.container.style.height = "15px";
      dp.container.style.borderRadius = "0";
      dp.container.style.transform = "skewX(-20deg)";

      // random starting position
      let x = Math.random() * 850;
      let y = Math.random() * 450;
      dp.update(x, y);

      let flicker = 0;

      // animation: soft jitter + soft flicker
      function animate() {
        // tiny random shaking
        let jx = x + (Math.random() - 0.5) * 2;
        let jy = y + (Math.random() - 0.5) * 2;
        dp.update(jx, jy);

        // flicker brightness gently
        flicker += 0.05;
        dp.container.style.opacity = 0.4 + Math.sin(flicker) * 0.2;

        requestAnimationFrame(animate);
      }

      animate();
      dataPoints.push(dp);
    }
  }


}