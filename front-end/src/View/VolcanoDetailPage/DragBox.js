import React from 'react';
import './DetailPage.css';
import { useState } from 'react';


let testWidth = 445
const DragBox = (props) => {

	const [aa,setAA] = useState(testWidth);
	const [dd,setDD] = useState(testWidth);
	const [check,setCheck] = useState(0);
	

	const hD = () =>{
		if(check != 0){
			let r = window.event.clientX - dd - testWidth;
		
			setAA(r)
		}
	}

	const mD = () =>{
		setCheck(1);
		setDD(window.event.clientX-testWidth);
	}

	const mU = () => {
		setCheck(0);
	}

	return(
	<div 
			class = 'DD'
			onMouseMove = {hD}
			onMouseDownCapture = {mD}
			onMouseUpCapture = {mU} >
			<div class = 'dragBox' style = {{left: dd, width: aa,height:'80px'}} 
			
			>!</div>
	</div>
	
	);
}


export default DragBox;