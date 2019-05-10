import React from "react";

export default class RulesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rules: JSON.stringify(this.props.rules) };
  }

  onChange = event => {
    this.setState({ rules: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    return this.props.onSubmit(JSON.parse(event.target[0].value));
  };

  render() {
    return (
      <div>
        <p> Input rules </p>
        <form className="Input-form" onSubmit={this.onSubmit}>
          <label>
            <textarea
              className="Input-rules"
              type="text"
              name="rules"
              onChange={this.onChange}
              value={this.state.rules}
            />
          </label>
          <input className="Apply-button" type="submit" value="Set rules" />
        </form>
      </div>
    );
  }
}
