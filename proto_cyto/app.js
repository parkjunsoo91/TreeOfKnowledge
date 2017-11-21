'use strict';

document.getElementById('add').onclick = function() {addNode()};
document.getElementById('remove').onclick = function() {removeSelected()};
document.getElementById('selected').onclick = function() {seeSelected()};


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
			style: {
				'width': 'label',
				'height': 'label',
				'padding': '10px',
				'shape': 'rectangle',
				'background-color': '#F00',
				'border-width': 2,
				'border-style': 'solid',
				'border-color': 'black',
				'label': 'data(text)'
			}
	    },
	    {
			selector: 'node[type="type2"]',
			style: {
				'width': 'label',
				'height': 'label',
				'padding': '10px',
				'compound-sizing-wrt-labels': 'include',
				'shape': 'rectangle',
				'background-color': '#FF0',
				'border-width': 2,
				'border-style': 'solid',
				'border-color': 'black',
				'label': 'data(text)',
				'color': 'blue',
				'text-events': 'yes',
				'text-valign': 'center',
				'text-halign': 'center',
				'text-wrap': 'wrap',
				'text-max-width': 1000
			}
	    },
	    {
			selector: 'node[type="type3"]',
			style: {
				'width': 60,
				'height': 60,
				'shape': 'roundrectangle',
				'background-color': '#080',
				'border-width': 2,
				'border-style': 'solid',
				'border-color': 'black',
				'label': 'data(text)'
			}
	    },
		{
			selector: 'edge',
			style: {
				'width': 5,
				'curve-style': 'haystack',
				'haystack-radius': 0,
				'line-color': '#852',
				'line-style': 'solid',
				'target-arrow-color': '#0f0',
				'target-arrow-shape': 'triangle',
			}
		},
		{
			selector: 'core',
			style:{
				'active-bg-color': 'red'
			}
		}
	],

	layout: {
	    name: 'grid',
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

var options = {
  name: 'cose',

  // Called on `layoutready`
  ready: function(){},

  // Called on `layoutstop`
  stop: function(){},
  
  // Whether to animate while running the layout
  // true : Animate continuously as the layout is running
  // false : Just show the end result
  // 'end' : Animate with the end result, from the initial positions to the end positions
  animate: 'end',

  // Easing of the animation for animate:'end'
  animationEasing: undefined,

  // The duration of the animation for animate:'end'
  animationDuration: 2000,

  // A function that determines whether the node should be animated
  // All nodes animated by default on animate enabled
  // Non-animated nodes are positioned immediately when the layout starts
  animateFilter: function ( node, i ){ return true; },


  // The layout animates only after this many milliseconds for animate:true
  // (prevents flashing on fast runs)
  animationThreshold: 250,

  // Number of iterations between consecutive screen positions update
  // (0 -> only updated on the end)
  refresh: 20,

  // Whether to fit the network view after when done
  fit: true,

  // Padding on fit
  padding: 30,

  // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  boundingBox: undefined,

  // Excludes the label when calculating node bounding boxes for the layout algorithm
  nodeDimensionsIncludeLabels: false,

  // Randomize the initial positions of the nodes (true) or use existing positions (false)
  randomize: false,

  // Extra spacing between components in non-compound graphs
  componentSpacing: 40,

  // Node repulsion (non overlapping) multiplier
  nodeRepulsion: function( node ){ return 2048; },

  // Node repulsion (overlapping) multiplier
  nodeOverlap: 4,

  // Ideal edge (non nested) length
  idealEdgeLength: function( edge ){ return 32; },

  // Divisor to compute edge forces
  edgeElasticity: function( edge ){ return 32; },

  // Nesting factor (multiplier) to compute ideal edge length for nested edges
  nestingFactor: 1.2,

  // Gravity force (constant)
  gravity: 1,

  // Maximum number of iterations to perform
  numIter: 1000,

  // Initial temperature (maximum node displacement)
  initialTemp: 1000,

  // Cooling factor (how the temperature is reduced between consecutive iterations
  coolingFactor: 0.99,

  // Lower temperature threshold (below this point the layout will end)
  minTemp: 1.0,

  // Pass a reference to weaver to use threads for calculations
  weaver: false
};
var layout = cy.layout(options);
layout.run();

cy.add({
	group: "nodes",
	data: {id: 'baby', weight:75},
	position: {x:200, y:200}
})

var eles = cy.add([
	{ group: "nodes", data: { id: "n0" }, position: { x: 100, y: 100 } },
	{ group: "nodes", data: { id: "n1" }, position: { x: 200, y: 200 } },
	{ group: "edges", data: { id: "e0", source: "n0", target: "n1" } }
]);

var j = cy.$('#j')
var collection = cy.elements("node[weight>50]");
cy.remove(collection);

var collection = cy.collection();


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

cy.$('#a').qtip({
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
	    			position: {x: pos.x, y: pos.y + 10}
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
	    {
	        id: 'select-all-nodes',
	        content: 'select all nodes',
	        tooltipText: 'select all nodes',
	        selector: 'node',
	        onClickFunction: function (event) {
	          selectAllOfTheSameType(event.target || event.cyTarget);
	        }
	    },
	    {
	        id: 'select-all-edges',
	        content: 'select all edges',
	        tooltipText: 'select all edges',
	        selector: 'edge',
	        onClickFunction: function (event) {
	          selectAllOfTheSameType(event.target || event.cyTarget);
	        }
	    }
	]
});