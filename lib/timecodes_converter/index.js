/**
 * Convert srt timecode to milliseconds 
 * for use when converting srt timecode for FCP7 XML markers, which are in milliseconds.
 * originally from https://stackoverflow.com/questions/31385418/convert-timecode-to-seconds
 */

'use strict';

function convertTimeFrames(timeString, fps){

  var timeArray = timeString.split(":");
  // console.log('timeArray ',timeArray);
  var hours   = parseInt(timeArray[0]) * 60 * 60;
  var minutes = parseInt(timeArray[1]) * 60;
  var seconds = parseInt(timeArray[2].split(",")[0]);
  var milliseconds = parseInt(timeArray[2].split(",")[1]);

  var totalTime = (hours*60*60) + (minutes*60) + seconds //+ milliseconds; 

  return totalTime * fps;
}



module.exports.convertTimeFrames = convertTimeFrames;

