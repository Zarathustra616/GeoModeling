const url = 'data.json'
let data = null

async function getFile(url) {
    try {
        const rawData = await fetch(url)
        const data = await rawData.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

async function main() {
    data = await getFile(url)
    console.log(data)

    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xDDDDDD, 1);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
    camera.position.z = 50;
    scene.add(camera);

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    render();

    const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
    const basicMaterial = new THREE.MeshBasicMaterial({color: 0x0095DD});
    const cube = new THREE.Mesh(boxGeometry, basicMaterial);

    scene.add(cube);

    cube.rotation.set(0.4, 0.2, 0);
}

main()

