import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Menu, Dropdown, Button } from 'antd';
import { useState } from 'react';


	

const MenuDropDown = (props) => {



	const [choice,setChoice] = useState(0);
	const [title,setTitle] = useState("Overview");

	const ChooseOverview = () => {
		setChoice(0);
		setTitle("Overview");
		props.onChangeGraph('overview');
	}

	const ChooseDecade = () => {
		setChoice(1);
		setTitle("Decade");
		props.onChangeGraph('decade');
		
	}


	const menu = (
		<Menu >
		  <Menu.Item>
		    <a target="_blank" onClick = {ChooseOverview} >
		      Overview
		    </a>
		  </Menu.Item>
		  <Menu.Item>
		    <a target="_blank" onClick = {ChooseDecade} >
		      Decade
		    </a>
		  </Menu.Item>
		  
		</Menu>
	      );

	


	return(
	<div class = 'dropdown'>
		<Dropdown  overlay={menu} placement="bottomCenter" arrow>
      		<Button >{title}</Button>
    		</Dropdown>
	</div>
	);
	
}



export default MenuDropDown;