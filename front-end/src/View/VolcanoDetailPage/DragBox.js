import React from 'react';
import './DetailPage.css';
import { useState } from 'react';


// let testWidth = 250 + (1/10)*window.innerWidth
const DragBox = (props) => {

	const [aa,setAA] = useState(0);
	const [dd,setDD] = useState(0);
	const [check,setCheck] = useState(0);
	

	const hD = () =>{
		if(check != 0){
			let r = window.event.clientX - dd - 250-(1.3/10)*window.innerWidth;
			console.log(window.event.clientX)
			setAA(r)
		}
	}

	const mD = () =>{
		setCheck(1);
		setDD(window.event.clientX -250-(1.3/10)*window.innerWidth);
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