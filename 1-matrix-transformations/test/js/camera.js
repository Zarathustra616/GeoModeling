import * as THREE from '../../../libs/three.module.js';

import Stats from '../../../libs/stats.module.js';

let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

let container, stats;
let camera, scene, renderer, mesh;
let cameraRig, activeCamera, activeHelper;
let cameraPerspective, cameraOrtho;
let cameraPerspectiveHelper, cameraOrthoHelper;
const frustumSize = 600;

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();
    console.log(scene.clone())

    //

    camera = new THREE.PerspectiveCamera(50, aspect, 1, 10000);
    // camera.position.z = 2500;

    cameraPerspective = new THREE.PerspectiveCamera(50, aspect, 150, 1000);

    cameraOrtho = new THREE.OrthographicCamera(SCREEN_WIDTH / -2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / -2, 150, 1000);

    activeCamera = cameraPerspective;

    // counteract different front orientation of cameras vs rig

    cameraOrtho.rotation.y = Math.PI;
    cameraPerspective.rotation.y = Math.PI;

    cameraRig = new THREE.Group();

    cameraRig.add(cameraPerspective);
    cameraRig.add(cameraOrtho);

    scene.add(cameraRig);

    //

    mesh = new THREE.Mesh(
        new THREE.SphereBufferGeometry(100, 16, 8),
        new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
    );
    scene.add(mesh);

    const mesh2 = new THREE.Mesh(
        new THREE.SphereBufferGeometry(50, 16, 8),
        new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true})
    );
    mesh2.position.y = 150;
    mesh.add(mesh2);

    const mesh3 = new THREE.Mesh(
        new THREE.SphereBufferGeometry(5, 16, 8),
        new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true})
    );
    mesh3.position.z = 150;
    cameraRig.add(mesh3);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container.appendChild(renderer.domElement);

    renderer.autoClear = false;

    //

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    document.addEventListener('keydown', onKeyDown, false);

}

//

function onKeyDown(event) {

    switch (event.keyCode) {

        case 79: /*O*/

            activeCamera = cameraOrtho;
            activeHelper = cameraOrthoHelper;

            break;

        case 80: /*P*/

            activeCamera = cameraPerspective;
            activeHelper = cameraPerspectiveHelper;

            break;

    }

}

function animate() {

    requestAnimationFrame(animate);

    render();
    stats.update();

}

function render() {

    mesh.position.x = 700
    mesh.position.y = 700
    mesh.position.z = 500

    mesh.children[0].position.x = 70
    mesh.children[0].position.z = 900

    if (activeCamera === cameraPerspective) {
        cameraPerspective.far = mesh.position.length();
        cameraPerspective.updateProjectionMatrix();
    } else {

        cameraOrtho.far = mesh.position.length();
        cameraOrtho.updateProjectionMatrix();
    }

    cameraRig.lookAt(mesh.position);

    renderer.clear();

    renderer.setViewport(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.render(scene, activeCamera);

}