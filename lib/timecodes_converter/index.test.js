'use strict';

var convertTimeFrames 		= require('./index.js').convertTimeFrames;
// var convertTimeCodeToMilliseconds	= require('./index.js').convertTimeCodeToMilliseconds
// // set the frame rate or Frame Rat as we like to call him
// var frameRat = 30 // fps
// var numOfFrames = 60 // animation frame count
// var animTime = "00:01:00:00" // time code

// var a = convertTimeToFrames(animTime, frameRat);
// var result = animTime + " at " + frameRat + " fps\n = " + a + " frames.";
// alert(result);

const fps = 30;
//13
var sampleTimecode = '00:00:41,160';
var frame1 = 1230;

/*
<marker>
<comment>merchandise from antiques collectibles
farm/ranch equipment
</comment>
<name>13</name>
<in>1140</in>
<out>1230</out>
</marker>

13
00:00:38,030 --> 00:00:41,160
merchandise from antiques collectibles
farm/ranch equipment

*/

var sampleTimecode3 = '00:00:38,030';
var frame3 = 1140;

//3 
var sampleTimecode2 = '00:00:06,500 ';
var frame2 = 180;


test('testing convert Time Code To frames', () => {
	
	expect(convertTimeFrames(sampleTimecode, fps)).toEqual(frame1);
});


test('testing convert Time Code To convertTimeFrames 2', () => {
	
	expect(convertTimeFrames(sampleTimecode2, fps)).toEqual(frame2);
});


test('testing convert Time Code To convertTimeFrames 2', () => {
	
	expect(convertTimeFrames(sampleTimecode3, fps)).toEqual(frame3);
});

// 
// 

// test('testing convert Time Code To Seconds', () => {
	
// 	expect(convertTimeCodeToSeconds(sampleTimecode)).toEqual(sampleConvertedToseconds);
// });


// test('testing convert Time Code To MilliSeconds', () => {
	
// 	expect(convertTimeCodeToMilliseconds(sampleTimecode)).toEqual(sampleConvertedToMilliseconds);
// });


// test('testing convert Time Code To Seconds 2', () => {
	
// 	expect(convertTimeCodeToSeconds(sampleTimecode)).toEqual(sampleConvertedToseconds);
// });


// test('testing convert Time Code To MilliSeconds 2', () => {
	
// 	expect(convertTimeCodeToMilliseconds(sampleTimecode)).toEqual(sampleConvertedToMilliseconds);
// });