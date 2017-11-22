'use strict';

var id = 0

function newId(){
	id += 1;
	return id
}

var chapters = [
'What is Gamification and\ngamification research?',
'Does gamification work?',
'Effective gamification \ndesign and ethical \nconsiderations',
'Motivation Theory',
'Engagement and\n Fun Theory',
'Behavioral \nEconomics Theory',
]

var initialElements = [{
	data: { 
		id: newId(), 
		type:'type1', 
		text:'Game\nStudies' 
	},
	position: {x: 0, y: 0}
}]
for (var i = 0; i < chapters.length; i++) {
	var element = {
		data: {
			id: newId(),
			type: 'type2',
			text: chapters[i],
		},
		position: {x:0, y:-100 * (i+1)},

	};
	initialElements.push(element);
}

for (var i = 0; i < chapters.length; i++) {
	var element = {data: {
		id: newId(),
		type: 'default',
		source: i+1,
		target: i+2,
	}};
	initialElements.push(element);
}


//TBD: add recommendation presets: map "definition" keyword with the recommended defs. render them.
var suggestions = [
"Huotari's definition\nof gamification",

];

var suggestMap = {
	'definition': suggestions[0]
};

