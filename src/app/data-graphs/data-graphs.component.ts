/*app.component.ts*/
import { Component, OnInit } from '@angular/core';
import CanvasJS from '../../assets/canvasjs.min';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
// var CanvasJS = require('./canvasjs.min');

@Component({
	selector: 'app-data-graphs',
	templateUrl: './data-graphs.component.html'
})

export class DataGraphsComponent implements OnInit {
	categories: any[]
	currentCategory: {
		type: String,
		name: String,
	}
	allsubcategories: any[]
	currentsubcategories: any[]
	dataPoints: any[]
	categorydataPoints: any[]
	currentSubcategory: {
		type: String,
		name: String,
	}
	ngOnInit() {
		this.categories = [
			{ type: "a", name: "Home" },
			{ type: "b", name: "Events" },
			{ type: "c", name: "Health & Fitness" },
			{ type: "d", name: "Automotive & Transport" },
			{ type: "e", name: "Office" },
		]
		this.allsubcategories = [
			{type: "a", name: "Pest Control Services", y: 15},
			{type: "a", name: "Cleaning Services", y: 20},
			{type: "a", name: "Plumbing Services", y: 17},
			{type: "a", name: "Electrical Services", y: 11},
			{type: "a", name: "Aircon Services", y: 4},
			{type: "a", name: "Interior Design", y: 6},
			{type: "a", name: "Home Repair & Maintenance", y: 10},
			{type: "a", name: "Home Renovation & Improvement", y: 5},
			{type: "a", name: "Movers & Trucking Services", y: 2},
			{type: "a", name: "Laundry & Dry Cleaning", y: 3},
			{type: "a", name: "Food, Beverage, & Catering Services", y: 6},
			{type: "a", name: "Appliance Services & Repair", y: 6},
			{type: "b", name: "Food, Beverage, & Catering Services", y: 66},
			{type: "b", name: "Entertainment Events", y: 20},
			{type: "b", name: "Weddings", y: 14},
			{type: "c", name: "Packed Meals", y: 33},
			{type: "c", name: "Grocery", y: 67},
			{type: "d", name: "Movers & Trucking Services", y: 55},
			{type: "d", name: "Office Movers & Relocators", y: 45},
			{type: "e", name: "Pest Control Services", y: 37},
			{type: "e", name: "Office Maintenance & Cleaning", y: 63},
		]
		
		this.currentCategory = this.categories[0];
		this.currentsubcategories = this.allsubcategories.filter(item => item.type == this.currentCategory.type);
		var chart1 = new CanvasJS.Chart("chartContainer1", {
			animationEnabled: true,
			title:{
				text: `Job spread of ${this.currentCategory.name}`,
				horizontalAlign: "center"
			},
			data: [{
				type: "doughnut",
				startAngle: 60,
				//innerRadius: 60,
				indexLabelFontSize: 17,
				indexLabel: "{name} - #percent%",
				toolTipContent: "<b>{name}:</b> {y} (#percent%)",
				dataPoints: this.currentsubcategories,
			}]
		});

		this.currentSubcategory = this.currentsubcategories[0];
		this.dataPoints = [];
		let y = 100;
		for (var i = 0; i < 30; i++) {
			y += Math.round(5 + Math.random() * (-5 - 5));
			this.dataPoints.push({ y: y, label: `July ${i + 1}` });
		}


		let chart = new CanvasJS.Chart("chartContainer", {
			zoomEnabled: true,
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: `Pricing History of ${this.currentSubcategory.name}`
			},
			subtitles: [{
				text: "Average pricing over the past 30 days",
			}],
			data: [
				{
					type: "line",
					dataPoints: this.dataPoints
				}]
		});

		chart1.render();
		chart.render();
	}
	onChangeCategory(event: Event) {
		let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		//console.log(selectedOptions[selectedIndex]);
		this.currentCategory = this.categories.filter(item => item.name == selectedOptions[selectedIndex].text)[0];
		this.currentsubcategories = this.allsubcategories.filter(item => item.type == this.currentCategory.type);
		var chart1 = new CanvasJS.Chart("chartContainer1", {
			animationEnabled: true,
			title:{
				text: `Job spread of ${this.currentCategory.name}`,
				horizontalAlign: "center"
			},
			data: [{
				type: "doughnut",
				startAngle: 60,
				//innerRadius: 60,
				indexLabelFontSize: 17,
				indexLabel: "{name} - #percent%",
				toolTipContent: "<b>{name}:</b> {y} (#percent%)",
				dataPoints: this.currentsubcategories,
			}]
		});
		chart1.render();
	}
	onChangeSubcategory(event: Event) {
		let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		//console.log(selectedOptions[selectedIndex]);
		this.currentSubcategory = this.currentsubcategories.filter(item => item.name == selectedOptions[selectedIndex].text)[0];
		this.dataPoints = [];
		let y = 100;
		for (var i = 0; i < 30; i++) {
			y += Math.round(5 + Math.random() * (-5 - 5));
			this.dataPoints.push({ y: y, label: `July ${i + 1}` });
		}
		let chart = new CanvasJS.Chart("chartContainer", {
			zoomEnabled: true,
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: `Pricing History of ${this.currentSubcategory.name}`
			},
			subtitles: [{
				text: "Average pricing over the past 30 days",
			}],
			data: [
				{
					type: "line",
					dataPoints: this.dataPoints
				}]
		});

		chart.render();
	}
}