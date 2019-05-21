(function(){

let NU = {
	form : class extends React.Component {
		constructor() {
			super();
			this.state = {
				stuff:true,
				things:true
			}
		}
		render() {
			return(
				<form id="my-form" className="blah">
					<h3>New User</h3>
					<div className="form-row">
						<div className="col-md-6">
							<NU.input type="text" labelText="Name" placeholderText="John Smith" />
							<NU.input type="text" labelText="Address" placeholderText="123 Nota Street" />
							<NU.input type="text" labelText="City" placeholderText="Nowherville" />
							<div className="form-group">
								<label className="sr-only">State</label>
								<select className="form-control form-control-lg">
									<option>RI</option>
									<option>RI</option>
									<option>RI</option>
									<option>RI</option>
									<option>RI</option>
									<option>RI</option>
									<option>RI</option>
									<option>RI</option>
								</select>
							</div>
							<NU.input type="number" labelText="ZIP Code" placeholderText="55555" />
						</div>
						<div className="col-md-6">
							<NU.input type="number" labelText="Email" placeholderText="no@junkmail.com" />
							<NU.input type="tel" labelText="Phone" placeholderText="555-555-5555" />
							<div className="form-group">
								<label className="sr-only">Username</label>
								<div className="input-group">
									<div className="input-group-prepend">
										<div className="input-group-text">@</div>
									</div>
									<input type="text" className="form-control form-control-lg" name="username" placeholder="username" />
								</div>
							</div>
							<NU.input type="password" labelText="Password" placeholderText="New Password" />
							<NU.input type="password" labelText="Confirm Password" placeholderText="Confirm password" />
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
								<div className="custom-control custom-checkbox custom-control-inline">
									<input type="checkbox" className="form-check-input" name="contact-type" value="phone" defaultChecked />
									<label>Phone</label>
								</div>
								<div className="custom-control custom-checkbox custom-control-inline">
									<input type="checkbox" className="form-check-input" name="contact-type" value="email" />
									<label>Email</label>
								</div>
								<div className="custom-control custom-checkbox custom-control-inline">
									<input type="checkbox" className="form-check-input" name="contact-type" value="visit" />
									<label>In-person visit</label>
								</div>
							</div>
						</div>
					</div>
					<div className="form-row">
						<div className="col mb-3">
							<strong>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Select All</label>
							</div>
							</strong>
						</div>
					</div>
					<div className="row flex-row justify-content-center">
						<div className="col-sm-6 col-md-3 mb-3">
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
						</div>
						<div className="col-sm-6 col-md-3 mb-3">
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
						</div>
						<div className="col-sm-6 col-md-3">
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
						</div>
						<div className="col-sm-6 col-md-3">
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
							<div className="custom-control custom-checkbox">
								<input type="checkbox" name="test1" className="custom-control-input mb-1" />
								<label className="custom-control-label" htmlFor="test1">Check this box</label>
							</div>
						</div>
					</div>
				</form>
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
			<div className="form-group">
				<label className="sr-only">Username</label>
				<div className="input-group">
					<div className="input-group-prepend">
						<div className="input-group-text">@</div>
					</div>
					<input type={this.props.type} className="form-control form-control-lg" name="name" placeholder={this.props.placeholderText} />
				</div>
			</div>
			:
			<div className="form-group">
				<label className="sr-only">{this.props.labelText}</label>
				<input type={this.props.type} className="form-control form-control-lg" name="name" placeholder={this.props.placeholderText} />
			</div>
			;
			return (markup);
		}
	},
	select : class extends React.Component {
		render() {
			return(
				<button className="my-button">My Button</button>
			);
		}
	},
	radio : class extends React.Component {
		render() {
			return(
				<button className="my-button">My Button</button>
			);
		}
	},
	checkbox : class extends React.Component {
		render() {
			return(
				<button className="my-button">My Button</button>
			);
		}
	}	
}


ReactDOM.render(
  <NU.form />, document.getElementById('new-user-form')
);


})();