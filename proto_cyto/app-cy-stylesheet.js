'use strict';

var defaultNodeStyle = {
	//node body
	//shape
	'width': 'label',
	'height': 'label',
	'shape': 'rectangle',
	//background
	'background-color': '#F00',
	//border
	'border-width': 2,
	'border-style': 'solid',
	'border-color': 'black',
	//padding
	'padding': '10px',
	//labels
	//label text
	'label': 'data(text)',
	//basic font styling
	'color': 'black',
	//wrapping text
	'text-wrap': 'wrap',
	'text-max-width': 1000,
	//node label alignment
	'text-valign': 'center',
	'text-halign': 'center',
};

var titleNodeStyle = Object.assign({}, defaultNodeStyle);

var chapterNodeStyle = Object.assign({}, defaultNodeStyle);
chapterNodeStyle['background-color'] = '#FF0';

var userNodeStyle = Object.assign({}, defaultNodeStyle);
userNodeStyle['background-color'] = '#0F0';


var defaultEdgeStyle = {
	'width': 5,
	'curve-style': 'haystack',
	'haystack-radius': 0,
	'line-color': '#840',
	'line-style': 'solid',
	'target-arrow-color': '#0f0',
	'target-arrow-shape': 'triangle',
};

var defaultCoreStyle = {
	'active-bg-color': 'red'
};