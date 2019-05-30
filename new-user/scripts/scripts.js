(function(){

let NU = {
	form : class extends React.Component {
		constructor() {
			super();
			this.state = {
				submitted: false,
				states:[],
				subscriptions:[],
				fields: {
					name:{
						value:'',
						labelText:'Name',
						placeholder:'John Smith',
						required:true,
						validated: null,
						errorMessage:"We need a name, please."
					},
					address:{
						value:'',
						labelText:'Address',
						placeholder:'123 Nota Street',
						required:true,
						validated: null,
						errorMessage:"We need your full address so we can spam you old-school."
					},
					city:{
						value:'',
						labelText:'City',
						placeholder:'Nowhereville',
						required:true,
						validated: null,
						errorMessage:"We can't send our mailers just anywhere."
					},
					state:{
						value:'',
						labelText:'State',
						placeholder:'Select a State',
						required:true,
						validated: null,
						errorMessage:"We need to know what state you're in."
					},
					zip:{
						value:'',
						labelText:'ZIP Code',
						placeholder:'555555',
						required:true,
						validated: null,
						errorMessage:"This field is really important for our junk mail department."
					},
					email:{
						value:'',
						labelText:'Email',
						placeholder:'no@junkmail.com',
						required:true,
						validated: null,
						errorMessage:"We can't spam you without a proper email address."
					},
					phone:{
						value:'',
						labelText:'Phone',
						placeholder:'555-555-5555',
						required:true,
						validated: null,
						errorMessage:"Please give us your phone number so we can text you every day."
					},
					username:{
						value:'',
						labelText:'Username',
						placeholder:'username',
						required:true,
						validated: null,
						errorMessage:"Come on, you know you need to fill this one out."
					},
					password:{
						value:'',
						labelText:'Password',
						placeholder:'Password',
						required:true,
						validated: null,
						errorMessage:"Your password can be anything except blank because we're not messing with regex right now."
					},
					passwordConfirm:{
						value:'',
						labelText:'Confirm Password',
						placeholder:'Confirm Password',
						required:true,
						validated: null,
						errorMessage:"This field is required and needs to match your password."
					},
					personalDataSetting:{
						options:[
							{
								label:'Nah',
								id:'0'
							},
							{
								label:'Some',
								id:'1'
							},
							{
								label:'All!',
								id:'2'
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
			this.selectAllBoxes = this.selectAllBoxes.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
		}

		handleChange(evt) {
			//console.log(evt.target.name, '-', evt.target.value);

			let fieldsClone = {...this.state.fields};

			switch(evt.target.type) {
				case "checkbox":
					console.log(evt.target.name, '-', evt.target.checked);
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
						<NU.checkbox labelText={sub.label} extraClass=" subscription" fieldName={sub.id} checked={that.state.fields[sub.id].value} handleChange={that.handleChange} />
					</div>
				)
			});
		}

		selectAllBoxes() {
			let fieldsClone = {...this.state.fields};

			fieldsClone.contactEmail.value = true;
			fieldsClone.contactPhone.value = true;
			fieldsClone.contactVisit.value = true;

			// Watch out, this line works but it's long as hell.
			fieldsClone.personalDataSetting.value = fieldsClone.personalDataSetting.options[fieldsClone.personalDataSetting.options.length-1].id;

			this.state.subscriptions.forEach( (sub) => {
				//console.log('sub', sub.id, fieldsClone[sub.id]);
				fieldsClone[sub.id].value = true;
			});

			console.log('fieldsClone', fieldsClone);

			this.setState({
				fields:fieldsClone
			});
		}

		handleSubmit(evt) {
			evt.preventDefault;
			if (this.validate()) this.submitForm();
		}

		validate() {
			let formValid = true;
			let objFields = {...this.state.fields};
			Object.keys(objFields).forEach( (key) =>{
				let field = objFields[key];

				// Skip fields that aren't required.
				if (!field.required) return;

				// Only required fields will get this far.
				if (!field.value) {
					field.validated = false;
					formValid = false;
				} else {
					field.validated = true;
				}
			});

			// Passwords are entered but don't match.
			if (objFields.password.value && objFields.passwordConfirm.value && objFields.password.value !== objFields.passwordConfirm.value) {
				objFields.passwordConfirm.validated = false;
				formValid = false;
			}

			this.setState({
				fields:objFields
			});
			return formValid;
		}

		submitForm() {
			let fieldsClone = {...this.state.fields};
			let arrFields = Object.keys(fieldsClone).map( (key) =>{
				let strValue = !fieldsClone[key].value ? null : fieldsClone[key].value;
				return key+'='+strValue;

			});
			this.setState({submitted:true});
			console.log( 'my/api/post.php?'+ arrFields.join('&') );
		}


		render() {
			let markup = null;
			if(this.state.submitted) {
				markup = 
					<div className="container p-3">
						<div className="row justify-content-center">
							<div className="col-12 col-md-8 col-lg-6">
								<h3>Form Submitted!</h3>
								<p>Thank you for sharing your personal information while creating your account! We will never share your personal information with <strong>anyone</strong><sup>*</sup> and our super-secure servers are entirely hacker-proof!<sup>**</sup> Now that you have an account with our company, you can enjoy all of the services we provide<sup>***</sup> free of charge while surfing the web!</p>
								<p>You are now enrolled in an exciting array of magazines and newsletters which will enhance your executive experience through synergy!<sup>****</sup> We're glad to have you with us, but if you ever change your mind you can just contact Customer Service to change your notification settings!</p>
								<ul className="list-unstyled">
									<li><small className="text-muted">* Your personal data will never be given to any third party for free. However, we reserve the right to sell that information to third parties.</small></li>
									<li><small className="text-muted">** Although we do have cyber-security measures in place, we take no responsibility for any actions which may be performed by individuals outside of our company.</small></li>
									<li><small className="text-muted">*** We do not provide any products or services.</small></li>
									<li><small className="text-muted">**** You will not receive any contact from sources which appeared on the registration form and were deselected. Contact may continue from additional sources which may or may not be listed.</small></li>
									<li><small className="text-muted">***** We do not contact you in any way, so we have no need for a Customer Service Department. However, many of our vendors do have Customer Service departments and you may contact them individually to discuss your notification settings with that third-party vendor.</small></li>
								</ul>
							</div>
						</div>
					</div>
				;
			} else {
				let checkboxes = this.getSubscriptionCheckboxes();
				markup =
					<div className="container">
					<form id="my-form" className="p-3" noValidate >
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
								<NU.input type="email" fieldName="email" field={this.state.fields.email} handleChange={this.handleChange} />
								<NU.input type="tel" fieldName="phone" field={this.state.fields.phone} handleChange={this.handleChange} />
								<NU.input type="username" fieldName="username" field={this.state.fields.username} handleChange={this.handleChange} />
								<NU.input type="password" fieldName="password" field={this.state.fields.password} handleChange={this.handleChange} />
								<NU.input type="password" fieldName="passwordConfirm" field={this.state.fields.passwordConfirm} handleChange={this.handleChange} />
							</div>
						</div>
						<div className="form-row">
							<button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handleSubmit}>Submit</button>
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
								<NU.radioGroup fieldName="personalDataSetting" field={this.state.fields.personalDataSetting} inline={true} handleChange={this.handleChange} />
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
								<button type="button" className="btn btn-primary" onClick={this.selectAllBoxes}>Select All</button>
							</div>
						</div>
						<div className="form-row">
							{checkboxes}
						</div>
					</form>
					</div>
				;
			}
			return markup;
		}
	},
	input : class extends React.Component {
		render() {
			let validationClass, errorMessage = null;
			switch(this.props.field.validated) {
				case true:
					validationClass = ' is-valid';
					break;
				case false:
					validationClass = ' is-invalid';
					errorMessage = <small className="text-danger">{this.props.field.errorMessage}</small>;
					break;
				default:
					validationClass = '';
			}
			let markup = (this.props.type === "username")
			?
			<div className="input-group">
				<div className="input-group-prepend">
					<div className="input-group-text">@</div>
				</div>
			<input type="text" className={"form-control form-control-lg"+validationClass} name={this.props.fieldName} placeholder={this.props.field.placeholder} onChange={this.props.handleChange} />
			</div>
			:
			<input type={this.props.type} className={"form-control form-control-lg"+validationClass} name={this.props.fieldName} placeholder={this.props.field.placeholder} onChange={this.props.handleChange} />
			;

			return(
				<div className="form-group">
					<label className="sr-only">{this.props.field.labelText}</label>
					{markup}
					{errorMessage}
				</div>
			)
		}
	},
	radioGroup : class extends React.Component {
		render() {
			let containerClasses = "custom-control custom-radio";
			containerClasses = this.props.inline ? containerClasses + '  custom-control-inline' : containerClasses;

			let radioOptions = this.props.field.options.map((option) => {
				return(
					<div key={option.id} className={containerClasses}>
						<input type="radio" className="form-check-input" name={this.props.fieldName} value={option.id} checked={this.props.field.value === option.id} onChange={this.props.handleChange} />
						<label>{option.label}</label>
					</div>
				);
			}).reverse();

			return(
				<div className="form-group">
					{radioOptions}
				</div>
			);
		}
	},
	select : class extends React.Component {
		render() {

			let validationClass, errorMessage = null;
			switch(this.props.field.validated) {
				case true:
					validationClass = ' is-valid';
					break;
				case false:
					validationClass = ' is-invalid';
					errorMessage = <small className="text-danger">{this.props.field.errorMessage}</small>;
					break;
				default:
					validationClass = '';
			}

			let listItems = this.props.options.map((item) =>
				<option key={item.id} value={item.id}>{item.label}</option>
			);
			return(
				<div className="form-group">
					<label  htmlFor={this.props.fieldName} className="sr-only">{this.props.field.labelText}</label>
					<select className={"form-control form-control-lg"+validationClass} id={this.props.fieldName} name={this.props.fieldName} value={this.props.field.value} onChange={this.props.handleChange}>
						<option value="">{this.props.field.placeholder}</option>
						{listItems}
					</select>
					{errorMessage}
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