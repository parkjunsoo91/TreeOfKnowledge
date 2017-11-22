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
	}
}]
for (var i = 0; i < chapters.length; i++) {
	var element = {data: {
		id: newId(),
		type: 'type2',
		text: chapters[i],
	}};
	initialElements.push(element);
}

for (var i = 0; i < chapters.length; i++) {
	var element = {data: {
		id: newId(),
		source: i+1,
		target: i+2,
	}};
	initialElements.push(element);
}
