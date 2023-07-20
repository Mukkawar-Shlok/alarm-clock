//globals
var alarmArray = [];
var alarmTimeouts = []; // Array to store the timeout references
function updateTime() {
    const now = new Date();
    let hour = now.getHours();
    const second = now.getSeconds();
    let minute = now.getMinutes();

    let ampm = 'am';

    if (hour > 12) {
        hour -= 12;
        ampm = 'pm';
    }

    hour = hour.toString().padStart(2, '0');
    minute = minute.toString().padStart(2, '0');

    document.getElementById('hour').textContent = hour;
    document.getElementById('min').textContent = minute;
    document.getElementById('sec').textContent = second;
    document.getElementById('ampm').textContent = ampm;

    const currentTime = `${hour}:${minute}:${ampm}`;

    // Check for alarm in the alarmArray
    for (let i = 0; i < alarmArray.length; i++) {
        const alarmTime = alarmArray[i][0].toString().padStart(2, '0') + ':' + alarmArray[i][1].toString().padStart(2, '0') + ':' + alarmArray[i][2];
        if (currentTime === alarmTime) {
            // Call soundAlarm() function when an alarm matches the current time
            soundAlarm();
            break; // Break the loop after calling soundAlarm() for the first matched alarm
        }
    }
}

setInterval(updateTime, 1000); // Update time every second

function myFunction() {
    var alarmH = document.getElementById("hour-input").value;
    var alarmM = document.getElementById("minute-input").value;
    var alarmS = document.getElementById("ampm-select").value;
    var temp = [alarmH, alarmM, alarmS];

    // Check if temp array exists in alarmArray
    var exists = alarmArray.some(function (arr) {
        return arr[0] === alarmH && arr[1] === alarmM && arr[2] === alarmS;
    });

    if (exists) {
        console.log("Already Exists");
    } else {
        for (var i = 0; i < alarmTimeouts.length; i++) {
            clearTimeout(alarmTimeouts[i]);
        }
        alarmArray.push(temp);
        createAlarmList();
    }
}

function createAlarmList() {
    var alarmList = document.getElementById('alarm-list');

    // Clear the existing list
    alarmList.innerHTML = '';

    // Iterate over alarmArray and create list items
    for (var i = 0; i < alarmArray.length; i++) {
        var alarm = alarmArray[i];
        var listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        var data_item = alarm[0] + ':' + alarm[1] + ' ' + alarm[2];
        listItem.textContent = data_item;

        // Create a delete button for each alarm item
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        // Append the delete button to the list item
        deleteButton.setAttribute('value', data_item);
        listItem.appendChild(deleteButton);
        alarmList.appendChild(listItem);
    }
}

var alarmTimeout; // Variable to store the timeout reference

function soundAlarm() {
    // console.log('in soundAlarm');
    var alarmAudio = document.getElementById('alarmSound');

    // Play the alarm sound
    alarmAudio.play();

    // Stop the alarm sound after 5 seconds
    var timeoutRef = setTimeout(function () {
        alarmAudio.pause();
        alarmAudio.currentTime = 0; // Reset audio start
    }, 60000);

    //timeout 
    alarmTimeouts.push(timeoutRef);

    return;
}


$('#alarm-list').on('click', '.btn', function () {
    var data = $(this).attr('value');
    // console.log(data);
    var timeArray = data.split(' ');

    // Output: [ '10:48', 'pm' ]

    // Further split the first element in the array to get hours and minutes
    var timeParts = timeArray[0].split(':');

    var hours = parseInt(timeParts[0]);
    var minutes = parseInt(timeParts[1]);

    // Combine all the elements in the final array
    var finalArray = [hours, minutes, timeArray[1]];
    console.log(finalArray);

    //now delete it from array
    var index = alarmArray.findIndex(function (arr) {
        return arr[0] == finalArray[0] && arr[1] == finalArray[1] && arr[2] == finalArray[2];
    });
    // Check if the array exists
    if (index !== -1) {
        // Delete the array using splice
        alarmArray.splice(index, 1);
        createAlarmList();
    }

});


