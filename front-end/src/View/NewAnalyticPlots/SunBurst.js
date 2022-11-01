import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { reduce } from 'async';
import Plot from 'react-plotly.js';
import { useState } from 'react';
import DropDownForPie from './DropDownForPieChart';

// let colorTable = {
// 	'juvenile':'red',
// 	'lithic':'green',
// 	'free crystal':'blue',
// 	'altered material':'yellow'
// }

// let l11 = {
// 'juvenile':['#B90E0A','#900603','#900D09','#A91BD'],
// 'lithic':['#5DBB63','#028A0F','#98BF64','#74B72E'],
// 'altered material':['FFF380','FFFFC2','FDD017','FFDB58'],
// 'free crystal':['#3944BC','#63C5DA','#1338BE','#016064']
// }

// let l22 = {
// 	'juvenile':['#9B1003','#D21404','#BC544B','#680C07'],
// 	'lithic':['#3A5311','#028A0F','#98BF64','#5DBB63'],
// 	'altered material':['C68E17','C7A317','C2B280','FFDB58'],
// 	'free crytal' : ['#1520A6','#0492C2','#2832C2','#241571','#1F456E']
// }

// let l33 = {
// 	'juvenile':['#900D09','#D21404','#710C04','#BC544B'],
// 	'lithic':['#466D1D','#03AC13',"#234F1E","#354A21"],
// 	'altered material':['FBB917','DEB887','EE9A4D','FFE87C'],
// 	'free crystal':['#2832C2','#59788E','#051094','#52B2Bf']
// }

