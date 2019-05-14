import { uniqBy } from 'lodash';
export default class Utils {

  /*
    getHighlights -> return a list of all the highlighted objects for rendering
    1. Sort highlighting rules by priority so we can overwrite less important
       rules in a single loop, going from least to greatest priority
    2. Merge these rules to solve for issues where the highlighting rules overlap
    3. Sort them and slice text accordingly
  */
  static getHighlights(text, rules) {
    rules.sort((a, b) => { return b.priority - a.priority });
    let mergedRules = Utils.merge(text, rules);
    return Utils.getWordBlocks(mergedRules, text);
  }

  /*
    merge -> figure out conflicts between highlighting rules and return the result

    [[[     ]]] -> existing block
    <<<     >>> -> new block
    We want to coalesce existing blocks with new blocks, overwriting intervals based on priority.
    In this function, we can assume that rules are in reverse-priority order.
  */

  static merge(text, rules) {
    var blocks = [{ start: 0, end: text.length, color: null }];
    rules.forEach(rule => {
      const currStart = rule.startOffset;
      const currEnd = rule.endOffset;
      const currColor = rule.color;

      // curried functions because it's fun and looks cleaner
      let newBlockSurrounds = Utils.surrounds(currStart, currEnd);
      let newBlockSurrounded = Utils.surrounded(currStart, currEnd);
      let newBlockOverlapsLeft = Utils.overlapsLeft(currStart, currEnd);
      let newBlockOverlapsRight = Utils.overlapsRight(currStart, currEnd);

      blocks.forEach(existingBlock => {
        // block surrounds            <<< [[[      ]]] >>> 
        if (newBlockSurrounds(existingBlock)) {
          blocks = blocks.filter(i => { return i !== existingBlock; });
        }

        // block surrounded           [[[ <<<      >>> ]]]
        if (newBlockSurrounded(existingBlock)) {
          blocks = blocks.filter(i => { return i !== existingBlock; })
          blocks.push({ start: existingBlock.start, end: currStart, color: existingBlock.color });
          blocks.push({ start: currEnd, end: existingBlock.end, color: existingBlock.color });
        }

        // block overlaps left        <<< [[[      >>> ]]]
        if (newBlockOverlapsLeft(existingBlock)) {
          blocks = blocks.filter(i => { return i !== existingBlock; })
          blocks.push({ start: currEnd, end: existingBlock.end, color: existingBlock.color });
        }

        // block overlaps right       [[[ <<<      ]]] >>>
        if (newBlockOverlapsRight(existingBlock)) {
          blocks = blocks.filter(i => { return i !== existingBlock; })
          blocks.push({ start: existingBlock.start, end: currStart, color: existingBlock.color });
        }
      });
      blocks.push({
        start: currStart, end: currEnd, color: currColor
      })
    });
    return blocks;
  }

  static overlapsLeft = (start, end) => {
    return (other) => {
      return other.start >= start && other.end > end && other.start < end;
    }
  }

  static overlapsRight = (start, end) => {
    return (other) => {
      return other.start < start && other.end <= end && other.end > start;
    }
  }

  static surrounded = (start, end) => {
    return (other) => {
      return other.start < start && other.end > end;
    }
  }

  static surrounds = (start, end) => {
    return (other) => {
      return other.start >= start && other.end <= end;
    }
  }

  static getWordBlocks(intervals, text) {
    intervals.sort((a, b) => { return a.start - b.start });
    return intervals.map(interval => {
      return { id: interval.start, chars: text.slice(interval.start, interval.end), color: interval.color };
    });
  }
}
