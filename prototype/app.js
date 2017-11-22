'use strict';

//document.getElementById('add').onclick = function() {addNode()};
//document.getElementById('remove').onclick = function() {removeSelected()};
document.getElementById('edit').onclick = function() {updateText()};

var cy = cytoscape({
	container: document.getElementById('cy'),
	elements: initialElements,
	style: [ // the stylesheet for the graph
	    {
			selector: 'node[type="type1"]', //title
			style: titleNodeStyle,
	    },
	    {
			selector: 'node[type="type2"]', //chapter
			style: chapterNodeStyle,
	    },
	    {
			selector: 'node[type="type3"]', //keyword (limited), made from right toolbar
			style: keywordNodeStyle,
	    },
	    {
			selector: 'node[type="suggestion"]',
			style: suggestionNodeStyle,
	    },
	    {
			selector: 'node[type="type4"]', //descriptions (unlimited), made with right click
			style: descriptionNodeStyle,
	    },
		{
			selector: 'edge[type="default"]',
			style: defaultEdgeStyle,
		},
		{
			selector: 'edge[type="suggestion"]',
			style: suggestionEdgeStyle,
		},
		{
			selector: 'core',
			style: defaultCoreStyle
		}
	],

	layout: {
	    name: 'preset',
	    rows: 1
  	},

	// initial viewport state:
	zoom: 1,
	pan: { x: 0, y: 0 },

  	// interaction options:
	minZoom: 1e-1,
	maxZoom: 1e1,
	zoomingEnabled: true,
	userZoomingEnabled: true,
	panningEnabled: true,
	userPanningEnabled: true,
	boxSelectionEnabled: false,
	selectionType: 'single',
	touchTapThreshold: 8,
	desktopTapThreshold: 4,
	autolock: false,
	autoungrabify: false,
	autounselectify: false,

	// rendering options:
	headless: false,
	styleEnabled: true,
	hideEdgesOnViewport: false,
	hideLabelsOnViewport: false,
	textureOnViewport: false,
	motionBlur: false,
	motionBlurOpacity: 0.2,
	wheelSensitivity: 0.1,
	pixelRatio: 'auto'

});

playLayout();

//global variables
var state = 'normal'
var selected = null;

cy.on('tap', 'node', function(evt){
	var node = evt.target;
	console.log(node.id() + ' selected');

	//edge adding mode
	if (state == 'edge'){
		state = 'normal';
		addEdge(selected.id(), node.id());
	}

	//show text content in UI
	var text = node.data()['text'];
	console.log(text);
	var textarea = document.getElementById('textarea')
	textarea.value = text;
	selected = node;
});

function playLayout(){
	var layout = cy.layout(layoutOptions);
	layout.run();
	setTimeout(function(){
		layout.stop();
	}, 1000)
}


function removeSelected(){
	if (selected != null){
		cy.remove(selected);
	}
}
function seeSelected(){
	console.log(selected.data())
}

function addNode(pos, type){
	var data = {
		id: newId(),
		type: 'type4',
		text: 'new node'
	};
	if (type == 'suggestion'){
		data['type'] = 'suggestion';		
	}
	var ele = cy.add({
  		group:'nodes',
    	data: data,
    	position: {
          x: pos.x,
          y: pos.y
      	}
  	});
  	return ele;
}

function addEdge(id1, id2, type){
	var data = {
		id: newId(),
		type: 'default',
		source: id1,
		target: id2,
	};
	if (type == 'suggestion'){
		data['type'] = 'suggestion';
	}
	var ele = cy.add({
		group: 'edges',
		data: data,
	});
	return ele;
}


function updateText(){
	if (selected == null){
		return;
	}
	var text = document.getElementById('textarea').value;
	console.log(text)
	selected.data()['text'] = text;
	handleSuggestion(selected);
}

function handleSuggestion(node){
	var text = node.data()['text'];
	Object.keys(suggestMap).forEach(function(key,index) {
    // key: the name of the object key
    // index: the ordinal position of the key within the object
	    if (text.search(key) != -1){
	    	var newtext = suggestMap[key]
	    	var pos = node.position();
	    	var newNode = addNode({x:pos.x, y:pos.y-100}, 'suggestion');
	    	newNode.data()['text'] = newtext;
	    	addEdge(node.id(), newNode.id(), 'suggestion')
	    	addQtip(newNode);
	    } 
	});
}

