// https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
let Autocomplete = class extends React.Component {
	/*
	If an array of objects is passed in for data, then a main key is required.
	PROPS:
		parent 			: OPTIONAL - parent object that contains other components.
		arrData 		: REQUIRED - And array of strings or objects. 
		mainKey 		: OPTIONAL - The key in an array item to match. If not included, all keys will be checked and the first one will be displayed.
		minimum 		: OPTIONAL - Defaults to 3. Number of characters in the input before a search is done.
		width 	 		: OPTIONAL - If included, will add an inline style to the input's container.
		placeholder     : OPTIONAL - Placeholder text for the input.
		iconClass 		: OPTIONAL - If you include this, the input will paired with an icon button. This assumes that you've included the appropriate CSS. 
		inputClasses 	: OPTIONAL - Any classes you want on the input. Bootstrap classes, for example.

	ReactDOM.render(
		<RC.Autocomplete 
			prop={value} 
		/>, document.getElementById('my-element')
	);
	*/
	constructor(props) {
		super(props);
		this.state = {
			value: 			'',
			placeholder: 	this.props.placeholder || "Type something...",
			matches: 		[],
			inputClasses: 	this.props.inputClasses ? ' '+this.props.inputClasses : '',
			isDisabled: 	this.props.isDisabled === false ? false : true// undefined means true
		};
		this._handleChange   = this._handleChange.bind(this);
		this._getMatches     = this._getMatches.bind(this);
		this._getMatchMarkup = this._getMatchMarkup.bind(this);
	}

	_handleChange(evt) {
		let minimum = this.props.minimum || 3;
		let objNew = {value: evt.target.value};
		if (evt.target.value && evt.target.value.length >= minimum) {
			objNew.matches = this._getMatches(evt.target.value);
		} else {
			objNew.matches = [];
		}
		this.setState(objNew);
	}

	_getMatches(str) {
		let value 		= str; // Not case sensitive.
		let arrData 	= this.props.arrData,
			mainKey 	= this.props.mainKey,
			arrMatches 	= [];

		/*
		If there's no main key, then all keys will be checked.
		*/
		arrData.forEach((item)=>{
			if (mainKey) {
				if (item[mainKey] && item[mainKey].toLowerCase().includes(value) ) {
					arrMatches.push(item);
				}
			} else {
				/*
				There's no main key, so we check all the keys.
				*/
				if (Array.isArray(item[key])) {
					/*
					Check the array. This is for something like "tags" where there 
					would be an array of values that need to be checked. A match anywhere 
					will pass. Gonna write this bit later.
					*/
				} else {
					if ( item[key] && item[key].toLowerCase().includes(value) ) {
						arrMatches.push(item);
					}
				}
			}
		});
		return arrMatches;
	}

	_getMatchMarkup() {
		let markup = null;
		let value = this.state.value;

		if (this.state.matches && this.state.matches.length) {
			console.log('matches', this.state.matches);
			let regex = new RegExp(value, 'ig')		
	
			let matches = this.state.matches.map((match, index)=>{
				console.log('stuff', match, match[this.props.mainKey]);
				/*
				ReactJS doesn't like to inject HTML directly, so we're going to make 
				an array of spans out of each match. This will allow us to highlight 
				the part of the match string that actually matched.
				*/

				// Wrap the search string with triple pipes in the string then split it.
				let strTemp = match[this.props.mainKey].replaceAll(regex,(item)=>{
					return '|||'+item+'|||';
				});
				let arrTemp = strTemp.split('|||')

				/*
				Could be an empty string at lead or tail. Ignore those. Wrap everything in 
				a span, with the matching parts highlighted with a class.
				*/
				let matchWithSpans = arrTemp.map((str, index)=>{
					if (str.length) {
						let strClass = str.toLowerCase() === value.toLowerCase() ? 'rc-ac-match hl' : 'rc-ac-match reg';
						return <span className={strClass} key={index}>{str}</span>
					}
				});

				return (
					<li className="rc-ac-match" key={index}>{matchWithSpans}</li>
				);
			});

			if (matches.length) {
				markup = <ul className="rc-ac-matchgroup">{matches}</ul>;
			}
		}
		return markup;
	}

	render() {
		// TEMP STUFF =============================
		let state = this.state;
		window.getState = function(){return state};
		// ========================================
		let markup = null,
			inputClasses = 'rc-ac-input' + this.state.inputClasses,
			matches = this._getMatchMarkup();
		return (
			<span className="rc-ac">
			<input type="text" className={inputClasses} value={this.state.value} onChange={this._handleChange}  onKeyDown={this._handleKeyDown} placeholder={this.state.placeholder} aria-label={this.state.placeholder} />
			{matches}
			</span>
		);
	}
}

export default Autocomplete;
