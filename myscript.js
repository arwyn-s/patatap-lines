var keyData = {
    q: {
        sound: new Howl({
          urls: ['sounds/bubbles.mp3']
        }),
        color: '#1abc9c'
    },
    w: {
        sound: new Howl({
          urls: ['sounds/clay.mp3']
        }),
        color: '#2ecc71'
    },
    e: {
        sound: new Howl({
          urls: ['sounds/confetti.mp3']
        }),
        color: '#3498db'
    },
    r: {
        sound: new Howl({
          urls: ['sounds/corona.mp3']
        }),
        color: '#9b59b6'
    },
        t: {
        sound: new Howl({
          urls: ['sounds/dotted-spiral.mp3']
        }),
        color: '#34495e'
    },
    y: {
        sound: new Howl({
          urls: ['sounds/flash-1.mp3']
        }),
        color: '#16a085'
    },
    u: {
        sound: new Howl({
          urls: ['sounds/flash-2.mp3']
        }),
        color: '#27ae60'
    },
    i: {
        sound: new Howl({
          urls: ['sounds/flash-3.mp3']
        }),
        color: '#2980b9'
    },
    o: {
        sound: new Howl({
            urls: ['sounds/glimmer.mp3']
        }),
        color: '#8e44ad'
    },
    p: {
        sound: new Howl({
          urls: ['sounds/moon.mp3']
        }),
        color: '#2c3e50'
    },
    a: {
        sound: new Howl({
          urls: ['sounds/pinwheel.mp3']
        }),
        color: '#f1c40f'
    },
    s: {
        sound: new Howl({
          urls: ['sounds/piston-1.mp3']
        }),
        color: '#e67e22'
    },
        d: {
        sound: new Howl({
          urls: ['sounds/piston-2.mp3']
        }),
        color: '#e74c3c'
    },
    f: {
        sound: new Howl({
          urls: ['sounds/prism-1.mp3']
        }),
        color: '#95a5a6'
    },
    g: {
        sound: new Howl({
          urls: ['sounds/prism-2.mp3']
        }),
        color: '#f39c12'
    },
    h: {
        sound: new Howl({
          urls: ['sounds/prism-3.mp3']
        }),
        color: '#d35400'
    },
    j: {
        sound: new Howl({
          urls: ['sounds/splits.mp3']
        }),
        color: '#1abc9c'
    },
    k: {
        sound: new Howl({
          urls: ['sounds/squiggle.mp3']
        }),
        color: '#2ecc71'
    },
    l: {
        sound: new Howl({
          urls: ['sounds/strike.mp3']
        }),
        color: '#3498db'
    },
    z: {
        sound: new Howl({
          urls: ['sounds/suspension.mp3']
        }),
        color: '#9b59b6'
    },
    x: {
        sound: new Howl({
          urls: ['sounds/timer.mp3']
        }),
        color: '#34495e'
    },
    c: {
        sound: new Howl({
          urls: ['sounds/ufo.mp3']
        }),
        color: '#16a085'
    },
    v: {
        sound: new Howl({
          urls: ['sounds/veil.mp3']
        }),
        color: '#27ae60'
    },
    b: {
        sound: new Howl({
          urls: ['sounds/wipe.mp3']
        }),
        color: '#2980b9'
    },
    n: {
        sound: new Howl({
            urls: ['sounds/zig-zag.mp3']
        }),
        color: '#8e44ad'
    },
    m: {
        sound: new Howl({
          urls: ['sounds/moon.mp3']
        }),
        color: '#2c3e50'
    }
}
var maxPoint = new Point(window.innerWidth, window.innerHeight);
var rect = new Rectangle(new Point(0,0), maxPoint); // the canvas size.
var side = 0;

var lines =[]; 
var dance =0;
function onKeyDown(event) {

    //// CHECKS IF THE KEY PRESSED IS IN var keydata.
    if(keyData[event.key]){

        var myPath = new Path();
        // PATH STYLE.
        myPath.strokeColor= keyData[event.key].color;
        myPath.strokeWidth='5';
        myPath.strokeCap='round';

        /*
            pick two randomn points on the sides of the winoows.
            dance =0 : from left to right.
            dance =1 : from top to bottom.
            dance =2: from right to left.
            dance =3: from bottom to top.
         */
        var start = Math.random();
        var dest = Math.random();
        if(dance%4===0 || dance%4===2){
            var beginPoint= new Point(0, start*window.innerHeight);
            var finalPoint= new Point(window.innerWidth, dest*window.innerHeight);
        } else {
            var beginPoint= new Point(start*window.innerWidth, 0);
            var finalPoint= new Point(dest*window.innerWidth, window.innerHeight);
        }
        /**
         * Add the custom line object to the lines array .
         * source, destination: end points of the lines
         * direction: or the steps along the line.
         * path: line style details.
         * nextPoint: (starts from source) next point along the direction to animate.
         */

        if(dance%4===0 || dance%4===1){
            lines.push({
                source: beginPoint,
                destination: finalPoint,
                direction: (finalPoint - beginPoint).normalize(),
                path: myPath,
                nextPoint: beginPoint
            });
        } else {
            lines.push({
                source: finalPoint,
                destination: beginPoint,
                direction: (beginPoint - finalPoint).normalize(),
                path: myPath,
                nextPoint: finalPoint
            });
        }
        // Plays the sound.
        keyData[event.key].sound.play();
        //myPath.add(lines[lines.length-1].source, lines[lines.length-1].destination);
        // Cycle the dance to other sides.
        dance+=1;
    }

}

/// Paperscript calls this function repeatedly for animantion.
function onFrame(event) {

    /// Loop over all the line object in the lines array.
    for(var i=0;i< lines.length;i++){
        /**
         *  Update the line's next point along the direction.
         * if the nextpoint is inside the rect or the within the constraint then keep increasing length untill final destination.
         *   
         */
        if(lines[i].nextPoint.isInside(rect)){

            // increase the lines length by adding it to the path.
            lines[i].path.add(lines[i].nextPoint); 
            // update the nextpoint the line object , the multiplier is to control how fast the line travels.
            // higher the multipler the line increases the length faster.
            lines[i].nextPoint += (lines[i].direction)*30;
            // Line style animation.
            lines[i].path.strokeColor.hue +=2;

        } else {
            // Once the line reached end point start removing the line segments from the start
            lines[i].path.removeSegment(0);
            if(lines[i].path.length < 5){
                // The line has becomes so it will removed from the lines array.
                //console.log("removed");
                //lines
                lines.splice(i,1);
            }
        } 

    }	
}
