const url = 'data.json'
let dataScence = null

async function getFile(url) {
    try {
        const rawData = await fetch(url)
        const data = await rawData.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

let workWithGeometry = (dataScence) => {
    console.log(dataScence)
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xdfe9c8, 1);
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

    const geometry = new THREE.Geometry();
    try {
        for (property in dataScence) {
            if (property === 'points') {
                for (numberArray in dataScence[property]) {
                    console.log(dataScence[property][numberArray])
                    let x = dataScence[property][numberArray][0]
                    let y = dataScence[property][numberArray][1]
                    let z = dataScence[property][numberArray][2]
                    console.log('xyz', x, y, z)
                    geometry.vertices.push(new THREE.Vector3(x, y, z))
                }
            }
        }
    } catch (e) {
        console.log('for dataScence:', e)
    }

    // geometry.vertices.push(new THREE.Vector3(10.0, 0.0, 0.0))
    // geometry.vertices.push(new THREE.Vector3(10.0, 12.0, 15.0))
    // geometry.vertices.push(new THREE.Vector3(10.0, 12.0, 0.0))
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.computeBoundingSphere();

    const matrix = new THREE.Matrix4()
    // Матрица масштабирования по оси:
    // matrix.makeScale(0, 0, 0)

    // angle
    // const theta =
    // Матрица поворота вокруг оси X:
    // matrix.makeRotationX()
    // Матрица поворота вокруг оси Y:
    // matrix.makeRotationY()
    // Матрица поворота вокруг оси Z:
    // matrix.makeRotationZ()

    // Матрица косого сдвига оси X по оси Y с коэффициентом k:

    // matrix.makeShear(0 ,0, 0)


    // Матрица ОПП с фокусным расстоянием f:
    // matrix.makeTranslation(0 ,0, 0)
    // matrix.set(
    //     1, 0, 0, 0,
    //     0, 1, 0, 0,
    //     0, 0, 1, 0,
    //     0, 0, 0, 0,
    // )

    // geometry.applyMatrix4(m)
    // console.log(geometry.applyMatrix4())

    const material = new THREE.MeshBasicMaterial({color: 0xff0000});
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    // cube.rotation.set(0.4, 0.2, 0);
}

async function main() {
    // input
    const input = document.body.children[0];

    input.oninput = function () {
        document.getElementById('result').innerHTML = input.value;
    };

    dataScence = await getFile(url)

    workWithGeometry(dataScence)
}

main()

