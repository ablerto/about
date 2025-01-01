'use client'
import { useEffect, useRef } from "react"
import useWindowSize from "../windowdimension/windowSize";

// returns a list of coordinates, speed and movement angle
// [(x,y),theta,v]
function createFlyingDot(w,h,r) {
    return [[Math.random()*(w-2*r)+r,Math.random()*(h-2*r)+r],2*Math.PI*Math.random(),Math.random()*0.5+0.5]
}

function createFlyingDots(w,h,r,n) {
    let dots = [];
    for (let i = 0; i < n; i++) {
        let newDot = createFlyingDot(w,h,r);
        dots.push(newDot);
    }
    return dots;
}

function bounce(w,h,r,dot) {
    let down = Math.sign(Math.sin(dot[1]))
    let right = Math.sign(Math.cos(dot[1]))
    if (dot[0][1] <= r && down == -1) {
        return -dot[1];
    }
    if (dot[0][1] >= h-r && down == 1) {
        return -dot[1];
    }
    if (dot[0][0] <= r && right == -1) {
        return Math.PI - dot[1]
    }
    if (dot[0][0] >= w - r && right == 1) {
        return Math.PI - dot[1]
    }
    return dot[1];
}

function moveFlyingDot(w,h,r,dot) {
    let angle = bounce(w,h,r,dot);
    let newpos = [dot[0][0]+Math.cos(angle)*dot[2],dot[0][1]+Math.sin(angle)*dot[2]]
    return [newpos,angle,dot[2]]
}

function moveFlyingDots(w,h,dots,r) {
    let newdots = [];
    let newdot;
    for (let i = 0; i < dots.length; i++) {
        newdot = moveFlyingDot(w,h,r,dots[i]);
        newdots.push(newdot);
    }
    return newdots;
}

// maps one number based on two ranges
function map(input,input_range,output_range) {
    if (input <= input_range[0]) {
        return output_range[0];
    } else if (input >= input_range[1]) {
        return output_range[1];
    }
    // min_out+(input-min_in)/(max_in-min_in)*(max_out-min_out)
    return output_range[0]+
           (input-input_range[0])/
           (input_range[1]-input_range[0])*
           (output_range[1]-output_range[0])
}

function distanceToColor(distance,distanceRange) {
    let background = [253, 246, 227];
    let color = [38,139,210];
    let output = [];
    for (let i = 0; i < background.length; i++) {
        output.push(map(distance, distanceRange, [color[i], background[i]]));
    }
    return output
}

function drawFlyingDots(ctx,dots,r,distanceRange) {
    // draw lines
    let coords = [[],[]];
    let color = [];
    for (let i = 0; i < dots.length; i++) {
        coords[0] = [dots[i][0][0],dots[i][0][1]];
        for (let ii  = 0; ii < dots.length; ii++) {
            if (ii <= i) {
                continue
            }
            coords[1] = [dots[ii][0][0],dots[ii][0][1]];

            let distance = Math.sqrt(Math.pow(coords[0][0]-coords[1][0],2)+
                                 Math.pow(coords[0][1]-coords[1][1],2));
            if (distance >= distanceRange[1]) {continue}
            color = distanceToColor(distance,distanceRange);
            ctx.beginPath();
            ctx.moveTo(coords[0][0],coords[0][1]);
            ctx.lineTo(coords[1][0],coords[1][1]);
            ctx.strokeStyle = "rgb("+color[0]+","+color[1]+","+color[2]+")";
            ctx.stroke();
        }
    }

    // draw dots
    for (let i = 0; i < dots.length; i++) {
        ctx.beginPath();
        ctx.arc(dots[i][0][0],dots[i][0][1],r,0,2*Math.PI);
        ctx.fillStyle = "rgb(38 139 210)"
        ctx.fill();
    }
}

const Canvas = props => {
    const ref = useRef();
    const draw = (ctx, dots,r,distanceRange) => {
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        drawFlyingDots(ctx,dots,r,distanceRange);
    };
    let w = Number(props.width.substring(0,props.width.length - 2))
    let h = Number(props.height.substring(0,props.height.length - 2));
    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        let animationID;
        let w = ctx.canvas.width;
        let h = ctx.canvas.height;
        let r = 6;
        let dots = createFlyingDots(w,h,r,(w+h)/100);
        let distanceRange = [(w+h)/50,(w+h)/10];
        const renderer = () => {
            // Update values (in case of resize)
            w = ctx.canvas.width;
            h = ctx.canvas.height;
            r = (w+h)/500
            distanceRange = [Math.round((w+h)/50),Math.round((w+h)/10)]
            // move things and do other stuff
            dots = moveFlyingDots(w,h,dots,r);
            draw(ctx,dots,r,distanceRange);
            animationID=window.requestAnimationFrame(renderer);
        }
        renderer();
        return () => window.cancelAnimationFrame(animationID)
    },[])

    return <canvas ref={ref} {...props}/>
}

export default Canvas
