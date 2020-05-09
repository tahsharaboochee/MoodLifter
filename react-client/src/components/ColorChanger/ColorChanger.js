import React, { Component } from 'react';
import './ColorChanger.css';
class ColorChanger extends Component {
    componentDidMount() {
        // const arrColor = ["#45c1bf", "#f0593e", "#aeacd4", "#bdd630", "#4479bd", "#f5b11e"];
        const arrColor = [
            '#FF0000',
            '#FF2A00',
            '#FF5500',
            '#FF8000',
            '#FF002A',
            '#FF8000',
            '#FFAA00',
            // '#45c1bf',
            // '#f0593e',
            // '#aeacd4',
            // '#bdd630',
            // '#4479bd',
            // '#f5b11e',
        ];
        //   //random new color
        function GetNewColor() {
            let index = Math.floor(Math.random() * 6 + 1);
            // let index = Math.floor((Math.random() * 5) + 1);
            return arrColor[index];
        }

        // set new color
        function SetNewColor(color) {
            document.body.style.background = color;
            // document.getElementById('heading').style.background = color;
        }
        // on document load function start
        (function () {
            let colorSelected = GetNewColor();
            SetNewColor(colorSelected);
        })();
        //change color timer
        window.setInterval(function () {
            // SetNewColor(color)
            let colorSelected = GetNewColor();
            // console.log(colorSelected)
            SetNewColor(colorSelected);
        }, 2000);
    }
    render() {
        return (
            <div>
                <div id="content"></div>
                {/* <h1 className="f-headline lh-solid">Mood Lifter</h1> */}
            </div>
        );
    }
}

export default ColorChanger;
