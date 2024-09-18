import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {Sky} from 'three/addons/objects/Sky.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// add floor

const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/coast_sand_rock/coast_sand_rocks_02_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/coast_sand_rock/coast_sand_rocks_02_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rock/coast_sand_rocks_02_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rock/coast_sand_rocks_02_disp_1k.jpg')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8,8)
floorARMTexture.repeat.set(8,8)
floorNormalTexture.repeat.set(8,8)
floorDisplacementTexture.repeat.set(8,8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping


// wall
const wallColorTexture = textureLoader.load('./wall/medieval_red_brick/medieval_red_brick_diff_1k.jpg')
const wallARMTexture = textureLoader.load('./wall/medieval_red_brick/medieval_red_brick_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./wall/medieval_red_brick/medieval_red_brick_nor_gl_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace



//roof
const roofColorTexture = textureLoader.load('./roof/clay_roof_tiles_1k/clay_roof_tiles_diff_1k.jpg')
const roofARMTexture = textureLoader.load('./roof/clay_roof_tiles_1k/clay_roof_tiles_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('./roof/clay_roof_tiles_1k/clay_roof_tiles_nor_gl_1k.jpg')

roofColorTexture.colorSpace = THREE.SRGBColorSpace


roofColorTexture.repeat.set(3,1)
roofARMTexture.repeat.set(3,1)
roofNormalTexture.repeat.set(3,1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping

//bush
const bushColorTexture = textureLoader.load('./bush/forest_leaves/forest_leaves_02_diffuse_1k.webp')
const bushARMTexture = textureLoader.load('./bush/forest_leaves/forest_leaves_02_arm_1k.webp')
const bushNormalTexture = textureLoader.load('./bush/forest_leaves/forest_leaves_02_nor_gl_1k.webp')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(3,1)
bushARMTexture.repeat.set(3,1)
bushNormalTexture.repeat.set(3,1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping


//grave
const graveColorTexture = textureLoader.load('./grave/concrete_wall_007_1k/concrete_wall_007_diff_1k.jpg')
const graveARMTexture = textureLoader.load('./grave/concrete_wall_007_1k/concrete_wall_007_arm_1k.jpg')
const graveNormalTexture = textureLoader.load('./grave/concrete_wall_007_1k/concrete_wall_007_nor_gl_1k.jpg')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.4,0.2)
graveARMTexture.repeat.set(0.4,0.2)
graveNormalTexture.repeat.set(0.4,0.2)


//door

const doorColorTexture = textureLoader.load('./door/color.jpg')
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./door/height.jpg')
const doorNormal = textureLoader.load('./door/normal.jpg')
const doorMetalTexture = textureLoader.load('./door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace


/**
 * House
 */

// house container

const house = new THREE.Group()
scene.add(house)



// floor

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20,100,100),
    new THREE.MeshStandardMaterial({
        alphaMap : floorAlphaTexture,
        transparent : true,
        map : floorColorTexture,
        aoMap : floorARMTexture,
        roughnessMap : floorARMTexture,
        metalnessMap : floorARMTexture,
        normalMap : floorNormalTexture,
        displacementMap : floorDisplacementTexture,
        displacementScale:0.3,
        displacementBias: -0.2
    })
)

gui.add(floor.material, "displacementScale").min(0).max(1).step(0.001).name("floordisplacementscale")
gui.add(floor.material, "displacementBias").min(-1).max(1).step(0.001).name("floordisplacementbias")
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)

// walls

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map : wallColorTexture,
        aoMap : wallARMTexture,
        roughnessMap : wallARMTexture, 
        metalnessMap : wallARMTexture,
        normalMap : wallNormalTexture,
    })
)
walls.position.y = 1.25
house.add(walls)


