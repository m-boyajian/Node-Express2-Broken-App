function timeWord(time) {
  // Convert input to an array if it's a string
  if (typeof time !== 'string') {
    return "Invalid time format";
  }

  const timeArray = time.match(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/);

  if (!timeArray) {
    // Handle invalid input
    return "Invalid time format";
  }

  let [hour, minute] = timeArray.slice(1); // Extract hour and minute from the matched groups

  // Determines whether it's AM or PM
  let period;

  // Convert hour to integer for consistent comparison
  const hourInt = parseInt(hour);

  if (hourInt === 0 && parseInt(minute) === 0) {
    return 'midnight';
  } else if (hourInt === 12 && parseInt(minute) === 0) {
    return 'noon';
  } else {
    if (hourInt === 0 || hourInt === 12) {
      // If hour is 00 or 12, use '12' as newHour
      hour = '12';
    } else if (hourInt > 12) {
      // If hour is greater than 12, convert to 12-hour format
      hour = (hourInt % 12).toString();
    }
    period = hourInt < 12 ? 'am' : 'pm';
  }  

  const timeWords = timeToWords(hour, minute, period);
  console.log(`Debug: hour=${hour}, minute=${minute}, period=${period}, timeWords=${timeWords}`);

  // Ensure consistency by converting to lowercase
  return timeWords;
}

function timeToWords(hourStr, minutes, period) {
  const digits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "ten", "twenty", "thirty", "forty", "fifty"];

  // Convert hour to integer for consistent comparison
  const hour = parseInt(hourStr);
  minutes = parseInt(minutes);

  // Special case for noon and midnight
  if (hour === 12 && minutes === 0) {
    return period.toLowerCase() === "pm" ? "noon" : "midnight";
  } else if (hour === 12) {
    // If hour is 12 and minutes are not 0, add "noon"
    return period.toLowerCase() === "pm" ? "twelve" : "midnight";
  }

  // Initialize the words variable with an empty string
  let words = "";

  // Convert hours to words
  if (hour >= 1 && hour <= 9) {
    // If hour is between 01 and 09, add the word representation of the digit
    words += digits[hour - 1];
  } else if ((hour >= 10 && hour <= 12) || hour === 0) {
    // If hour is between 10 and 12 or midnight, add the word representation from the teens array
    words += (hour === 0) ? teens[0] : teens[hour - 11];
  } else if (hour >= 13 && hour <= 19) {
    // If hour is between 13 and 19, add the word representation from the teens array
    words += teens[hour - 11];
  } else if (hour >= 20 && hour <= 23) {
    // If hour is between 20 and 23, add the word representation from the tens array
    words += tens[Math.floor(hour / 10)];

    if (hour === 10) {
      // If the hour is 10, add "ten" from the tens array
      words += " " + tens[1]; 
    } else if (hour % 10 !== 0) {
      // If the second digit is not 0, add the word representation of the digit
      words += " " + digits[hour % 10 - 1];
    }    
  }

  // Add separator between hours and minutes
  if (minutes !== 0 && !(hour === 12 && minutes === 0)) {
    words += " ";
  }

  // Handle special cases for minutes
  if (minutes === 0) {
    // If minutes is 00, add "o'clock" to the words
    words += (hour === 0 || hour === 12) ? "o'clock" : " o'clock";
  } else if (minutes >= 1 && minutes <= 9) {
    // If minutes is between 1 and 9, add "oh" before the minute
    words += "oh " + digits[parseInt(minutes) - 1];  
  } else if (minutes === 12) {
    // If minutes is 12, add "twelve" to the words
    words += "twelve";
  } else if (minutes >= 10 && minutes <= 59) {
  // For all other minute values, handle them based on the tens and digits arrays
  if (minutes % 10 === 0) {
    // If the minute value is a multiple of 10, use the tens array
    words += tens[minutes / 10];
  } else if (minutes < 20) {
    // If the minute value is less than 20, use the teens array
    words += teens[minutes - 11];
  } else {
    // Otherwise, combine the word representation from the tens and digits arrays
    words += tens[Math.floor(minutes / 10)] + " " + digits[minutes % 10 - 1];
  }
  } else if (minutes >= 1 && minutes <= 9) {
    // If minutes is between 1 and 9, add "oh" before the minute
    words += "oh " + digits[parseInt(minutes)];
  }
    
  // Add AM/PM indicator if period is defined
  if (period !== undefined && period.toLowerCase() === 'pm') {
    words += " pm";
  } else if (period !== undefined && period.toLowerCase() === 'am') {
    words += " am";
  }

  return words.trim();
}

function convertToWords(formattedTime) {
  // Extracting hours, minutes, and period from formattedTime
  const [hour, minute, period] = formattedTime.split(/\s|:/);

  if (period !== undefined && period !== '') {
    // Update the function call to use the 12-hour format
    const timeWords = timeToWords((hour === '00' || hour === '12') ? '12' : (parseInt(hour) % 12).toString(), minute, period);
    return timeWords;
  } else {
    // Instead of returning "Invalid time format," return an empty string
    return '';
  }
}

module.exports = { timeWord, convertToWords };
