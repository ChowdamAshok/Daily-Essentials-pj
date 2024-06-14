// script.js
document.getElementById('check-5').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
});
window.onload = yourCode;
function yourCode() {
   // Navbar
  let menu = document.querySelector('#menu-icon');
  let navbar = document.querySelector('.navbar');

  menu.onclick  = (open) => {
      navbar.classList.toggle('active');
  }

  window.onscroll = () => {
      navbar.classList.remove('active');
  }
  // Dark Mode
  let darkmode = document.querySelector('#darkmode');

  darkmode.onclick = () => {
      if(darkmode.classList.contains('bx-moon')){
          darkmode.classList.replace('bx-moon','bx-sun');
          document.body.classList.add('active');
      }else{
          darkmode.classList.replace('bx-sun','bx-moon');
          document.body.classList.remove('active');
      }
  }

  // Scroll Reveal
  const sr = ScrollReveal ({
      origin: 'left',
      distance: '400px',
      duration: 2000,
      reset: true
  });
  sr.reveal(`.container`, {
interval: 200
})
}

  
// Clock and Date
function updateClockAndGreeting() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const greetingElement = document.getElementById('greeting');

    // Update clock hands
    document.getElementById('hour').style.transform = `rotate(${(hours % 12) * 30 + (minutes / 2)}deg)`;
    document.getElementById('minute').style.transform = `rotate(${minutes * 6}deg)`;
    document.getElementById('second').style.transform = `rotate(${seconds * 6}deg)`;

    // Update date
    const dateElement = document.getElementById('date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.innerHTML = now.toLocaleDateString('en-US', options);

    // Determine greeting message
    let greetingMessage = '';
    if (hours < 12) {
        greetingMessage = 'Good Morning!';
    } else if (hours < 18) {
        greetingMessage = 'Good Afternoon!';
    } else {
        greetingMessage = 'Good Evening!';
    }
    greetingElement.innerHTML = greetingMessage;
}

// Initial call to set the clock and greeting
updateClockAndGreeting();

// Update clock and greeting every second
setInterval(updateClockAndGreeting, 1000);

