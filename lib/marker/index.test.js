'use strict';

const Marker = require('./index.js');

var markerTmp; 
var sampleMarkerJSONexport; 
// var markerTmp = new Marker({comment: "test comment", name: "test name", in: 3128, out: 4256 })

beforeAll(() => {
  	markerTmp = new Marker( "test comment","test name", 3128, 4256 );

	sampleMarkerJSONexport =  { "comment": 'test comment', "name": 'test name', "in": 3128, "out": 4256 }
});


test('testing Marker class return comment', () => {
	
	expect(markerTmp.comment).toBe("test comment");
});

test('testing Marker class return name', () => {
	
	expect(markerTmp.name).toBe("test name");
});

test('testing Marker class return in', () => {
	
	expect(markerTmp.startTime).toBe(3128);
});

test('testing Marker class return out', () => {
	
	expect(markerTmp.endTime).toBe(4256);
});


test('testing Marker class return XML', () => {
	expect(markerTmp.returnXML()).toBe(`<marker>
             <comment>test comment</comment>
             <name>test name</name>
             <in>3128</in>
             <out>4256</out>
         </marker>`);
});


test('testing Marker class return JSON', () => {
	expect(markerTmp.returnJSON()).toEqual(sampleMarkerJSONexport);
});
