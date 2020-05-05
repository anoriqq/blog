'use strict';

import { Node } from 'unist';
import { default as visit } from 'unist-util-visit';
import { default as toString } from 'mdast-util-to-string';

interface INode extends Node {
  depth: number;
}

export default ({ markdownAST }, pluginOptions) => {
  visit<INode>(markdownAST, 'heading', node => {
    let { depth } = node;
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
