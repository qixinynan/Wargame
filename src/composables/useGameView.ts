import { ref, onMounted } from 'vue';
import * as BABYLON from 'babylonjs';

export default function useGameView(canvasRef) {

  onMounted(() => {
    if (!canvasRef) {
      console.error("无法找到Canvas");
    }
    console.log(typeof (canvasRef.value), canvasRef.value);
    Init(canvasRef.value);
  })

  function Init(canvas: HTMLCanvasElement) {
    var engine: BABYLON.Engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    var scene: BABYLON.Scene = createScene(engine, canvas);

    engine.runRenderLoop(function () {
      scene.render();
    });

    window.addEventListener('resize', function () {
      engine.resize();
    });
  }

  function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    var scene: BABYLON.Scene = new BABYLON.Scene(engine);
    var camera: BABYLON.FreeCamera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);

    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    var sphere = BABYLON.MeshBuilder.CreateSphere('sphere1', { segments: 16, diameter: 2, sideOrientation: BABYLON.Mesh.FRONTSIDE }, scene);
    sphere.position.y = 1;
    var ground = BABYLON.MeshBuilder.CreateGround("ground1", { width: 6, height: 6, subdivisions: 2, updatable: false }, scene);
    return scene;
  }
}

