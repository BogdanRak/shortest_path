const { convertToGraph, shortestDistanceNode } = require('./utils')

function useDijkstraAlgorithm(graph = null, startNode = null, endNode = null, maxConnections = null) {
  // Validate params
  if (!(graph instanceof Array) && !(graph instanceof Object)) {
    throw new Error('Graph is not an object and array')
  }

  if (graph instanceof Array) {
    graph = convertToGraph(graph)
  }

  if (!(typeof startNode === 'string')) {
    throw new Error('Start node must be a string')
  }

  if (!(typeof endNode === 'string')) {
    throw new Error('End node must be a string')
  }

  if (maxConnections && !(typeof maxConnections === 'number' && isFinite(maxConnections) && maxConnections > 0)) {
    throw new Error('The number of max connections is incorrect')
  }

  let distances = {};
  distances[endNode] = "Infinity";
  distances = {
    ...distances, 
    ...graph[startNode]
  }

  let parents = { endNode: null };

  for (let child in graph[startNode]) {
    parents[child] = startNode;
  }
    
  let visited = [];
  let node = shortestDistanceNode(distances, visited);
    
  while (node) {
    let distance = distances[node];
    let children = graph[node]; 

    for (let child in children) {
      if (String(child) === String(startNode)) {
        continue;
      } else {
        let newdistance = distance + children[child];
        // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        if (!distances[child] || distances[child] > newdistance) {
          // save the distance to the object
          distances[child] = newdistance;
          // record the path
          parents[child] = node;
        } 
      }
    }  
    
    visited.push(node);
    node = shortestDistanceNode(distances, visited);
  }

  let shortestPath = [endNode];
  let parent = parents[endNode];

  while (parent) {
    shortestPath.unshift(parent);
    parent = parents[parent];
  }
    
  // Find the shortest path and its cost
  let results = {
    cost: distances[endNode],
    path: shortestPath,
  }

  if (!results.path.length) {
    return `There is no way from '${startNode}' to '${endNode}'`;
  }

  if (maxConnections && (results.path.length - 1) > maxConnections) {
    return `There is no way from '${startNode}' to '${endNode}' with ${maxConnections} hops`;
  }

  return results;
}

module.exports = useDijkstraAlgorithm;