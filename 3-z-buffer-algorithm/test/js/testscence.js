var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
camera.position.z = 50;
scene.add(camera);

var geometry = new THREE.BoxGeometry(10, 10, 10);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.z = 10

camera.position.z = 25;

var geometry1 = new THREE.BoxGeometry(10, 10, 10);
var material1 = new THREE.MeshBasicMaterial({color: 0xff0000});
var cube1 = new THREE.Mesh(geometry, material1);
scene.add(cube1);

cube1.position.z = 0
cube1.position.x = 5


function render() {
    requestAnimationFrame(render);
    cube.position.z -= 0.1
    renderer.render(scene, camera);
}

render();