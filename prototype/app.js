'use strict';

//document.getElementById('add').onclick = function() {addNode()};
//document.getElementById('remove').onclick = function() {removeSelected()};
//document.getElementById('selected').onclick = function() {seeSelected()};


function addNode(){
	cy.add({group: "nodes", data: {id:"new"}, position:{x:300, y:300}});
}
function removeSelected(){
	if (selected != null){
		cy.remove(selected);
	}
}
function seeSelected(){
	console.log(selected.data())
}

var id = getCurrentIdCounter()
function getCurrentIdCounter(){
	//TBD: need to get the max index of loaded graph
	return 5
}
function newId(){
	id += 1;
	return id
}


var cy = cytoscape({
	container: document.getElementById('cy'),
	elements: [ // list of graph elements to start with
		{ // node a
			data: 
			{ 
				id: 1, 
				type:'type1', 
				text:'Game\nStudies' 
			}
		},
		{ // node b
			data: 
			{ 
				id: 2, 
				type:'type2', 
				text: 'What is Gamification and\n gamification research?'
			}
		},
		{ // node c
			data: 
			{ 
				id: 3, 
				type:'type3',
				text: 'Definition of Gamification' 
			}
		},
		{ // edge ab
			data: 
			{ 
				id: 4, 
				source: '1', 
				target: '2' 
			}
		},
		{ // edge bc
			data: 
			{ 
				id: 5, 
				source: '2', 
				target: '3' }
		}
	],
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
			selector: 'edge',
			style: defaultEdgeStyle
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
	wheelSensitivity: 1,
	pixelRatio: 'auto'

});

var layout = cy.layout(layoutOptions);
layout.run();

var selected = null;

cy.on('tap', 'node', function(evt){
	var node = evt.target;
	console.log(node.id() + ' selected');
	selected = node;
});

cy.on('tap', function(event){
	var evtTarget = event.target;
	if (evtTarget == cy) {
		console.log('background tap')
	} else {
		console.log('tap on some element')
	}
});

cy.$('#1').qtip({
  content: 'shere are descriptions!',
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
	        image: {src : "remove.svg", width : 12, height : 12, x : 6, y : 4},
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
	        image: {src : "add.svg", width : 12, height : 12, x : 6, y : 4},
	        coreAsWell: true,
	        onClickFunction: function (event) {
	          var data = {
	              //group: 'nodes',
	          	  type: 'type3',
	              text: 'new node'
	          };
	          
	          var pos = event.position || event.cyPosition;
	          
	          cy.add({
	          		group:'nodes',
	            	data: data,
	            	position: {
	                  x: pos.x,
	                  y: pos.y
	              }
	          });
	        }
	    },
	    {
	    	id: 'add-connected-node',
	    	content: 'add connected node',
	    	tooltipText: 'create a node connected to this node',
	    	image: {src : "add.svg", width : 12, height : 12, x : 6, y : 4},
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
	    	content: 'add connected node',
	    	tooltipText: 'add an edge connecting to another node',
	    	image: {src : "add.svg", width : 12, height : 12, x : 6, y : 4},
	    	selector: 'node',
	    	onClickFunction: function(event) {
	    		var target = event.target || event.cyTarget;
	    		//TBD: 
	    	}
	    },
	    {
	        id: 'remove-selected',
	        content: 'remove selected',
	        tooltipText: 'remove selected',
	        image: {src : "remove.svg", width : 12, height : 12, x : 6, y : 6},
	        coreAsWell: true,
	        onClickFunction: function (event) {
	          cy.$(':selected').remove();
	        }
	    },
	]
});