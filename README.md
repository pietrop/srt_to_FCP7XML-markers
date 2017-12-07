# README `srt to -> FCP XML Markers`

A node module to convert an srt, subtitle file, into adobe premiere markers, to make it easier to search text in video within premiere. 

## Installation 


To add the module to your node project, for now you can install it like so, when it gets more feedback, I might add it to npm. 

```
npm install  https://github.com/pietrop/srt_to_FCP7XML-markers.git -save
```

## Usage

For maximum flexibility, the following scenarios are covered:

- srt file input -> xml file output 
- srt file  -> xml file content 
- srt file content  -> xml file content
- srt file content  -> xml file  

### srt file input -> xml file output 

File to file, specifying an srt file path as an input, and an xml file path for where to save the desired output. 

<!-- TODO: check on require index, here and other examples.  -->

```js 
const convertSrtToFCP7xml = require('./index.js').convertSrtToFCP7xml;

var srtSampleFileName = './sampleSrts/Kyle_captions.srt';
var xmlSampleOutputFileName = './sampleOutputFCP7XMLs/sampleOutput.xml';

convertSrtToFCP7xml(srtSampleFileName, xmlSampleOutputFileName);
```

See [`sampleOutputFCP7XMLs`](./sampleOutputFCP7XMLs) for example of the FCP7 XML output or [`FCP7XMLTemplate`](./FCP7XMLTemplate) for template.

Also see[`sampleSrts`]('./sampleSrts') for an example `srt` file.


### srt file  -> xml file content 

```js
const convertSrtToFCP7xml = require('./index.js').convertSrtToFCP7xml;
var srtSampleFileName = './sampleSrts/Kyle_captions.srt';
var xmlFileContent = convertSrtToFCP7xml(srtSampleFileName);
```

## srt file content  -> xml file content 

using the concept of method overloading the funciton recognises that it's not a valid path but that it's the content of the srt and return the content. 

```js
const convertSrtToFCP7xml = require('./index.js').convertSrtToFCP7xml;
var srtSampleFileName = './sampleSrts/Kyle_captions.srt';
var srtSampleFileConent =  fs.readFileSync(srtSampleFileName).toString();

var xmlFileContent = convertSrtToFCP7xml(srtSampleFileConent);
```


### srt file content  -> xml file  


```js
const convertSrtToFCP7xml = require('./index.js').convertSrtToFCP7xml;
var xmlSampleOutputFileName = './sampleOutputFCP7XMLs/sampleOutput.xml';

var srtSampleFileName = './sampleSrts/Kyle_captions.srt';
var srtSampleFileConent =  fs.readFileSync(srtSampleFileName).toString();

var xmlFileContent = convertSrtToFCP7xml(srtSampleFileConent, xmlSampleOutputFileName);
```



## High level Overview 

How the module works at a high level overview.

- convert FCP7 XML "template" to JSON
	- in `FCP7XMLTemplate/template.xml`
	- using `pixl-xml`

- identify markers element within the data structure 
	- `doc.sequence.marker`

- open srt file 
	- or work with srt file content as input. 

- convert srt file to json 
	- srt parser composer module

- loop through srt-json "line" elements to create markers objects. 
	- `Marker` class 

	- add marker objects to FCP7-XML-JSON data structure

- Compose FCP7-XML-JSON to xml.
	- using `pixl-xml`
	- returning as string context of the xml 
	- or writing an xml file if file name/path is provided. 


## FAQs

### Why `FCP7 XML`?
FCP7 XML because it is a format supported by premire, that allows to define markers, and imported into Adobe Premiere. As Premiere can export markers as a CSV file but does not seem to have an option to import them `(?)`.

### What's does the marker attribute look like`FCP7 XML`?

See extract below

```xml
<marker>
	<comment>test marker comment</comment>
	<name>test marker name</name>
	<in>1557</in>
	<out>2571</out>
</marker>
```

Where the `in` and `out` are specified in frames. (`in` is also reserved word in javascript so refered to `in` and `out` as `startTime` and `endTime`).

For full xml, to see them in context, see folder, [`sampleXMLs/template.xml`](./FCP7XMLTemplate/template.xml). 


<!-- 

### What other options are there to do this?

...

 -->

## Tests

Minimal test coverage for maker class and timecode to frames converter module using [https://facebook.github.io/jest/](`jest`).


## Dependencies

- [`pixl-xml`](https://www.npmjs.com/package/pixl-xml)
- [`jest`](https://facebook.github.io/jest/)
- `srt_parser_composer`,[npm](https://www.npmjs.com/package/srt_parser_composer), [github](https://github.com/pietrop/srtParserComposer)


## Other background 

- [JS ES6 Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [srt file](https://en.wikipedia.org/wiki/SubRip) (in particular note that the timecode is in `hours:minutes:seconds,milliseconds`)
- [Overview of the Final Cut Pro XML Interchange Format](https://documentation.apple.com/en/finalcutpro/usermanual/index.html#chapter=97%26section=3%26tasks=true)