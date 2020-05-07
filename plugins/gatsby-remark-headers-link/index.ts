/* eslint-disable */

import { Node } from 'unist';
import visit from 'unist-util-visit';
import toString from 'mdast-util-to-string';

interface INode extends Node {
  depth: number;
}

export default ({ markdownAST }) => {
  visit<INode>(markdownAST, 'heading', node => {
    const { depth } = node;
    const text = toString(node);
    const html = `
      <h${depth} id="${text}">
        <a href="#${text}" class="anchor before">${'#'.repeat(
      depth
    )}</a> ${text}
      </h${depth}>
    `;
    node.type = 'html';
    node.children = undefined;
    node.value = html;
  });
  return markdownAST;
};
