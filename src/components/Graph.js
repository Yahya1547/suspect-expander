import React from 'react';
import {InteractiveForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';

const Graph = ({data}) => {
    const buildNode = (data) => {
        var node = []
        node.push({
            id : data.payload.id,
            name : data.payload.name,
            element : data.payload.element
        });
        data.payload.friends.forEach(friend => {
            node.push({
                id : friend.id,
                name : friend.name,
                element : friend.element
            });
        });
        return node;
    }

    const buildEdge = (data) => {
        var edge = []
        data.payload.friends.forEach(friend => {
            edge.push({
                src : data.payload.id,
                target : friend.id
            })
        });
        return edge;
    }

    const nodes = buildNode(data);
    const edges = buildEdge(data);
    const elementColor = {
        "fire" : "red",
        "air" : "lightcyan",
        "water" : "aqua",
        "earth" : "green"
    };
    
    const nodeGraph = nodes.map(x => {
        return (
            <ForceGraphNode node={{ id : x.id, label : x.name, radius: 20 }} fill={elementColor[x.element]} stroke="black" />
        );
    });

    const edgeGraph = edges.map(x => {
        return (
            <ForceGraphLink link={{ source : x.src, target : x.target }} />
        );
    })
    return ( 
        <div className="graph">
            <InteractiveForceGraph
                zoom
                simulationOptions={{ 
                    height: 300, 
                    width: 300,
                    radiusMargin : 20,
                }}
                labelAttr="label"
                onSelectNode={(event, node) => console.log(node)}
                onDeselectNode={(event, node) => console.log(node)}
                highlightDependencies
            >
                {nodeGraph}
                {edgeGraph}
                {/* <ForceGraphNode node={{ id: 'first-node', label: 'First node' }} fill="red" />
                <ForceGraphNode node={{ id: 'second-node', label: 'Second node' }} fill="blue" />
                <ForceGraphLink link={{ source: 'first-node', target: 'second-node' }} /> */}
            </InteractiveForceGraph>
        </div>
    );
}

export default Graph;