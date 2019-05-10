import React from "react";

export default class ContentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.content };
  }

  onChange = event => {
    this.setState({ content: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    return this.props.onSubmit(event.target[0].value);
  };

  render() {
    return (
      <div>
        <p> Input content </p>
        <form className="Input-form" onSubmit={this.onSubmit}>
          <label>
            <textarea
              className="Input-content"
              type="text"
              name="content"
              onChange={this.onChange}
              value={this.state.content}
            />
          </label>
          <input className="Apply-button" type="submit" value="Set content" />
        </form>
      </div>
    );
  }
}
