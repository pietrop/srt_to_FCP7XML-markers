/**
 *
 *
 ```xml
 <marker>
    <comment>test comment</comment>
    <name>test name</name>
    <in>3128</in>
    <out>4256</out>
</marker>
```
 *
 * Example usage : comment, name, in, out
 * 
 ```js
 var markerTmp = new Marker("test comment",  "test name",  3128,  4256 })
```
 *
 * `in` and `out` attributes are in milliseconds. and names as `startTime` and `endTime` because `in` is a reserved word. 
 * 
 */


'use strict';

module.exports = class Marker{
    constructor(comment, name, startTime, endTime) {
        // this.options = options;
        this.comment    = comment;
        this.name       = name;
        this.startTime  = startTime;
        this.endTime    = endTime;
    }

    get comment(){
     return this._comment;
    }

    set comment(value){
      this._comment = value;
    }
 
    get name(){
     return this._name;
    }

    set name(value){
      this._name = value;
    }

    get startTime(){
     return this._startTime;
    }

    set startTime(value){
      this._startTime = value;
    }

    get endTime(){
     return this._endTime;
    }

    set endTime(value){
      this._endTime = value;
    }

    returnXML(){
     return `<marker>
             <comment>${this._comment}</comment>
             <name>${this._name}</name>
             <in>${this._startTime}</in>
             <out>${this._endTime}</out>
         </marker>`;
    }

    returnJSON(){
    	return  { comment: this._comment,
		    name: this._name,
		    in: this._startTime,
		    out: this._endTime
		}
    }
}