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

const base = new THREE.Object3D();
const size = 6;
const side = THREE.DoubleSide
const geometry = new THREE.PlaneBufferGeometry(size, size);
[
    {position: [-1, 0, 0], up: [0, 1, 0],},
    {position: [1, 0, 0], up: [0, -1, 0],},
    {position: [0, -1, 0], up: [0, 0, -1],},
    {position: [0, 1, 0], up: [0, 0, 1],},
    {position: [0, 0, -1], up: [1, 0, 0],},
    {position: [0, 0, 1], up: [-1, 0, 0],},
].forEach((settings, ndx) => {
    const material = new THREE.MeshBasicMaterial({side});
    material.color.setHSL(ndx / 6, .5, .5);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.up.set(...settings.up);
    mesh.lookAt(...settings.position);
    mesh.position.set(...settings.position).multiplyScalar(size * .75);
    base.add(mesh);
});

const base1 = new THREE.Object3D();
const size1 = 6;
const side1 = THREE.FrontSide
const geometry1 = new THREE.PlaneBufferGeometry(size, size);
[
    {position: [-1, 0, 0], up: [0, 1, 0],},
    {position: [1, 0, 0], up: [0, -1, 0],},
    {position: [0, -1, 0], up: [0, 0, -1],},
    {position: [0, 1, 0], up: [0, 0, 1],},
    {position: [0, 0, -1], up: [1, 0, 0],},
    {position: [0, 0, 1], up: [-1, 0, 0],},
].forEach((settings, ndx) => {
    const material = new THREE.MeshBasicMaterial({side1});
    material.color.setHSL(ndx / 6, .5, .5);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.up.set(...settings.up);
    mesh.lookAt(...settings.position);
    mesh.position.set(...settings.position).multiplyScalar(size * .75);
    base1.add(mesh);
});

// var boxGeometry = new THREE.BoxGeometry(10, 10, 10);
// var basicMaterial = new THREE.MeshBasicMaterial({color: 0x0095DD, wireframe: false, side: THREE.BackSide});
// var cube = new THREE.Mesh(boxGeometry, basicMaterial);
scene.add(base);
scene.add(base1)
base1.position.x = 15
// base.rotation.set(0.4, 0.2, 0);

function render() {
        requestAnimationFrame( render );
  base.rotation.x += 0.01;
  base.rotation.y += 0.01;
  base1.rotation.x += 0.01;
  base1.rotation.y += 0.01;
  renderer.render( scene, camera );
}
render();