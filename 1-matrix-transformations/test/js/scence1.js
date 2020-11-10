// init
import Stats from '../../../libs/stats.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import dat from '../../../libs/dat.gui/build/dat.gui.module.js';
import * as THREE from "../../../libs/three.module.js";

const gui = new dat.GUI({height: 5 * 32 - 1});

const folderScaling = gui.addFolder('Матрица масштабирования')
const folderTurn = gui.addFolder('Матрица поворота')
const folderObliqueShift = gui.addFolder('Матрица косого сдвига')
const folderOop = gui.addFolder('Матрица ОПП')

const params = {
    Parallel: 0,
    ScalingX: 0,
    ScalingY: 0,
    ScalingZ: 0,
    TurnX: 0,
    TurnY: 0,
    TurnZ: 0,
    obliqueShiftXY: 0,
    obliqueShiftXZ: 0,
    obliqueShiftYX: 0,
    obliqueShiftYZ: 0,
    obliqueShiftZX: 0,
    obliqueShiftZY: 0,
    oopX: 0,
    oopY: 0,
    oopZ: 0
};

gui.add(params, 'Parallel').name('Матрица параллельного переноса на вектор ⃗a (x, y, z):').onChange(function () {
    // console.log(params.interation)
})

folderScaling.add(params, 'ScalingX').name('По оси X :').onChange(function () {
    // console.log(params.interation)
})
folderScaling.add(params, 'ScalingY').name('По оси Y :').onChange(function () {
    // console.log(params.interation)
})
folderScaling.add(params, 'ScalingZ').name('По оси Z:').onChange(function () {
    // console.log(params.interation)
})

folderTurn.add(params, 'TurnX').name('Вокруг оси X на угол α:').onChange(function () {
    // console.log(params.interation)
})
folderTurn.add(params, 'TurnY').name('Вокруг оси Y на угол α:').onChange(function () {
    // console.log(params.interation)
})
folderTurn.add(params, 'TurnZ').name('Вокруг оси Z на угол α:').onChange(function () {
    // console.log(params.interation)
})

folderObliqueShift.add(params, 'obliqueShiftXY').name('Оси X по оси Y с коэффициентом k:').onChange(function () {
    // console.log(params.interation)
})
folderObliqueShift.add(params, 'obliqueShiftXZ').name('Оси X по оси Z с коэффициентом k:').onChange(function () {
    // console.log(params.interation)
})
folderObliqueShift.add(params, 'obliqueShiftYX').name('Оси Y по оси X с коэффициентом k:').onChange(function () {
    // console.log(params.interation)
})
folderObliqueShift.add(params, 'obliqueShiftYZ').name('Оси Y по оси Z с коэффициентом k:').onChange(function () {
    // console.log(params.interation)
})
folderObliqueShift.add(params, 'obliqueShiftZX').name('Оси Z по оси X с коэффициентом k:').onChange(function () {
    // console.log(params.interation)
})
folderObliqueShift.add(params, 'obliqueShiftZY').name('Оси Z по оси Y с коэффициентом k:').onChange(function () {
    // console.log(params.interation)
})

folderOop.add(params, 'oopX').name('По оси X с фокусным расстоянием fx:').onChange(function () {
    // console.log(params.interation)
})
folderOop.add(params, 'oopY').name('По оси Y с фокусным расстоянием fy:').onChange(function () {
    // console.log(params.interation)
})
folderOop.add(params, 'oopZ').name('По оси Z с фокусным расстоянием fz:').onChange(function () {
    console.log(params.oopZ)
})

const url = 'data.json'
let dataScence = null

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const container = document.createElement('div')
document.body.appendChild(container)

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xdfe9c8, 1)
container.appendChild(renderer.domElement)

const scene = new THREE.Scene();


const cameraPerspective = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT,1, 1000)
cameraPerspective.position.set(0,0,100)

var fov_y   = 45;
var depht_s = Math.tan(fov_y/2.0 * Math.PI/180.0) * 2.0;
var Z = 100;
var aspect = WIDTH/HEIGHT;
var size_y = depht_s * Z;
var size_x = depht_s * Z * aspect;


const cameraOrtho = new THREE.OrthographicCamera(-size_x/2,  size_x/2,
    size_y/2, -size_y/2,1, 1000)
cameraOrtho.position.set(0,0,100)



const cameraRig = new THREE.Group();
cameraRig.add(cameraPerspective);
cameraRig.add(cameraOrtho);

scene.add(cameraRig);

let activeCamera = cameraOrtho

var boxGeometry = new THREE.BoxGeometry(50, 50, 50);
var basicMaterial = new THREE.MeshBasicMaterial({color: 0x0095DD, wireframe: true});
var cube = new THREE.Mesh(boxGeometry, basicMaterial);


cameraRig.add(cube)
scene.add(cube);

const controls = new OrbitControls(activeCamera, renderer.domElement );

controls.update();

let stats

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, activeCamera);
}


async function getFile(url) {
    try {
        const rawData = await fetch(url)
        const data = await rawData.json()
        return data
    } catch (err) {
        console.error(err)
    }
}


function onKeyDown(event) {
    switch (event.keyCode) {
        case 79: /*O*/
            activeCamera = cameraOrtho;
            break;

        case 80: /*P*/
            activeCamera = cameraPerspective;
            break;
    }
    const controls = new OrbitControls(activeCamera, renderer.domElement );
    controls.update();
}

async function main() {

    dataScence = await getFile(url)
    // addedVectors(dataScence)

    stats = new Stats();
    container.appendChild(stats.dom);
    // window.addEventListener('resize', onWindowResize, false)
    document.addEventListener('keydown', onKeyDown, false)
    render();
    animate();
}

main()