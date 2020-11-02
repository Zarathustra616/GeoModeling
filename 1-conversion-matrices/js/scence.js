const url = 'data.json'
let dataScence = null
let matrixArray = []

async function getFile(url) {
    try {
        const rawData = await fetch(url)
        const data = await rawData.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

const createTable = () => {
    const table = document.querySelector('#table')
    const fields = [11, 21, 31, 41]
    for (let field of fields) {
        table.insertAdjacentHTML(
            'beforeend',
            `<tr>
          <td><input type="text" name="n${field}" placeholder="n${field}"></td>
          <td><input type="text" name="n${field + 1}" placeholder="n${field + 1}"></td>
          <td><input type="text" name="n${field + 2}" placeholder="n${field + 2}"></td>
          <td><input type="text" name="n${field + 3}" placeholder="n${field + 3}"></td>
        </tr>`
        )
    }
}

const getMultiplicationMatrix = (e) => {
    // Это Хардкод осторожно !
    try {
        matrixArray = [
            document.table.n11.value,
            document.table.n12.value,
            document.table.n13.value,
            document.table.n14.value,
            document.table.n21.value,
            document.table.n22.value,
            document.table.n23.value,
            document.table.n24.value,
            document.table.n31.value,
            document.table.n32.value,
            document.table.n33.value,
            document.table.n34.value,
            document.table.n41.value,
            document.table.n42.value,
            document.table.n43.value,
            document.table.n44.value,
        ]
        // console.log(matrix)
    } catch (e) {
        console.log('getMultiplicationMatrix: ', e)
    }
}

let workWithGeometry = (dataScence) => {

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
                    let x = dataScence[property][numberArray][0]
                    let y = dataScence[property][numberArray][1]
                    let z = dataScence[property][numberArray][2]
                    geometry.vertices.push(new THREE.Vector3(x, y, z))
                }
            } else if (property === 'segments') {
                let segment1 = dataScence[property][0]
                let segment2 = dataScence[property][1]
                let segment3 = dataScence[property][2]
                geometry.faces.push(new THREE.Face3(segment1, segment2, segment3));
            }
        }
    } catch (e) {
        console.log('for dataScence:', e)
    }

    geometry.computeBoundingSphere();

    const matrix = new THREE.Matrix4()
    console.log(matrixArray)
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
    createTable()

    dataScence = await getFile(url)

    workWithGeometry(dataScence)
    const sendMatrixButton = document.table.sendMatrix
    sendMatrixButton.addEventListener("click", getMultiplicationMatrix)
}

main()

