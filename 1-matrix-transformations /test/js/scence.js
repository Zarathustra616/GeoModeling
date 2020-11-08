// init
import Stats from '../../../libs/stats.module.js';

import dat from '../../../libs/dat.gui/build/dat.gui.module.js';

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

//Scence

const url = 'data.json'
let dataScence = null

let SCREEN_WIDTH = window.innerWidth
let SCREEN_HEIGHT = window.innerHeight
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT

let container, stats
let camera, renderer, mesh
let cameraRig, activeCamera
let cameraOrtho, cameraPerspective

const scene = new THREE.Scene()
const geometry = new THREE.Geometry()

function onKeyDown(event) {
    switch (event.keyCode) {
        case 79: /*O*/
            activeCamera = cameraOrtho;
            break;

        case 80: /*P*/
            activeCamera = cameraPerspective;
            break;
    }
}

const animate = () => {
    requestAnimationFrame(animate);
    render();
    stats.update();
}

const render = () => {
    if (activeCamera === cameraPerspective) {
        cameraPerspective.far = mesh.position.length();
        cameraPerspective.updateProjectionMatrix();
    } else {
        cameraOrtho.far = mesh.position.length();
        cameraOrtho.updateProjectionMatrix();
    }
    renderer.render(scene, activeCamera);
}

const initContainer = () => {
    container = document.createElement('div')
    document.body.appendChild(container)
}

const initRenderer = () => {
    renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
    renderer.setClearColor(0xdfe9c8, 1)
    container.appendChild(renderer.domElement)
}

const initCamera = () => {
    camera = new THREE.PerspectiveCamera(50, 0.5 * aspect, 1, 10000)
    camera.position.z = 20
}

const initCameraPerspective = () => cameraPerspective = new THREE.PerspectiveCamera(50, aspect)

const initCameraOrtho = () => cameraOrtho = new THREE.OrthographicCamera(SCREEN_WIDTH / -2, SCREEN_WIDTH / 2,
                                                                         SCREEN_HEIGHT / 2, SCREEN_HEIGHT / -2)

const installationActiveCamera = () => activeCamera = cameraPerspective

// const initCameraRig = () => {
//     cameraRig = new THREE.Group()
//     cameraRig.add(cameraPerspective)
//     cameraRig.add(cameraOrtho)
// }

const initMesh = () => mesh = new THREE.Mesh(new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true}))


const init = () => {
    initContainer()
    initRenderer()
    initCamera()
    initCameraPerspective()
    initCameraOrtho()
    installationActiveCamera()
    // initCameraRig()
    initMesh()

    scene.add(cameraRig)
    scene.add(mesh)
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


async function main() {
    init()

    dataScence = await getFile(url)
    addedVectors(dataScence)

    stats = new Stats();
    container.appendChild(stats.dom);
    // window.addEventListener('resize', onWindowResize, false)
    document.addEventListener('keydown', onKeyDown, false)
    animate()
}

main()