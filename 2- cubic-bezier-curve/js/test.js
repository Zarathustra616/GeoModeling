var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT);
camera.position.z = 50;
scene.add(camera);
//
// [1.0, 0.0, 0.0, 1.0],[0.707, 0.707, 0.0, 0.0707],
//     [0.0, 1.0, 0.0, 1.0], [0.707, 0.707, 0.0, 0.0707]
const arrayVectors = [
    new THREE.Vector3( 1, 0, 0 ),
	new THREE.Vector3( -5, 15, 0 ),
	new THREE.Vector3( 20, 15, 0 ),
	new THREE.Vector3( 10, 0, 0 )
]
let curve = new THREE.CubicBezierCurve3(
    arrayVectors[0],
    arrayVectors[1],
    arrayVectors[2],
    arrayVectors[3],
);

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );

scene.add(curveObject);
// cube.rotation.set(0.4, 0.2, 0);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

