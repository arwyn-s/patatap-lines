var maxPoint = new Point(window.innerWidth, window.innerHeight);
var rect = new Rectangle(new Point(0,0), maxPoint);
var side = 0;
var lines =[];

// Function that triggers when key is pressed.
function onKeyDown(event) {
    var start = Math.random();
    var dest = Math.random();
    //
    if(side===0 ){
        var beginPoint= new Point(0, start*window.innerHeight);
        var finalPoint= new Point(window.innerWidth, dest*window.innerHeight);
    } else {
        var beginPoint= new Point(start*window.innerWidth, 0);
        var finalPoint= new Point(dest*window.innerWidth, window.innerHeight);
    }

    var myPath = new Path();
    myPath.strokeColor= keyData[event.key].color;
    myPath.strokeWidth='5';
    myPath.strokeCap='round';
    keyData[event.key].sound.play();
    lines.push({
        source: beginPoint,
        destination: finalPoint,
        direction: (finalPoint - beginPoint).normalize(),
        path: myPath,
        nextPoint: beginPoint
    });
    myPath.add(lines[lines.length-1].source, lines[lines.length-1].destination);
}

// function that lets that animation happen 
function onFrame(event) {
    for(var i=0;i< lines.length;i++){
        
        if(lines[i].nextPoint.isInside(rect)){
            lines[i].path.add(lines[i].nextPoint);
            lines[i].nextPoint += (lines[i].vector)*100;
            lines[i].path.strokeColor.hue +=1;

        } else if(lines[i].length > 5){
            lines[i].path.removeSegment(0);
        } else {
            lines.splice(i,1);
            console.log("removed a line");
        }
    }	
}

