

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

// var camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT, 0.1, 10000);
const camera = new THREE.OrthographicCamera(WIDTH / -2, WIDTH / 2,
                                                 HEIGHT / 2, HEIGHT / -2, 50, 10000)
camera.position.z = 300;
scene.add(camera);

var boxGeometry = new THREE.BoxGeometry(100, 100, 100);
var basicMaterial = new THREE.MeshBasicMaterial({color: 0x0095DD});
var cube = new THREE.Mesh(boxGeometry, basicMaterial);
cube.position.x = -25;
cube.position.z = 50
cube.rotation.set(0.4, 0.2, 0);
scene.add(cube);

var light = new THREE.PointLight(0xFFFFFF);
light.position.set(-10, 15, 50);
scene.add(light);


function render() {
	requestAnimationFrame(render);
	cube.position.z -= 0.1;
	renderer.render(scene, camera);
}
render();