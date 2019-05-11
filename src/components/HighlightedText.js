import React from "react";
import Utils from "../util/util.js";
export default class HighlightedText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: props.content, rules: props.rules };
  }

  componentDidUpdate(prevProps) {
    const newContent = this.props.content;
    const newRules = this.props.rules;
    if (newContent !== prevProps.content || newRules !== prevProps.rules) {
      this.setState({ ...this.state, content: newContent, rules: newRules });
    }
  }

  render() {
    let highlights = Utils.getHighlights(
      this.state.content,
      this.state.rules
    );
    return (
      <div className="Highlight-text">
        {highlights.map(highlight => (
          <span key={highlight.id} style={{
            background: highlight.color,
            borderRadius: 20
          }}>
            {highlight.chars}
          </span>
        ))}
      </div>
    );
  }
}