///////////////************************* 

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1.5,4,1.5,false,0,6.283185307179586),
    new THREE.MeshStandardMaterial({
        map : roofColorTexture,
        aoMap : roofARMTexture,
        roughnessMap : roofARMTexture, 
        metalnessMap : roofARMTexture,
        normalMap : roofNormalTexture,
    })
)
roof.position.y = 2.5 + 0.75
roof.rotation.y = Math.PI / 4
house.add(roof)



////////////////////////////////////////

//door

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2,2.2,100,100),
    new THREE.MeshStandardMaterial({
        map : doorColorTexture,
        transparent : true,
        alphaMap : doorAlphaTexture,
        aoMap : doorAmbientOcclusionTexture,
        displacementMap : doorHeightTexture,
        displacementScale : 0.15,
        displacementBias : - 0.04,
        normalMap : doorNormal,
        metalnessMap : doorMetalTexture,
        roughness : doorRoughnessTexture
    })
)
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

//bushes

const bushGeometry = new THREE.SphereGeometry(1,16,16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color : '#ccffcc',
    map : bushColorTexture,
    aoMap : bushARMTexture,
    roughnessMap : bushARMTexture, 
    metalnessMap : bushARMTexture,
    normalMap : bushNormalTexture,
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = -0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = -0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = -0.75

house.add(bush1, bush2, bush3, bush4)


// graves

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map : graveColorTexture,
    aoMap : graveARMTexture,
    roughnessMap : graveARMTexture, 
    metalnessMap : graveARMTexture,
    normalMap : graveNormalTexture,
})

const graveGroup = new THREE.Group()
scene.add(graveGroup)

for (let i = 0; i < 30; i++) {

    const angle = Math.random() * Math.PI * 2
    const radius = 4 + Math.random() * 3
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius 
    
    // graves mesh
    const graveMesh = new THREE.Mesh(graveGeometry, graveMaterial)
    graveMesh.position.x = x
    graveMesh.position.y = Math.random() * 0.4
    graveMesh.position.z = z
    graveMesh.rotation.x = ( Math.random() - 0.3 ) * 0.4
    graveMesh.rotation.y = ( Math.random() - 0.3 ) * 0.4
    graveMesh.rotation.z = ( Math.random() - 0.3 ) * 0.4
    
    // add to grave group
    graveGroup.add(graveMesh)
    
}


/**
 * ghost
 */

const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#0088ff', 6)
scene.add(ghost1, ghost2, ghost3)

/*
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

//point light for door
const doorLight = new THREE.PointLight('yellow',5)
doorLight.position.set(0,2.2,2.5)
house.add(doorLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * shadows
 */
//rederer
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

// cast and recieve
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true

roof.castShadow = true
roof.receiveShadow = true

for( const graveMesh of graveGroup.children ){ 
    graveMesh.castShadow = true
    graveMesh.receiveShadow = true
}


/**
 * sky
 */

const sky = new Sky()
scene.add(sky)
sky.scale.set(100,100,100)
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

/**
 * fog
 */
scene.fog = new THREE.FogExp2('#28343f', 0.1)



/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    //ghost
    const ghostAngle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghostAngle) * 5
    ghost1.position.z = Math.sin(ghostAngle) * 5
    ghost1.position.y = Math.sin(ghostAngle) * 4 * Math.sin(ghostAngle *0.23) * Math.cos(ghostAngle * 0.322)

    const ghost2Angle = - elapsedTime * 0.78
    ghost2.position.x = Math.cos(ghost2Angle) * 7
    ghost2.position.z = Math.sin(ghost2Angle) * 7
    ghost2.position.y = Math.sin(ghost2Angle) * 4 * Math.sin(ghost2Angle *0.3) * Math.cos(ghost2Angle * 0.5)

    const ghost3Angle = elapsedTime * 0.22
    ghost3.position.x = Math.cos(ghost3Angle) * 10
    ghost3.position.z = Math.sin(ghost3Angle) * 3.3
    ghost3.position.y = Math.sin(ghost3Angle) * 4 * Math.sin(ghost3Angle *0.3) * Math.cos(ghost3Angle * 0.5)





    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()