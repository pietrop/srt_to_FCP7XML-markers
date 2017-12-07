'use strict';
const fs = require('fs');
const convertSrtToFCP7xml = require('./index.js').convertSrtToFCP7xml;

var xmlSampleOutputFileName = './sampleOutputFCP7XMLs/sampleOutput.xml';
var srtSampleFileName = './sampleSrts/Kyle_captions.srt';


// convertSrtToFCP7xml(srtSampleFileName,xmlSampleOutputFileName);

var xmlOutputSampleContent = fs.readFileSync(xmlSampleOutputFileName).toString();
var srtSampleFileConent =  fs.readFileSync(srtSampleFileName).toString();

test('testing main convertSrtToFCP7xml with srt file name, expectign string content of xml', () => {
	expect(convertSrtToFCP7xml({srt: srtSampleFileName})).toEqual(xmlOutputSampleContent);
});



test('testing main convertSrtToFCP7xml with srt file content as string, expectign string content of xml', () => {
	expect(convertSrtToFCP7xml({srt: srtSampleFileConent})).toEqual(xmlOutputSampleContent);
});
