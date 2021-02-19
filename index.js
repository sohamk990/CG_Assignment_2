import { vec3, vec4, mat4 } from 'https://cdn.skypack.dev/gl-matrix';
import objLoader from 'https://cdn.skypack.dev/webgl-obj-loader';

import Shader from './shader.js';
import vertexShaderSrc from './vertex.js';
import fragmentShaderSrc from './fragment.js';
import Renderer from './renderer.js';
import Rectangle from './rectangle.js';

const renderer = new Renderer();
const gl = renderer.webGlContext();
const Canvas = renderer.getCanvas();
const shader = new Shader(gl, vertexShaderSrc, fragmentShaderSrc);
shader.use();

var arr = [];
let angle=0;
let meshData;

// // 0 object X-AXIS
// meshData = new objLoader.Mesh(document.getElementById('X.obj').innerHTML);
// arr.push(new Rectangle(gl,shader,Canvas,meshData.vertices,meshData.indices,[1,0,0]));

// // 1 object Y-AXIS
// meshData = new objLoader.Mesh(document.getElementById('Y.obj').innerHTML);
// arr.push(new Rectangle(gl,shader,Canvas,meshData.vertices,meshData.indices,[0,1,0]));

// // 2 object Z-AXIS
// meshData = new objLoader.Mesh(document.getElementById('Z.obj').innerHTML);
// arr.push(new Rectangle(gl,shader,Canvas,meshData.vertices,meshData.indices,[0,0,1]));

// 3 object TETRAHEDRON
meshData = new objLoader.Mesh(document.getElementById('Tetrahedron.obj').innerHTML);
arr.push(new Rectangle(gl,shader,Canvas,meshData.vertices,meshData.indices,[1,1,0]));

// // 4 object OCTAHEDRON
// meshData = new objLoader.Mesh(document.getElementById('Octahedron.obj').innerHTML);
// arr.push(new Rectangle(gl,shader,Canvas,meshData.vertices,meshData.indices,[0,1,1]));

// // 5 object PYRAMID
// meshData = new objLoader.Mesh(document.getElementById('Pyramid.obj').innerHTML);
// arr.push(new Rectangle(gl,shader,Canvas,meshData.vertices,meshData.indices,[1,0,1]));


// renderer.getCanvas().addEventListener('click', (event) =>
// {
// 	let mouseX = event.clientX;
// 	let mouseY = event.clientY;
// 	const clipCoordinates = renderer.mouseToClipCoord(mouseX,mouseY);
// 	const position = new Float32Array([...clipCoordinates,0]);
	
// });

// window.addEventListener("keydown", (kp)=>
// {
// 	var code = kp.key;	

// 	if(code=="a" || code == "a")
// 	{
// 		for (let index = 3; index < arr.length; index++)
// 		{
// 			arr[index].setTranslate(vec3.fromValues(0,0,0));
// 		}
// 	}
// 	else if(code=="b" || code == "B")
// 	{
// 		arr[3].getTransform().setTranslate(vec3.fromValues(-0.866/2,-0.5/2,0));
// 		arr[4].getTransform().setTranslate(vec3.fromValues(0.866/2,-0.5/2,0));
// 		arr[5].getTransform().setTranslate(vec3.fromValues(0,1/2,0));
		
// 	}
// 	else if(code=="c" || code == "C")
// 	{
// 		arr[3].getTransform().setTranslate(vec3.fromValues(0,-0.5/2,0));
// 		arr[4].getTransform().setTranslate(vec3.fromValues(0.433/2,0.25/2,0));
// 		arr[5].getTransform().setTranslate(vec3.fromValues(-0.433/2,0.25/2,0));
// 	}
// 	else if(code=="d" || code == "D")
// 	{
// 		// arr[3].getTransform().setTranslate(vec3.fromValues(0,-0.5/2,0));
// 		// arr[4].getTransform().setTranslate(vec3.fromValues(0.433/2,0.25/2,0));
// 		// arr[5].getTransform().setTranslate(vec3.fromValues(-0.433/2,0.25/2,0));
// 	}
// 	else if(code=="e" || code == "E")
// 	{
// 		// arr[3].getTransform().setRotate(vec3.fromValues(0,0,1),90*Math.PI/180);
// 		// arr[4].getTransform().setRotate(vec3.fromValues(0,1,0),90*Math.PI/180);
// 		// arr[5].getTransform().setRotate(vec3.fromValues(1,0,0),90*Math.PI/180);
// 	}
// 	else if(code=="g" || code == "g")
// 	{
// 		// arr[3].getTransform().setScale(0.5);
// 		// arr[4].getTransform().setScale(2);
// 		// arr[5].getTransform().setScale(3);
// 	}
// 	else if(code=="h" || code == "H")
// 	{		
// 		// arr[3].getTransform().setScale(-0.5);
// 		// arr[4].getTransform().setScale(-2);
// 		// arr[5].getTransform().setScale(-3);
// 	}
// },true);

function animate()
{
	renderer.clear();	
	for (let index = 0; index < arr.length; index++)
	{ 
		// let radius = 1;
		// let x,y;
		// x = Math.cos(angle) * radius;
		// y = Math.sin(angle) * radius;

		// angle+=(0.1*Math.PI/180);
		// angle%=2*Math.PI;
		
		// arr[index].getTransform().setCameraPosition(vec3.fromValues(0,0,0));
		arr[index].draw();
	}
	window.requestAnimationFrame(animate);
}
animate();
shader.delete();