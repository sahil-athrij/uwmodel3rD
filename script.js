"use strict";

// simplified on three.js/examples/webgl_loader_gltf2.html

let model;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

function main() {
    // renderer
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    // camera
    camera.position.set(1, 1, 1); // settings in `sceneList` "Monster"
    camera.up.set(0, 1, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    const light = new THREE.DirectionalLight(0x3C00FA, 2)
    light.position.set(3, 5, 5)
    scene.add(light)

    // scene and lights
    scene.add(new THREE.AmbientLight(0xcccccc));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio)
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.ConeGeometry(.125, .25, 8);
    geometry.rotateX(Math.PI );
    geometry.translate(2.5,-.3,-2);

    const material = new THREE.MeshPhysicalMaterial({color: 0xffff00});
    const cone = new THREE.Mesh(geometry, material);
    scene.add(cone);

    // load gltf model and texture
    const objs = [];
    const loader = new THREE.GLTFLoader();
    loader.load(
        // resource URL
        'scene.gltf',
        // called when the resource is loaded
        function (gltf) {

            scene.add(gltf.scene);

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

        },
        // called while loading is progressing
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');

        }
    );

    // animation rendering
    const clock = new THREE.Clock();
    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    (function animate() {
        // animation with THREE.AnimationMixer.update(timedelta)
        objs.forEach(({mixer}) => {
            mixer.update(clock.getDelta());
        });
        geometry.translate(0,Math.sin(clock.getElapsedTime()*10)/100,0);
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    })();
    return objs;
}

const objs = main();