function addPredefinedNode(){

  if(document.getElementById('nodenum').value == 0) {
    return;
  }

  var data = {
		id: newId(),
		type: 'type3',
		text: 'new node'
	};
	var ele = cy.add({
  		group:'nodes',
    	data: data,
    	position: {
          x: 0,
          y: 0
      	}
  	});

    decreaseNodenum();
}

function decreaseNodenum(){
    var resource = document.getElementById('nodenum').value;
    if(resource == 0) {
      return;
    }
    resource -= 1;
    document.getElementById('nodenum').value = resource;
}

function addFruit(){

  if(document.getElementById('fruitnum').value == 0) {
    return;
  }

	var img = document.createElement("img");
  img.src = "images/fruit2.png";
  img.style = "height:40px";

  var src = document.getElementById("spawn_p");
  src.appendChild(img);

  decreaseFruitnum();
}

function decreaseFruitnum(){
    var resource = document.getElementById('fruitnum').value;
    if(resource == 0) {
      return;
    }
    resource -= 1;
    document.getElementById('fruitnum').value = resource;
}

cy.on('tap', function(event){
	var evtTarget = event.target;
	if (evtTarget == cy) {
		console.log('background tap')
	} else {
		console.log('tap on some element')
	}
});



function addQtip(ele){
	ele.qtip({
		content: 'do you like the suggestion? You can ACCEPT the suggestion.',
		position: {
		    my: 'top center',
		    at: 'bottom center'
	  	},  
	  	style: {
		    classes: 'qtip-bootstrap',
		    tip: {
				width: 16,
				height: 8
		    }
  		}
  	});
}

cy.contextMenus({
	menuItems: [
	    {
	        id: 'accept-suggestion',
	        content: 'accept suggestion',
	        tooltipText: 'add suggested node to your tree',
	        selector: 'node[type="suggestion"]',
	        onClickFunction: function (event) {
	          var target = event.target || event.cyTarget;
	          if(document.getElementById('nodenum').value == 0) {
			    return;
			  }
			  target.data()['type'] = 'type3';
			  var edges = target.connectedEdges();
			  for (var i=0; i < edges.length; i++){
			  	edges[i].data()['type'] = 'default';
			  }
			  decreaseNodenum();
	        },
	        hasTrailingDivider: true
		},
		{
	        id: 'remove',
	        content: 'remove',
	        tooltipText: 'remove',
	        image: {src : "images/remove.svg", width : 12, height : 12, x : 6, y : 4},
	        selector: 'node, edge',
	        onClickFunction: function (event) {
	          var target = event.target || event.cyTarget;
	          target.remove();
	        },
	        hasTrailingDivider: true
		},
		{
	        id: 'hide',
	        content: 'hide',
	        tooltipText: 'hide',
	        selector: '*',
	        onClickFunction: function (event) {
	          var target = event.target || event.cyTarget;
	          target.hide();
	        },
	        disabled: false
		},
		{
	        id: 'add-node',
	        content: 'add node',
	        tooltipText: 'add node',
	        image: {src : "images/add.svg", width : 12, height : 12, x : 6, y : 4},
	        coreAsWell: true,
	        onClickFunction: function (event) {
				var pos = event.position || event.cyPosition;
		        addNode(pos);
	        }
	    },
	    {
	    	id: 'add-connected-node',
	    	content: 'add connected node',
	    	tooltipText: 'create a node connected to this node',
	    	image: {src : "images/add.svg", width : 12, height : 12, x : 6, y : 4},
	    	selector: 'node',
	    	onClickFunction: function(event) {
	    		var target = event.target || event.cyTarget;
	    		var pos = event.position || event.cyPosition;
	    		var newNode = addNode(pos);
	    		addEdge(target.id(), newNode.id());
	    	}
	    },
	    {
	    	id: 'add-edge',
	    	content: 'add edge',
	    	tooltipText: 'add an edge connecting to another node',
	    	image: {src : "images/add.svg", width : 12, height : 12, x : 6, y : 4},
	    	selector: 'node',
	    	onClickFunction: function(event) {
	    		var target = event.target || event.cyTarget;
	    		//TBD: change game state to edge addition state, and possibly show edge following cursor
	    		state = 'edge';
	    		selected = event.target;
	    	}
	    },
	    {
	        id: 'remove-selected',
	        content: 'remove selected',
	        tooltipText: 'remove selected',
	        image: {src : "images/remove.svg", width : 12, height : 12, x : 6, y : 6},
	        coreAsWell: true,
	        onClickFunction: function (event) {
	          cy.$(':selected').remove();
	        }
	    },
	]
});
