'use strict';

//document.getElementById('add').onclick = function() {addNode()};
//document.getElementById('remove').onclick = function() {removeSelected()};
//document.getElementById('selected').onclick = function() {seeSelected()};
var cy = cytoscape({
	container: document.getElementById('cy'),
	elements: initialElements,
	style: [ // the stylesheet for the graph
	    {
			selector: 'node[type="type1"]',
			style: titleNodeStyle,
	    },
	    {
			selector: 'node[type="type2"]',
			style: chapterNodeStyle,
	    },
	    {
			selector: 'node[type="type3"]',
			style: keywordNodeStyle,
	    },
	    {
			selector: 'node[type="suggestion"]',
			style: suggestionNodeStyle,
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
	    name: 'random',
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
	textarea.innerHTML = text;
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

function addNode(pos){
	var data = {
		id: newId(),
		type: 'type3',
		text: 'new node'
	};
	cy.add({
  		group:'nodes',
    	data: data,
    	position: {
          x: pos.x,
          y: pos.y
      	}
  	});
}
function addEdge(id1, id2){
	var data = {
		id: newId(),
		source: id1,
		target: id2,
	};
	cy.add({
		group: 'edges',
		data: data,
	});
}

function addPredefinedNode(){
	var data = {
		id: newId(),
		type: 'type2',
		text: 'new node'
	};
	cy.add({
  		group:'nodes',
    	data: data,
    	position: {
          x: 0,
          y: 0
      	}
  	});
}


cy.on('tap', function(event){
	var evtTarget = event.target;
	if (evtTarget == cy) {
		console.log('background tap')
	} else {
		console.log('tap on some element')
	}
});

cy.$('#1').qtip({
  content: 'here are descriptions!',
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

cy.contextMenus({
	menuItems: [
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
	    		var nodeId = newId();
	    		var edgeId = newId();
	    		cy.add([
	    		{
	    			group: 'nodes',
	    			data: {
	    				id: nodeId,
	    				type: 'type3',
	    				text: 'new node',
	    			},
	    			position: {x: pos.x, y: pos.y - 100}
	    		},
	    		{
	    			group: 'edges',
	    			data: {
	    				id: edgeId,
	    				source: target.id(),
	    				target: nodeId,
	    			}
	    		}]);
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
