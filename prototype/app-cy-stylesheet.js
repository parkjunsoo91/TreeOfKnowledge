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
	'text-max-width': 400,
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
keywordNodeStyle['shape'] = 'roundrectangle';

var suggestionNodeStyle = Object.assign({}, defaultNodeStyle);
suggestionNodeStyle['background-color'] = '#084';
suggestionNodeStyle['shape'] = 'roundrectangle';
suggestionNodeStyle['border-opacity'] = 0.5;
suggestionNodeStyle['background-opacity'] = 0.5


var descriptionNodeStyle = Object.assign({}, defaultNodeStyle);
descriptionNodeStyle['background-color'] = '#FF8';


var defaultEdgeStyle = {
	'width': 5,
	'curve-style': 'haystack',
	'haystack-radius': 0,
	'line-color': '#a62',
	'line-style': 'solid',
	'target-arrow-color': '#0f0',
	'target-arrow-shape': 'triangle',
};

var suggestionEdgeStyle = Object.assign({}, defaultEdgeStyle);
suggestionEdgeStyle['line-style'] = 'dashed';
suggestionEdgeStyle['opacity'] = 0.5;



var defaultCoreStyle = {
	'active-bg-color': 'blue'
};