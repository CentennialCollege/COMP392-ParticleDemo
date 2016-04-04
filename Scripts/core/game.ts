/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;
import Clock = THREE.Clock;
import FirstPersonControls = THREE.FirstPersonControls;
import Points = THREE.Points;
import PointsMaterial = THREE.PointsMaterial;

//Custom Game Objects
import gameObject = objects.gameObject;

// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

    var scene: Scene = new Scene();
    var renderer: Renderer;
    var camera: PerspectiveCamera;
    var axes: AxisHelper;
    var plane: Mesh;
    var sphere: Mesh;
    var sphereGeometry: SphereGeometry;
    var sphereMaterial: LambertMaterial;
    var ambientLight: AmbientLight;
    var spotLight: SpotLight;
    var pointLight: PointLight;
    var control: Control;
    var gui: GUI;
    var stats: Stats;
    var step: number = 0;
    var clock: Clock;
    var tower: Mesh;
    var towerGeometry: CubeGeometry;
    var towerMaterial: LambertMaterial;
    var ground: Mesh;
    var groundGeometry: PlaneGeometry;
    var groundMaterial: LambertMaterial;
    var particles: Geometry;
    var particleCount: number;
    var particleMaterial: PointsMaterial;
    var particleSystem: Points;
    var deltaTime:number;

    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();

        // setup a THREE.JS Clock object
        clock = new Clock();

        setupRenderer(); // setup the default renderer

        setupCamera(); // setup the camera

        /* ENTER CODE HERE */

        // Point Light
        pointLight = new PointLight(0xffffff);
        pointLight.position.set(-4, 6, -4);
        scene.add(pointLight);
        console.log("Added pointLight to scene");

        // Tower Object
        towerGeometry = new CubeGeometry(2, 10, 2);
        towerMaterial = new LambertMaterial({ color: 0xc9c9c9 });
        tower = new Mesh(towerGeometry, towerMaterial);
        tower.position.setY(5);
        scene.add(tower);
        console.log("Added Tower Object to scene");

        // Burnt Ground
        groundGeometry = new PlaneGeometry(16, 16);
        groundMaterial = new LambertMaterial({ color: 0xe75d14 });
        ground = new Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -0.5 * Math.PI;
        scene.add(ground);
        console.log("Added Burnt Ground to scene");

        // Particle System
        particleCount = 20000;
        particles = new Geometry();
        for (var count: number = 0; count < particleCount; count++) {
            var x = Math.random() * 400 - 200;
            var y = Math.random() * 400 - 200;
            var z = Math.random() * 400 - 200;

            // Create the vertex
            var particle = new THREE.Vector3(x, y, z);

            // Add the vertex to the geometry
            particles.vertices.push(particle);
        }
        particleMaterial = new PointsMaterial({
            color: 0xffffff,
            size: 2,
            map: new THREE.TextureLoader().load("../../Assets/images/snowflake.png"),
            blending: THREE.AdditiveBlending,
            transparent: true
        });
        particleSystem = new Points(particles, particleMaterial);
        scene.add(particleSystem);

        // Add Helper Axis
        axes = new AxisHelper(30);
        ground.add(axes);
        console.log("Added Axis Helper Object to the ground");

        // add controls
        gui = new GUI();
        control = new Control(0.05, false);
        addControl(control);

        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");

        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
    }

    function addControl(controlObject: Control): void {
        gui.add(controlObject, 'rotationSpeed', -0.5, 0.5);
        gui.add(controlObject, "toggle");
    }

    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }

    function animateParticles() {
            var verts = particleSystem.geometry.vertices;
            for (var i = 0; i < verts.length; i++) {
                var vert = verts[i];
                if (vert.y < -200) {
                    vert.y = Math.random() * 400 - 200;
                }
                vert.y = vert.y - (10 * deltaTime);
            }
            particleSystem.geometry.verticesNeedUpdate = true;

        }

    // Setup main game loop
    function gameLoop(): void {
        stats.update();
        
        deltaTime = clock.getDelta();
        
        tower.rotation.y += control.rotationSpeed;
        
        if (control.goDown) {
            tower.position.y -= 0.1;
        }

        // move particles around
        animateParticles();

        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);

        // render the scene
        renderer.render(scene, camera);
    }

    // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        camera.position.x = 15.3;
        camera.position.y = 18.5;
        camera.position.z = -28.7;
        camera.rotation.set(-1.10305, 0.49742, -0.1396);
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }

    window.onload = init;

    return {
        scene: scene
    }

})();

