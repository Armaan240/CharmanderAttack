import * as THREE from 'three';
import { ThreeMFLoader } from 'three/addons/loaders/3MFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 100;
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


const loader = new ThreeMFLoader();
loader.load(
    'model/Charmander.3mf',function(object){ 
     object.rotation.set(-Math.PI / 2,0,0);
     scene.add(object);
    }
   
);

const fire = new THREE.TorusKnotGeometry(40,8,100,16,2,3);
const material = new THREE.PointsMaterial({color:"orange",size:0.5});
const fireMesh = new THREE.Points(fire, material);
scene.add(fireMesh);

const pos = fire.attributes.position;
const origninalPos = pos.array.slice();

const light = new THREE.DirectionalLight(0xffffff,2);
light.position.set(10,10,10);
scene.add(light);

let time = 0; 
const tab = 100 ;
const rad = 16;

function animate(){
    requestAnimationFrame(animate);
    time += 0.01;
    for(let i=0;i<pos.count;i++){
        const ix = i*3;
        const uIndex = Math.floor(i/rad);
        const vIndex = i% rad;

        const u = (uIndex / tab) * Math.PI *2 *2 +time;
        const v = (vIndex / rad) * Math.PI *2;
        const R = 40 ;
        const r =8;
        const p = 2;
        const q = 3;

        const cu = Math.cos(u);
        const su = Math.sin(u);
        const quOverP = (q /p) * u;
        const tx = (R + r* cu) * cu;
        const ty = (R + r * cu) * su;
        const tz = r * Math.sin(quOverP);
       

        const nx = -su;
        const ny = cu;
        const nz = 0;

        pos.array[ix ]= tx + r * Math.cos(v) * nx; 
        pos.array[ix + 1] = ty + r * Math.cos(v) * ny ;
        pos.array[ix + 2] = tz + r * Math.sin(v);  
    }
    pos.needsUpdate = true;
    renderer.render(scene,camera);
    fireMesh.rotation.y += 0.01;
    fireMesh.rotation.x += 0.005;
   

    
}
animate();

document.getElementById("btn").addEventListener("click",()=>{
    if (mainmodel){
        scene.remove(mainmodel);
    }
    loader.load
})