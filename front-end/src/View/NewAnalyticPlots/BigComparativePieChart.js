import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { reduce } from 'async';
import Plot from 'react-plotly.js';
import { useState } from 'react';
import DropDownForPie from './DropDownForPieChart';

var volc_name = ["La Palma","Kelut","Merapi","Soufrière Guadaloupe","Chillán, Nevados de","On-take","Pinatubo","St. Helens"]
	
const BigComparativePieChart = (props) =>{
 	
	const [check,setCheck] = useState(0);
	const [PieChartVariable,setPieChartVariable] = useState('volc_name')
	
	Chart.register(...registerables);
	let arr = []
	arr = props.onGetData();
	let variable = PieChartVariable;
	let dict1 = {}
	let dict2 ={}
	let total = 0;
	let side = props.onGetSide();
	let legendSize = props.onGetLegendSize();

	const PassPieChartVariable = (a) => {
		setPieChartVariable(a)
	}

	for(let i =0;i<arr.length;i++){
		dict1[arr[i]['volc_name']] =0;
		dict2[arr[i]['main_type']] = 0;
		total +=1;	
	}

	for(let i =0;i<arr.length;i++){
		dict1[arr[i]['volc_name']] +=1;
		dict2[arr[i]['main_type']] +=1;
	}

	let v1 = []
	let lable1 = []
	let v2 = [] 
	let lable2 = []

	for(const[key,value] of Object.entries(dict1) ){
		v1.push(value);
		lable1.push(key);
	}

	for(const [key,value] of Object.entries(dict2)){
		v2.push(value)
		lable2.push(key)
	}





var layout = {
  height: 500,
  width: 1000,

};
	
console.log(v1)
console.log(lable1)

	return(
	<div>
		

	<div>

	<Plot
        data={[
{
		labels:lable1,
		values:v1,
		type:'pie',
		domain:{
			row:0,
			column:0
		},
		showlegend:false

},
{
	labels:lable2,
	values:v2,
	type:'pie',
	domain:{
		row:0,
		column:1
	},
	showlegend:false
}

		]}
		layout={ {width: 1440, height: side[1], title: 'Overview',grid: {rows: 1, columns: 2}, legend:{display:false} }}
      	/>
		</div>
	</div>
		
	);
}

export default BigComparativePieChart;