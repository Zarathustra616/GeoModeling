const url = 'data.json'
let dataScence = null

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const renderer = new THREE.WebGLRenderer({antialias: true})

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT)

const geometry = new THREE.Geometry()
const matrix = new THREE.Matrix4()

const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(geometry, material);


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
        console.log(document.table.n11.value,
            typeof document.table.n12.value,
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
            document.table.n44.value)
        matrix.set(
            parseFloat(document.table.n11.value),
            parseFloat(document.table.n12.value),
            parseFloat(document.table.n13.value),
            parseFloat(document.table.n14.value),
            parseFloat(document.table.n21.value),
            parseFloat(document.table.n22.value),
            parseFloat(document.table.n23.value),
            parseFloat(document.table.n24.value),
            parseFloat(document.table.n31.value),
            parseFloat(document.table.n32.value),
            parseFloat(document.table.n33.value),
            parseFloat(document.table.n34.value),
            parseFloat(document.table.n41.value),
            parseFloat(document.table.n42.value),
            parseFloat(document.table.n43.value),
            parseFloat(document.table.n44.value)
        )
        // console.log(matrix)
        geometry.applyMatrix4(matrix)

    } catch (e) {
        console.log('getMultiplicationMatrix: ', e)
    }
}

const addedVectors = (dataScence) => {
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
                geometry.faces.push(new THREE.Face3(segment1, segment2, segment3))
                geometry.computeBoundingSphere()
            }
        }
    } catch (e) {
        console.log('for dataScence:', e)
    }
}


const workWithGeometry = () => {
    renderer.setSize(WIDTH, HEIGHT)
    renderer.setClearColor(0xdfe9c8, 1)
    document.body.appendChild(renderer.domElement)

    camera.position.z = 50;
    scene.add(camera)

    function render() {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
    }

    render()
}

async function main() {
    createTable()

    dataScence = await getFile(url)

    workWithGeometry()
    addedVectors(dataScence)

    scene.add(mesh);

    const sendMatrixButton = document.table.sendMatrix
    sendMatrixButton.addEventListener("click", getMultiplicationMatrix)
}

main()

