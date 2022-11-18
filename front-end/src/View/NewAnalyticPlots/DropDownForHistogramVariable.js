import React from 'react';
import ReactDOM from 'react-dom';

import { Menu, Dropdown, Button } from 'antd';
import { useState } from 'react';

import { Plot } from 'react-plotly.js';


const DropDownForHistogramVariable = (props) => {
	const [time,setTime] = useState(0);


	var data;
	var f;
	function handleChange(a){
	}


	
	try{
	data = props.onGetVariableData();
	if(time === 0){
		try{
			props.onPassHistogramVariableX('convexity');
			f = 'convexity'
		      }      
		catch(error){
			props.onPassHistogramVariableY('convexity');
			f = 'convexity';
		}
		setTime(1);
	}
	else{
		handleChange = function (a){
			try{
				props.onPassHistogramVariableX(a);
			      }      
			catch(error){
				props.onPassHistogramVariableY(a);
			}
		}
	 }
	}
	catch(error){
		f = 'convexity';
		handleChange = function(a){
			props.onPassHistogramVariable(a)
		}
	}
	

	
	const [title,setTitle] = useState(f);

	function ChooseVariable (x) {
		setTitle(x);
	}

	

	function mapping(x){



		return (<Menu.Item >
			<a target="_blank" onClick = {() => {ChooseVariable(x)
				handleChange(x);
			}} >
		  		{x}
			</a>
	      		</Menu.Item> );
	}


	const menu = (
		<Menu >	
		  {data.map(x => mapping(x))}
		</Menu>
	      );


	return(
	<div style={{maginBottom:"20px"}}>
		<Dropdown overlayStyle={{maxHeight:500,overflowY:"scroll"}} overlay={menu} placement="bottomCenter" arrow>
      		<Button >{title}</Button>
    	</Dropdown>
	</div>
	);
	
}


export default DropDownForHistogramVariable;