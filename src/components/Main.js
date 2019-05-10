import React from "react";
import ContentForm from "./ContentForm";
import RulesForm from "./RulesForm";
import HighlightedText from "./HighlightedText";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content:
        "You will deliver new technology with an adorable puppy. Perfect!",
      rules: [
        {
          startOffset: 4,
          endOffset: 20,
          color: "#d9f593",
          priority: 0
        },
        {
          startOffset: 17,
          endOffset: 31,
          color: "#e8e8e8",
          priority: 1
        }
      ]
    };
  }

  onContentSubmit = content => {
    this.setState({ ...this.state, content: content });
  };

  onRulesSubmit = rules => {
    this.setState({ ...this.state, rules: rules });
  };

  render() {
    return (
      <div>
        <div className="Input-bar">
          <ContentForm
            content={this.state.content}
            onSubmit={this.onContentSubmit}
          />
          <RulesForm rules={this.state.rules} onSubmit={this.onRulesSubmit} />
        </div>
        <HighlightedText rules={this.state.rules} content={this.state.content} />
      </div>
    );
  }
}
