import Autocomplete from './components/Autocomplete';

let RC = {Autocomplete};
let APP = {
	eventTasks:{
		click:[],
		keyup:[]
	},
	init: function() {
		//this.addListeners();

		let propFunc = function(evt) {
			console.log('I was passed in!');
		}

		this.getData().then((data) => {
			this.data = this.transformData(data);
			console.log('APP init done', this);
			ReactDOM.render(
				<RC.Autocomplete 
					parent={RC} 
					arrData={this.data} 
					mainKey="label" 
					minimum="3" 
					onSelect={propFunc} 
				/>, document.getElementById('app')
			);
		});
	},
	transformData: function(data) {
		return data;
	},
	addListeners: function() {
		$('body').on({
			click: (evt)=>{
				this.eventTasks.click.forEach((task)=>{
					task.apply(this, [evt]);
				});
				//if (evt.target.id === 'tmc-search-button') {
				//	this.search.run();
				//}
			},
			keyup: (evt)=>{
				//if (evt.target.id === 'tmc-search-input' && evt.keyCode === 13) {
				//	this.search.run();
				//}
				this.eventTasks.keyup.forEach((task)=>{
					task.apply(this, [evt]);
				});
			}
		});
	},
	getData: function() {
		let path = '../data/subscriptions.json';
		return fetch(path)
			.then(response => response.json());
	}
}


$(document).ready(function(){
	APP.init();
	//console.log('APP', APP);
});
