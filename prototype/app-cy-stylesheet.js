'use strict';

var defaultNodeStyle = {
	//node body
	//shape
	'width': 'label',
	'height': 'label',
	'shape': 'rectangle',
	//background
	'background-color': '#000',
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
titleNodeStyle['background-color'] = '#F88';

var chapterNodeStyle = Object.assign({}, defaultNodeStyle);
chapterNodeStyle['background-color'] = '#Fb8';

var keywordNodeStyle = Object.assign({}, defaultNodeStyle);
keywordNodeStyle['background-color'] = '#8Fb';

var descriptionNodeStyle = Object.assign({}, defaultNodeStyle);
descriptionNodeStyle['background-color'] = '#FF8';


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