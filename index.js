'use strict';
const fs  = require('fs');
const path=require('path');
const XML = require('pixl-xml');
const isValid = require('is-valid-path');
const srtParser  = require('srt_parser_composer').parser;
const Marker = require('./lib/marker/index.js');
const convertTimeFrames = require('./lib/timecodes_converter/index.js').convertTimeFrames;

var xmlFCP7TemplateFilename = path.join(__dirname,'FCP7XMLTemplate', 'template.xml'); 


function convertSrtToFCP7xml(options, cb){
	var srtFile = options.srt;
	var xmlOutputFileName = options.xmlOutputFileName;
	var fps = options.fps;

	if(fps === undefined){
		fps = 30;
	} 

	// add logic that if it is srtFile, eg detect path, then opens file, if it is string then works with the content?

	/**
	 * Read FCP7 XML file into string 
	 * parse xml to json 
	 */
	var doc = XML.parse( xmlFCP7TemplateFilename, { preserveAttributes: true,  preserveDocumentNode: false , lowerCase: false } );
	// console.log(JSON.stringify(doc, null, 2));
	// //reset array of FCP7 XML "template"
	doc.sequence.marker = [];


	// change sequence so that timebase is also set to fps. 
	
	/**
	 *  Open SRT File using srt parser composer module, this returns a srt-json data structure 
	 *  https://www.npmjs.com/package/srt_parser_composer#example-json-output
	 */
	
	// check if it's a valid file path for srtFile or the srt file content as a string 
	if(isValid(srtFile)){
		srtParser.parseSrtFileToJson(srtFile, function(srtJson){
		// //  console.log(JSON.stringify(srtJson, null, 2));
		  srtJson.forEach((srtJsonLine)=>{
		  	// create marker for each line 
		    var markerTmp = new Marker(srtJsonLine.text, srtJsonLine.id, convertTimeFrames(srtJsonLine.startTime, fps),  convertTimeFrames(srtJsonLine.endTime, fps));
		    // add to FCP7 XML - Json data structure under marker's section. 
		    doc.sequence.marker.push(markerTmp.returnJSON());
		  });
		});
		//if srtFile is a string with the content of an srt file. 
	}else{
		// srtParser.parseSrtContentToJson
		srtParser.parseSrtContentToJson(srtFile, function(srtJson){
		// //  console.log(JSON.stringify(srtJson, null, 2));
		  srtJson.forEach((srtJsonLine)=>{
		  	// create marker for each line 
		    var markerTmp = new Marker(srtJsonLine.text, srtJsonLine.id, convertTimeFrames(srtJsonLine.startTime),  convertTimeFrames(srtJsonLine.endTime));
		    // add to FCP7 XML - Json data structure under marker's section. 
		    doc.sequence.marker.push(markerTmp.returnJSON());
		  });
		});
	}

	/**
	 * Convert JSON representation of FCP7 XML to XML
	 */
	var xmlString = XML.stringify( doc, 'xmeml', 0, "\t", "\n", false );
	// console.log( xmlString );
	// 
	/**
	 * output xml 
	 * as file if destination specified, as content string if not.
	 */
	if(xmlOutputFileName !== undefined){
		if(cb){cb(xmlOutputFileName)}else{return xmlOutputFileName}
		fs.writeFileSync(xmlOutputFileName, xmlString);
	}else{
		if(cb){cb(xmlString)}else{return xmlString};
	}
}

module.exports.convertSrtToFCP7xml = convertSrtToFCP7xml; 