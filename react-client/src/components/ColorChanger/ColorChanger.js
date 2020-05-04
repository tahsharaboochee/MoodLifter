import React, { Component } from 'react';
import Slider from 'react-slick';
import './ColorChanger.css';
// // colors to gradually change/fade into the other
// .anaPalette0 { background-color:#FF0000; }
// .anaPalette1 { background-color:#FF2A00; }
// .anaPalette2 { background-color:#FF5500; }
// .anaPalette3 { background-color:#FF8000; }
// .anaPalette4 { background-color:#FF002A; }
// .anaPalette6 { background-color:#FF8000; }
// .anaPalette5 { background-color:#FFAA00; }
// .anaPalette4 { background-color:#FFD400; }
// .anaPalette3 { background-color:#80FF00; }
// .anaPalette2 { background-color:#AAFF00; }
// .anaPalette1 { background-color:#D4FF00; }
// .anaPalette0 { background-color:#FFFF00; }

// const {
//     CSSTransitionGroup
//   } = React.addons;
class ColorChanger extends Component {
 componentDidMount(){
    var arrColor = ["#45c1bf", "#f0593e", "#aeacd4", "#bdd630", "#4479bd", "#f5b11e"];
    var footer = document.getElementById("footer");
    var header = document.getElementById("header");
    //helper function - get dark or lighter color
    function LightenDarkenColor(col, amt) {
        var usePound = false;
        if (col[0] == "#") {
          col = col.slice(1);
          usePound = true;
        }
        var num = parseInt(col, 16);
        var r = (num >> 16) + amt;
        if (r > 255) r = 255;
        else if (r < 0) r = 0;
        var b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) b = 255;
        else if (b < 0) b = 0;
        var g = (num & 0x0000FF) + amt;
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
      }
      //random new color
    
    function GetNewColor() {
        var index = Math.floor((Math.random() * 5) + 1);
        return arrColor[index];
      }
      // set new color
    
    function SetNewColor(color) {
        document.body.style.background = color;
        var NewColor = LightenDarkenColor(color, -20);
        // footer.style.backgroundColor = NewColor;
        // header.style.backgroundColor = NewColor;
        //footer.style.opacity = 1.2;
      }
      // on document load function start
      (function() {
        var colorSelected = GetNewColor();
        SetNewColor(colorSelected);
      })();
    //change color timer
    window.setInterval(function() {
      var colorSelected = GetNewColor();
      SetNewColor(colorSelected);
    }, 2000);
 }
    render() {
        return (
            <div>
                {/* <div id="header">header</div> */}
                <div id="content"></div>
                {/* <div id="footer">footer</div> */}
                <h1 className="f-headline lh-solid">Mood Lifter</h1>
            </div>
        );
    }
}

export default ColorChanger;