// Weather
document.getElementById('get-weather').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    const apiKey = '1db902b08ed6c1da09f1985dbeb81edb';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = `
                <p>${data.name}</p>
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
            document.getElementById('weather-info').innerHTML = weatherInfo;
            updateBackground(data.weather[0].icon);
        })
        .catch(() => {
            document.getElementById('weather-info').innerHTML = '<p>Location not found</p>';
        });
});

function updateBackground(icon) {
    const weatherBlock = document.getElementById('weather');
    switch (icon) {
        case '01d':
            weatherBlock.style.backgroundImage = 'url("https://i.makeagif.com/media/4-05-2016/utmjeB.gif")';
            break;
        case '01n':
            weatherBlock.style.backgroundImage = 'url("https://c1.wallpaperflare.com/preview/442/55/584/sunset-landscape-nature-sunny.jpg")';
            break;
        case '02d':
        case '03d':
        case '04d':
            weatherBlock.style.backgroundImage = 'url("https://i.makeagif.com/media/4-15-2015/EYjkwe.gif")';
            break;
        case '02n':
        case '03n':
        case '04n':
            weatherBlock.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2021/10/15/14/44/sky-6712751_640.jpg")';
            break;
        case '09d':
        case '10d':
        case '11d':
            weatherBlock.style.backgroundImage = 'url("https://i.pinimg.com/originals/e1/b4/a6/e1b4a60876593bc5c849b2a8e9029bec.gif")';
            break;
        case '09n':
        case '10n':
        case '11n':
            weatherBlock.style.backgroundImage = 'url("https://png.pngtree.com/background/20230607/original/pngtree-rainy-night-sky-with-a-small-light-at-the-bottom-picture-image_2902401.jpg")';
            break;
        case '50d':
        case '50n':
            weatherBlock.style.backgroundImage = 'url("https://4.bp.blogspot.com/-H2y2KH2cVa0/XBwbOmRNSII/AAAAAAAABbE/lnIDSSGY21Qj5w7zOHLMTVsrcFuJguCDQCLcBGAs/s640/tumblr_nn86gouEZC1rz8mvdo1_400.gif")';
            break;
        case '13d':
        case '13n':
            weatherBlock.style.backgroundImage = 'url("https://4.bp.blogspot.com/-H2y2KH2cVa0/XBwbOmRNSII/AAAAAAAABbE/lnIDSSGY21Qj5w7zOHLMTVsrcFuJguCDQCLcBGAs/s640/tumblr_nn86gouEZC1rz8mvdo1_400.gif")';
            break;
        case '03d':
        case '03n':
            weatherBlock.style.backgroundImage = 'url("https://i.makeagif.com/media/4-26-2017/eTBCqD.gif")';
            break;
        default:
            weatherBlock.style.backgroundImage = 'url("https://i.redd.it/h1dpe0ljfb271.jpg")';
            break;
    }
}

// To-Do List
let taskCounter = 1;

function saveTask() {
  var taskInput = document.getElementById("taskInput");
  var dateInput = document.getElementById("dateInput");

  var task = taskInput.value;
  var date = dateInput.value;

  if (task.trim() === "" || date.trim() === "") {
    alert("Please enter a task and date.");
    return;
  }

  var taskContainer = document.createElement("div");
  taskContainer.className = "task-container";

  var taskNumber = document.createElement("span");
  taskNumber.className = "task-number";
  taskNumber.textContent = taskCounter + ". ";

  var taskElement = document.createElement("span");
  taskElement.textContent = task + " - " + date;

  var editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.onclick = function() {
    editTask(taskElement);
  };

  var editIcon = document.createElement("img");
  editIcon.src = "https://cdn-icons-gif.flaticon.com/6454/6454112.gif";
  editIcon.className = "button-icon";
  editButton.appendChild(editIcon);

  var deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.onclick = function() {
    deleteTask(taskContainer);
  };

  var deleteIcon = document.createElement("img");
  deleteIcon.src = "https://cdn-icons-gif.flaticon.com/11677/11677485.gif"; 
  deleteIcon.className = "button-icon";
  deleteButton.appendChild(deleteIcon);

  taskContainer.appendChild(taskNumber);
  taskContainer.appendChild(taskElement);
  taskContainer.appendChild(editButton);
  taskContainer.appendChild(deleteButton);

  document.getElementById("tasksContainer").appendChild(taskContainer);

  taskInput.value = "";
  dateInput.value = "";

  taskCounter++;
}

function editTask(taskElement) {
  var newTask = prompt("Edit task:", taskElement.textContent.split(" - ")[0]);
  if (newTask !== null) {
    taskElement.textContent = newTask + " - " + taskElement.textContent.split(" - ")[1];
  }
}

function deleteTask(taskContainer) {
  if (confirm("Are you sure you want to delete this task?")) {
    taskContainer.remove();
    updateTaskNumbers();
  }
}

function updateTaskNumbers() {
  var taskContainers = document.querySelectorAll(".task-container");
  taskCounter = 1;
  taskContainers.forEach(function(taskContainer) {
    var taskNumber = taskContainer.querySelector(".task-number");
    taskNumber.textContent = taskCounter + ". ";
    taskCounter++;
  });
}


// Calculator

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteChar() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Error';
    }
}

//countdown timer
let timer;

function startTimer() {
    let hours = parseInt(prompt("Enter hours:"));
    let minutes = parseInt(prompt("Enter minutes:"));
    let seconds = parseInt(prompt("Enter seconds:"));

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        alert("Please enter valid numbers for hours, minutes, and seconds.");
        return;
    }

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    timer = setInterval(function() {
        totalSeconds--;
        if (totalSeconds < 0) {
            clearInterval(timer);
            alert("Time's up!");
        } else {
            let hoursLeft = Math.floor(totalSeconds / 3600);
            let minutesLeft = Math.floor((totalSeconds % 3600) / 60);
            let secondsLeft = totalSeconds % 60;

            document.getElementById("hours").innerText = formatTime(hoursLeft);
            document.getElementById("minutes").innerText = formatTime(minutesLeft);
            document.getElementById("seconds").innerText = formatTime(secondsLeft);
        }
    }, 1000);
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

document.getElementById("startTimerBtn").addEventListener("click", startTimer);