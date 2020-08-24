/*app.component.ts*/
import { Component, OnInit } from '@angular/core';
import CanvasJS from '../../assets/canvasjs.min';
import { FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
// var CanvasJS = require('./canvasjs.min');

@Component({
	selector: 'app-data-graphs',
	templateUrl: './data-graphs.component.html'
})

export class DataGraphsComponent implements OnInit {
	form: FormGroup
	subcategories: any[]
	dataPoints: any[]
	currentSubcategory: String
	chart: any
	ngOnInit() {
		this.subcategories = [
			"Cleaning Services",
			"Pest Control Services",
			"Plumbing Services",
			"Electrical Services",
			"Aircon Services",
			"Interior Design",
			"Home Repair & Maintenance",
			"Home Renovation & Improvement",
			"Movers & Trucking Services",
			"Laundry & Dry Cleaning",
			"Food, Beverage, & Catering Services",
			"Appliance Services & Repair",
			"Food, Beverage, & Catering Services",
			"Entertainment Events",
			"Weddings",
			"Packed Meals",
			"Grocery",
			"Movers & Trucking Services",
			"Office Movers & Relocators",
			"Pest Control Services",
			"Office Maintenance & Cleaning",
		]

		this.currentSubcategory = this.subcategories[0];
		this.dataPoints = [];
		let y = 100;
		for (var i = 0; i < 30; i++) {
			y += Math.round(5 + Math.random() * (-5 - 5));
			this.dataPoints.push({ y: y, label: `July ${i + 1}` });
		}
		this.chart = new CanvasJS.Chart("chartContainer", {
			zoomEnabled: true,
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: `Pricing History of ${this.currentSubcategory}`
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

		this.chart.render();
	}
	onChangeSubcategory(event: Event) {
		let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		//console.log(selectedOptions[selectedIndex]);
		this.currentSubcategory = selectedOptions[selectedIndex].text;
		this.dataPoints = [];
		let y = 100;
		for (var i = 0; i < 30; i++) {
			y += Math.round(5 + Math.random() * (-5 - 5));
			this.dataPoints.push({ y: y, label: `July ${i + 1}` });
		}
		this.chart = new CanvasJS.Chart("chartContainer", {
			zoomEnabled: true,
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: `Pricing History of ${this.currentSubcategory}`
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

		this.chart.render();
	}
}