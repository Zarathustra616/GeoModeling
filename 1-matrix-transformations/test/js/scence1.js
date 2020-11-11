import Stats from '../../../libs/stats.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import dat from '../../../libs/dat.gui/build/dat.gui.module.js';
import * as THREE from "../../../libs/three.module.js";

//Init Gui Table
let gui, params, folderScaling, folderTurn, folderObliqueShift, folderOop
//Init Json
const url = 'data.json'
let dataScence = null
//Init Scence
let WIDTH, HEIGHT, container, renderer
const scene = new THREE.Scene()
//Init camera
let cameraPerspective, cameraRig, cameraOrtho, activeCamera, controls, stats
//Init OrthographicCamera coef
let fov_y, depht_s, Z, aspect, size_y, size_x
//Init geometry
const geometry = new THREE.Geometry()
const matrix = new THREE.Matrix4()

const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
const mesh = new THREE.Mesh(geometry, material);



const setParams = () => params = {
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
}

const addFolderScaling = () => {
    folderScaling.add(params, 'ScalingX').name('По оси X :').onChange(function () {
        // console.log(params.interation)
    })
    folderScaling.add(params, 'ScalingY').name('По оси Y :').onChange(function () {
        // console.log(params.interation)
    })
    folderScaling.add(params, 'ScalingZ').name('По оси Z:').onChange(function () {
        // console.log(params.interation)
    })
}

const addFolderTurn = () => {
    folderTurn.add(params, 'TurnX').name('Вокруг оси X на угол α:').onChange(function () {
        // console.log(params.interation)
    })
    folderTurn.add(params, 'TurnY').name('Вокруг оси Y на угол α:').onChange(function () {
        // console.log(params.interation)
    })
    folderTurn.add(params, 'TurnZ').name('Вокруг оси Z на угол α:').onChange(function () {
        // console.log(params.interation)
    })
}

const addFolderObliqueShift = () => {
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
}

const addFolderOop = () => {
    folderOop.add(params, 'oopX').name('По оси X с фокусным расстоянием fx:').onChange(function () {
        // console.log(params.interation)
    })
    folderOop.add(params, 'oopY').name('По оси Y с фокусным расстоянием fy:').onChange(function () {
        // console.log(params.interation)
    })
    folderOop.add(params, 'oopZ').name('По оси Z с фокусным расстоянием fz:').onChange(function () {
        console.log(params.oopZ)
    })
}

const initGuiTable = () => {
    gui = new dat.GUI({height: 5 * 32 - 1});
    folderScaling = gui.addFolder('Матрица масштабирования')
    folderTurn = gui.addFolder('Матрица поворота')
    folderObliqueShift = gui.addFolder('Матрица косого сдвига')
    folderOop = gui.addFolder('Матрица ОПП')

    setParams()
    addFolderScaling()
    addFolderTurn()
    addFolderObliqueShift()
    addFolderOop()

    gui.add(params, 'Parallel').name('Матрица параллельного переноса на вектор ⃗a (x, y, z):').onChange(function () {
        // console.log(params.interation)
    })

}

const calculationOrtoCoef = () => {
    fov_y = 45;
    depht_s = Math.tan(fov_y / 2.0 * Math.PI / 180.0) * 2.0;
    Z = 100;
    aspect = WIDTH / HEIGHT
    size_y = depht_s * Z
    size_x = depht_s * Z * aspect
}

const addedVectors = (dataScence) => {
    console.log("addedVectors dataScence", dataScence)
    try {
        for (let property in dataScence) {
            if (property === 'points') {
                for (let numberArray in dataScence[property]) {
                    let x = dataScence[property][numberArray][0]
                    let y = dataScence[property][numberArray][1]
                    let z = dataScence[property][numberArray][2]
                    geometry.vertices.push(new THREE.Vector3(x, y, z))
                }
            } else if (property === 'segments') {
                let segment1 = dataScence[property][0]
                let segment2 = dataScence[property][1]
                let segment3 = dataScence[property][2]
                geometry.faces.push(new THREE.Face3(segment1, segment2, segment3))
                geometry.computeBoundingSphere()
            }
        }
    } catch (e) {
        console.log('addedVectors:', e)
    }
}

const setupScence = () => {
    WIDTH = window.innerWidth
    HEIGHT = window.innerHeight

    container = document.createElement('div')
    document.body.appendChild(container)

    renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xdfe9c8, 1)
    container.appendChild(renderer.domElement)

    cameraPerspective = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000)
    cameraPerspective.position.set(0, 0, 100)

    calculationOrtoCoef()

    cameraOrtho = new THREE.OrthographicCamera(-size_x / 2, size_x / 2,
    size_y / 2, -size_y / 2, 1, 1000)
    cameraOrtho.position.set(0, 0, 100)

    cameraRig = new THREE.Group()
    cameraRig.add(cameraPerspective)
    cameraRig.add(cameraOrtho)

    scene.add(cameraRig)

    activeCamera = cameraOrtho
    //add object
    addedVectors()
    cameraRig.add(mesh)
    scene.add(mesh)

    controls = new OrbitControls(activeCamera, renderer.domElement)
    controls.update()
}

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


const onKeyDown = (event) => {
    switch (event.keyCode) {
        case 79: /*O*/
            activeCamera = cameraOrtho;
            break;

        case 80: /*P*/
            activeCamera = cameraPerspective;
            break;
    }
    const controls = new OrbitControls(activeCamera, renderer.domElement);
    controls.update();
}

async function main() {
    initGuiTable()
    setupScence()
    dataScence = await getFile(url)
    addedVectors(dataScence)

    stats = new Stats();
    container.appendChild(stats.dom);
    document.addEventListener('keydown', onKeyDown, false)
    render();
}

main()