const SunBurst = (props) =>{

	let colorTable = {
		'juvenile':'red',
		'lithic':'green',
		'free crystal':'blue',
		'altered material':'yellow'
	}
	
	let l11 = {
	'juvenile':['#B90E0A','#900603','#900D09','#A91BD'],
	'lithic':['#5DBB63','#028A0F','#98BF64','#74B72E'],
	'altered material':['FFF380','FFFFC2','FDD017','FFDB58'],
	'free crystal':['#3944BC','#63C5DA','#1338BE','#016064']
	}
	
	let l22 = {
		'juvenile':['#9B1003','#D21404','#BC544B','#680C07'],
		'lithic':['#3A5311','#028A0F','#98BF64','#5DBB63'],
		'altered material':['C68E17','C7A317','C2B280','FFDB58'],
		'free crytal' : ['#1520A6','#0492C2','#2832C2','#241571','#1F456E']
	}
	
	let l33 = {
		'juvenile':['#900D09','#D21404','#710C04','#BC544B'],
		'lithic':['#466D1D','#03AC13',"#234F1E","#354A21"],
		'altered material':['FBB917','DEB887','EE9A4D','FFE87C'],
		'free crystal':['#2832C2','#59788E','#051094','#52B2Bf']
	}

	function isNumber(char) {
		if (typeof char !== 'string') {
		  return false;
		}
	      
		if (char.trim() === '') {
		  return false;
		}
	      
		return !isNaN(char);
	      }
	      

	const takeName = (s) =>{
		let a =""
		for(let i=0;i<s.length;i++){
			if(isNumber(s[i])){
			return a
			}
			a+=s[i]
		}

		return a;
	}
	
	const [check,setCheck] = useState(0);
	const [PieChartVariable,setPieChartVariable] = useState('volc_name')
	
	Chart.register(...registerables);
	let arr = []
	arr = props.onGetData();
	let variable = PieChartVariable;
	let dict = {}
	let total = 0;
	let side = props.onGetSide();
	let legendSize = props.onGetLegendSize();

	const PassPieChartVariable = (a) => {
		setPieChartVariable(a)
	}

	let dataDict = {}
	let attribute1= props.onGetSubType();
	let attribute2= 'crystallinity';
	let attribute3= props.onGetAttribute2();
	let main_type = props.onGetMainType();
	let essentialVariable = props.onGetEssential();
	


	for(let i =0;i<arr.length;i++){
		dict[arr[i][variable]] =0;
		let l1;
		let l2;
		let l3;
		let l4;
		let l5;
		

		if(arr[i][essentialVariable]){
			l4 = arr[i][essentialVariable]
		}
			else
			l4 = 'undefine';
	
			if(dataDict[l4]){
				
			}
			else{
			dataDict[l4] = {}
			dataDict[l4].children = {};
				}
			if(arr[i][main_type])
				l5 = arr[i][main_type]
			else
				l5 = 'undefine'
		
			if(dataDict[l4].children[l5]){
				dataDict[l4].children[l5].count +=1;
			}
			else{
				dataDict[l4].children[l5] = {}
				dataDict[l4].children[l5].count =1;
				dataDict[l4].children[l5].children = {};
			}
	
			// if(arr[i][attribute1])
			// 	l6 = arr[i][attribute1]
			// else 
			// 	l6 = 'undefine'
	
			
			// finalData[l4].children[l5].children[l6] = dataDict[l6];
			
////ddd



		if(arr[i][attribute1]){
		l1 = arr[i][attribute1]
	}
	else
		l1 = 'undefine';
		if(dataDict[l4].children[l5].children[l1]){
			dataDict[l4].children[l5].children[l1].count +=1;
		}
		else{
		dataDict[l4].children[l5].children[l1] = {}
		dataDict[l4].children[l5].children[l1].count = 1;
		dataDict[l4].children[l5].children[l1].children = {};
			}
		if(arr[i][attribute2])
			l2 = arr[i][attribute2]
		else
			l2 = 'undefine'
	
		if(dataDict[l4].children[l5].children[l1].children[l2]){
			dataDict[l4].children[l5].children[l1].children[l2].count +=1;
		}
		else{
			dataDict[l4].children[l5].children[l1].children[l2] = {}
			dataDict[l4].children[l5].children[l1].children[l2].count =1;
			dataDict[l4].children[l5].children[l1].children[l2].children = {};
		}

		if(arr[i][attribute3])
			l3 = arr[i][attribute3]
		else 
			l3 = 'undefine'

		if(dataDict[l4].children[l5].children[l1].children[l2].children[l3]){
			dataDict[l4].children[l5].children[l1].children[l2].children[l3].count +=1;
		}
		else{
			dataDict[l4].children[l5].children[l1].children[l2].children[l3] = {}
			dataDict[l4].children[l5].children[l1].children[l2].children[l3].count =1;
		}
		
		

		// dataDict[arr[i][attribute1]].children[arr[i][attribute2]].children[arr[i][attribute3]].children 
		
	}

	console.log(dataDict)

	// let finalData = {}	
	// let main_type = 'main_type'
	// let essentialVariable = 'eruptive_style'
	// for(let i=0;i<arr.length;i++){
	// 	let l1;
	// 	let l2;
	// 	let l3;
	// 	if(arr[i][essentialVariable]){
	// 	l1 = arr[i][essentialVariable]
	// }
	// 	else
	// 	l1 = 'undefine';

	// 	if(finalData[l1]){
			
	// 	}
	// 	else{
	// 	finalData[l1] = {}
	// 	finalData[l1].children = {};
	// 		}
	// 	if(arr[i][main_type])
	// 		l2 = arr[i][main_type]
	// 	else
	// 		l2 = 'undefine'
	
	// 	if(finalData[l1].children[l2]){
	// 		finalData[l1].children[l2].count +=1;
	// 	}
	// 	else{
	// 		finalData[l1].children[l2] = {}
	// 		finalData[l1].children[l2].count =1;
	// 		finalData[l1].children[l2].children = {};
	// 	}

	// 	if(arr[i][attribute1])
	// 		l3 = arr[i][attribute1]
	// 	else 
	// 		l3 = 'undefine'

		
	// 	finalData[l1].children[l2].children[l3] = dataDict[l3];
		

		
	// }


	// console.log(finalData)
	


	let v = []
	let lable = []
	
	// console.log(dataDict)

	for(const[key,value] of Object.entries(dict) ){
		v.push(value);
		lable.push(key);
		
	}

	

	let chartData = []
	let xLeft = 0
	let xRight = 0.33
	let r = 1
	let c = 0
	let p =0.25
	for(const[a,b] of Object.entries(dataDict)){
		let x = []
		let v = []
		let xx = []
		let vv = []
		let xxx = []
		let vvv = []
		let xxxx = []
		let vvvv = []
		let id1 = []
		let id2 = []
		let id3 = []
		let id4 = []
		let top2 = 0;
			let top3 = 0;
			let top4 = 0;
			let c2 = 1;
			let c3 = 1
			let c4 = 1;
		let color1=[];
		let color2=[];
		let color3=[];
		let color4=[];
		for(const[key,value] of Object.entries(b.children) ){
			x.push(key)
			v.push(value.count)
			id1.push(key+value.count)
			color1.push(colorTable[key])
			// let xx=[];
			// let vv=[];

			// c2 = top2;
			for(const[k,va] of Object.entries(value.children)){
				
				if(top2 === 0){
				xx.push(k)
				vv.push(va.count)
				id2.push(k+va.count)
				if(l11[key])
				color2.push(l11[key][Math.floor(Math.random()*l11[key].length)])
				}
				else{
				// if(c2 === 1 && a === 'Phreatic')
				// 	console.log(k)
				id2.splice(c2,0,k+va.count);
				vv.splice(c2,0,va.count);
				if(l11[key])
				color2.splice(c2,0,l11[key][Math.floor(Math.random()*l11[key].length)])
				c2+=1;
				}
				
				// let xxx = []
				// let vvv = []
				
				// c3 = top3;
				for(const [ke,val] of Object.entries(va.children)){
					
					if(top3 === 0){
					xxx.push(ke)
					vvv.push(val.count)
					id3.push(ke+val.count)
					if(l22[key])
					color3.push(l22[key][Math.floor(Math.random()*l22[key].length)])
					}
					else{
						id3.splice(c3,0,ke+val.count)
						vvv.splice(c3,0,val.count)
						if(l22[key])
						color3.splice(c3,0,l22[key][Math.floor(Math.random()*l22[key].length)])
						if(c2 >=2)
							c3+=1;
					}
					// let xxxx = []
					// let vvvv = []
					// c4 = top4
					for(const [ky,vl] of Object.entries(val.children)){

							if(top4 === 0){
							xxxx.push(ky)
							vvvv.push(vl.count)
							id4.push(ky+vl.count)
							if(l33[key])
							color4.push(l33[key][Math.floor(Math.random()*l33[key].length)])
							}
							else{
								id4.splice(c4,0,ky+vl.count)
								vvvv.splice(c4,0,vl.count)
								if(l33[key])
								color4.splice(c4,0,l33[key][Math.floor(Math.random()*l33[key].length)])
								if(c3 >=3)
								c4+=1;
							}
						}
						top4+=1;
					}
					top3+=1;
				}
				top2 +=1;
				if(a === 'Phreatic')
				console.log(id2)
			}
				console.log(color3)
				console.log(color4)
						chartData.push({
							values:v,
							labels:id1,
							ids:id1,
							marker:{
							colors:color1,
							},
							sort:false,
							textinfo: 'none',
							domain:{row:r,columns:c,x:[xLeft+0.015,xRight-0.015],y:[0.55*r+p-0.3*(r-1),1*r - p-0.3*(r-1)]},
							hole:.7,
							type:'pie',
							name:a,
							// title:{
							// 	text:a,
							// 	position:'bottom left'
							// }
						})
					
					
					chartData.push({
						values:vv,
						labels:id2,
						marker:{
							colors:color2
						},
						ids:id2,
						sort:false,
						textinfo: 'none',
						domain:{row:r,columns:c,x:[xLeft+0.060,xRight-0.06],y:[0.5789*r + p -0.3*(r-1),0.9712*r -p - 0.3*(r-1)]},
						hole:.7,
						type:'pie'
					})

				
				
			
			chartData.push({
				values:vvv,
				labels:id3,
				marker:{
					colors:color3
				},
				ids:id3,
				sort:false,
				textinfo: 'none',
				domain:{row:r,columns:c,x:[xLeft+0.090,xRight-0.090],y:[0.582*r + p -0.3*(r-1),0.97*r -p - 0.3*(r-1)]},
				hole:.7,
				type:'pie'
			})
		

		chartData.push({
			values:vvv,
			labels:id4,
			marker:{
				colors:color4
			},
			ids:id4,
			sort:false,
			textinfo: 'none',
			domain:{row:r,columns:c,x:[xLeft+0.11,xRight-0.11],y:[0.654*r + p - 0.3*(r-1),0.90*r -p - 0.3*(r-1)]},
			hole:.7,
			type:'pie',
			title:{
				text:a,
				
			}
		})

		if(c === 2){
			r+=1;
			p=0;
			c = 0;
			xLeft = 0;
			xRight= 0.33;
		}
		else{
		c+=1;
		xLeft += 0.33;
		xRight+=0.33;
		}
	
	}

	console.log(chartData)
	console.log(r)

	var data = [{
		values: [16, 15, 12, 6, 5, 4, 42],
		labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
		domain: {row:0,column:0,
		x:[0.015,0.315]
		},
		name: '',
		hoverinfo: 'label+percent+name',
		hole: .7,
		type: 'pie',
		
	      },{
		values: [27, 11, 25, 8, 1, 3, 25],
		labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
		text: 'CO2',
		textposition: 'inside',
		domain: {column: 1},
		name: '',
		hoverinfo: 'label+percent+name',
		hole: 0.7,
		type: 'pie',
		domain: {
			row:0,
			column:0,
			x:[0.060,0.27],
			y: [0.5712,0.955 ]
		      },
		
	      }];
	      
	      var layout = {
		title: '',
		// annotations: [
		//   {
		//     font: {
		//       size: 20
		//     },
		//     showarrow: false,
	
		//     x: 0.17,
		//     y: 0.5
		//   },
		//   {
		//     font: {
		//       size: 20
		//     },
		//     showarrow: false,
		  
		//     x: 0.82,
		//     y: 0.5
		//   }
		// ]	
		
		height: 1500,
		width: 1440,
		showlegend: false,
		colorway:['#00395E','#FBAB18','#F05729','#7F131B','#B51C7D','#3B180D','#646765'],
		grid: {rows: r+1, columns: 3}
	      };
	
	return(
	<div>

	<div>

	<Plot
        data= {chartData}
	
        layout={layout}
      	/>
		</div>
	</div>
		
	);
}

export default SunBurst;