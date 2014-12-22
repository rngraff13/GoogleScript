//These two functions are designed for a google drive form.
//Theese functions are triggered on the submission of their associated google form 
//and they will create a calendar event based on the answers to the submission form.

//////////////////////////////////////////////////////////////////////////////////
//The first form question asks for a name or ID
//The second question asks the user to select from a list of options that are the names of calendars-
//In this specific example, there are many calendars that each represent a different space that can be
//reserved. Each space has an associated calendar.
//The third and fourth questions prompt the user for start and end dates and times for their requested
//reservation.
//////////////////////////////////////////////////////////////////////////////////

function createEvent() {
  var form = FormApp.getActiveForm();
  var formName = form.getTitle();
  var responses = form.getResponses();
  responses = responses[responses.length-1].getItemResponses();
  for(var i = 0; i < responses.length; i++){
    responses[i] = responses[i].getResponse(); //properly formats each response into a string.
  }
  var cal = CalendarApp.getCalendarsByName(responses[1]);
  var calName = cal[0].getName();
  var currentReservations = cal[0].getEvents(new Date(parseDate(responses[2])), new Date(parseDate(responses[3])));
  if(currentReservations.length > 0){ 
    //This is simply to check to make sure that the users cannot have multiple reservations for the same
    //place at the same time. 
  }
  else{
    cal[0].createEvent("Reservation for:" + responses[0], new Date(parseDate(responses[2])), new Date(parseDate(responses[3])));
  }
}

//The getResponses and getResponse methods do not return a string for dates that is formatted properly
//to enable new Date(str) to work. The follow function takes the output string from the getResponse method
//and formats the string to be suitable as input for creating a new Date object.
function parseDate(date) {
  var parsed;
  var month;
  var day;
  var year;
  var hours;
  var minutes;
  var seconds;
  var timeZone;
  day = date.substring(8,10);
  year = date.substring(0, 4);
  hours = date.substring(11, 13);
  minutes = date.substring(14, 16);
  seconds = "00";
  timeZone = "EST";
  switch(date.substring(5, 7)){
    case "01":
      month = "January";
      break;
    case "02":
      month = "February";
      break;
    case "03":
      month = "March";
      break;
    case "04":
      month = "April";
      break;
    case "05":
      month = "May";
      break;
    case "06":
      month = "June";
      break;
    case "07":
      month = "July";
      break;
    case "08":
      month = "August";
      break;
    case "09":
      month = "September";
      break;
    case "10":
      month = "October";
      break;
    case "11":
      month = "November";
      break;
    case "12":
      month = "December";
      break;
  }
  parsed = month + " " + day + ", " + year + " " + hours + ":" + minutes + ":" + seconds + " " + timeZone;
  
  return parsed;
}