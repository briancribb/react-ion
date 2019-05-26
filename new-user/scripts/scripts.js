(function(){

let NU = {
	form : class extends React.Component {
		constructor() {
			super();
			this.state = {
				states:[],
				subscriptions:[],
				fields: {
					name:{
						value:'',
						labelText:'Name',
						placeholder:'John Smith'
					},
					address:{
						value:'',
						labelText:'Address',
						placeholder:'123 Nota Street'
					},
					city:{
						value:'',
						labelText:'City',
						placeholder:'Nowhereville'
					},
					state:{
						value:'SC',
						labelText:'State',
						placeholder:'Select a State'
					},
					zip:{
						value:'',
						labelText:'ZIP Code',
						placeholder:'555555'
					},
					email:{
						value:'',
						labelText:'Email',
						placeholder:'no@junkmail.com'
					},
					phone:{
						value:'',
						labelText:'Phone',
						placeholder:'555-555-5555'
					},
					username:{
						value:'',
						labelText:'Username',
						placeholder:'username'
					},
					password:{
						value:'',
						labelText:'Password',
						placeholder:'Password'
					},
					passwordConfirm:{
						value:'',
						labelText:'Confirm Password',
						placeholder:'Confirm Password'
					},
					personalDataSetting:{
						options:[
							{
								label:'All!',
								id:'2'
							},
							{
								label:'Some',
								id:'1'
							},
							{
								label:'None',
								id:'0'
							}
						],
						value:'2'
					},
					contactPhone:{
						value:true,
						placeholder:'Phone'
					},
					contactEmail:{
						value:true,
						placeholder:'Email'
					},
					contactVisit:{
						value:true,
						placeholder:'In-person visit'
					}
				}
			}
			this.handleChange = this.handleChange.bind(this);
		}

		handleChange(evt) {
			console.log(evt.target.name, '-', evt.target.type);

			let fieldsClone = {...this.state.fields};

			switch(evt.target.type) {
				case "checkbox":
					fieldsClone[evt.target.name].value = evt.target.checked;
					break;
				default:
					fieldsClone[evt.target.name].value = evt.target.value;
			}

			this.setState({
				fields:fieldsClone
			});
		}

		getSomeJSON(path, callback) {
			let that = this;
			fetch(path)
				.then(response => response.json()) // Returns a promise, so gotta have another then.
				.then( json => {
					//that.setState({[property]:json});
					callback(json);
				})
				.catch( error => {
					console.log('error', error);
				});
		}

		componentDidMount() {
			let that = this;
			this.getSomeJSON('../data/states.json', (data) =>{
				that.setState({states:data});
			});
			this.getSomeJSON('../data/subscriptions.json', (data) =>{
				let fieldsWithSubs = Object.assign({}, this.state.fields);
				data.forEach((sub) => {
					fieldsWithSubs[sub.id] = {
						value: true
					}
				});

				that.setState({
					subscriptions:data,
					fields:fieldsWithSubs
				});

				console.log('state', that.state);
			});
		}

		getSubscriptionCheckboxes() {
			let that = this;
			return this.state.subscriptions.map((sub) => {
				return (
					<div className="col-12 col-sm-6 col-md-4 mb-2" key={sub.id}>
						<NU.checkbox labelText={sub.label} extraClass=" subscription" fieldName={sub.id} checked={that.state.fields[sub.id]} handleChange={that.handleChange} />
					</div>
				)
			});
		}

		render() {
			let checkboxes = this.getSubscriptionCheckboxes();
			return(
				<div className="container">
				<form id="my-form" className="p-3">
					<h3>New User</h3>
					<div className="form-row">
						<div className="col-md-6">
							<NU.input type="text" fieldName="name" field={this.state.fields.name} handleChange={this.handleChange} />
							<NU.input type="text" fieldName="address" field={this.state.fields.address} handleChange={this.handleChange} />
							<NU.input type="text" fieldName="city" field={this.state.fields.city} handleChange={this.handleChange} />
							<NU.select options={this.state.states} fieldName='state' field={this.state.fields.state} handleChange={this.handleChange} />
							<NU.input type="number" fieldName="zip" field={this.state.fields.zip} handleChange={this.handleChange} />
						</div>
						<div className="col-md-6">
							<NU.input type="number" fieldName="email" field={this.state.fields.email} handleChange={this.handleChange} />
							<NU.input type="tel" fieldName="phone" field={this.state.fields.phone} handleChange={this.handleChange} />
							<NU.input type="username" fieldName="username" field={this.state.fields.username} handleChange={this.handleChange} />
							<NU.input type="password" fieldName="password" field={this.state.fields.password} handleChange={this.handleChange} />
							<NU.input type="password" fieldName="passwordConfirm" field={this.state.fields.passwordConfirm} handleChange={this.handleChange} />
						</div>
					</div>
					<div className="form-row">
						<button type="button" className="btn btn-primary btn-lg btn-block">Submit</button>
					</div>
					<div className="form-row mt-4">
						<h4>Other Stuff</h4>
						<div className="form-group">
							<small className=" form-text">
								We have the highest respect for the personal data of our customers. With that in mind, we reserve the right to sell that data to anybody who wants it, for any reason and without informing you. You can rest assured that your data is safe with us, and that any leak of your personal data will come from some third-party customer of ours and not our own servers.
							</small>
							<small className=" form-text">
								Please select your privacy and marketing preferences below. Bear in mind that lower settings could result in voids of warranties and refusal of specific services to be named later.
							</small>
						</div>
					</div>
					<div className="form-row">
						<div className="col-md-6">
							<div className=" form-text mb-3">How much of your personal data can we use?</div>
							<div className="form-group">
								<div className="custom-control custom-radio custom-control-inline">
									<input type="radio" className="form-check-input" name="privacy-level" value="2" defaultChecked />
									<label><strong>All!</strong></label>
								</div>
								<div className="custom-control custom-radio custom-control-inline">
									<input type="radio" className="form-check-input" name="privacy-level" value="1" />
									<label><em>Some</em></label>
								</div>
								<div className="custom-control custom-radio custom-control-inline">
									<input type="radio" className="form-check-input" name="privacy-level" value="0" />
									<label>Nah</label>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className=" form-text mb-3">How may we contact you?</div>
							<div className="form-group">
								<NU.checkbox labelText={this.state.fields.contactPhone.placeholder} fieldName="contactPhone" checked={this.state.fields.contactPhone.value} inline={true} handleChange={this.handleChange} />
								<NU.checkbox labelText={this.state.fields.contactEmail.placeholder} fieldName="contactEmail" checked={this.state.fields.contactEmail.value} inline={true} handleChange={this.handleChange} />
								<NU.checkbox labelText={this.state.fields.contactVisit.placeholder} fieldName="contactVisit" checked={this.state.fields.contactVisit.value} inline={true} handleChange={this.handleChange} />
							</div>
						</div>
					</div>
					<div className="form-row">
						<div className="col mb-3">
							<button type="button" className="btn btn-primary">Select All</button>
						</div>
					</div>
					<div className="form-row">
						{checkboxes}
					</div>
				</form>
				</div>
			);
		}
	},
	button : class extends React.Component {
		render() {
			return(
				<button className="my-button">My Button</button>
			);
		}
	},
	input : class extends React.Component {
		render() {
			let markup = (this.props.type === "username")
			?
			<div className="input-group">
				<div className="input-group-prepend">
					<div className="input-group-text">@</div>
				</div>
			<input type="text" className="form-control form-control-lg" name={this.props.fieldName} placeholder={this.props.field.placeholder} onChange={this.props.handleChange} />
			</div>
			:
			<input type={this.props.type} className="form-control form-control-lg" name={this.props.fieldName} placeholder={this.props.field.placeholder} onChange={this.props.handleChange} />
			;

			return(
				<div className="form-group">
					<label className="sr-only">{this.props.field.labelText}</label>
					{markup}
				</div>
			)
		}
	},
	radioOption : class extends React.Component {
		render() {
		}
	},
	radioGroup : class extends React.Component {
		render() {
		}
	},
	select : class extends React.Component {
		render() {
			let listItems = this.props.options.map((item) =>
				<option key={item.id} value={item.id}>{item.label}</option>
			);
			return(
				<div className="form-group">
					<label  htmlFor={this.props.fieldName} className="sr-only">{this.props.field.labelText}</label>
					<select className="form-control form-control-lg" id={this.props.fieldName} name={this.props.fieldName} value={this.props.field.value} onChange={this.props.handleChange}>
						<option value="">{this.props.field.placeholder}</option>
						{listItems}
					</select>
				</div>
			);
		}
	},
	checkbox : class extends React.Component {
		render() {
			let containerClasses = "custom-control custom-checkbox";
			containerClasses = this.props.inline ? containerClasses + '  custom-control-inline' : containerClasses;
			return(
				<div className={containerClasses}>
					<input onChange={this.props.handleChange} type="checkbox" className={"custom-control-input mb-1"+this.props.extraClass} id={this.props.fieldName} name={this.props.fieldName} checked={this.props.checked} />
					<label className="custom-control-label" htmlFor={this.props.fieldName}>{this.props.labelText}</label>
				</div>
			);
		}
	}
}


ReactDOM.render(
  <NU.form />, document.getElementById('new-user-form')
);


})();