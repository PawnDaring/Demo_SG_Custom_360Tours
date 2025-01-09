import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Scene } from '../types/Scene';

interface ThreeSceneProps {
  currentScene: Scene;
}

export default function ThreeScene({ currentScene }: ThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 0.1;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Create skybox
    const materials = [
      new THREE.MeshBasicMaterial({ 
        map: new THREE.TextureLoader().load(currentScene.images.right),
        side: THREE.BackSide 
      }),
      new THREE.MeshBasicMaterial({ 
        map: new THREE.TextureLoader().load(currentScene.images.left),
        side: THREE.BackSide 
      }),
      new THREE.MeshBasicMaterial({ 
        map: new THREE.TextureLoader().load(currentScene.images.top),
        side: THREE.BackSide 
      }),
      new THREE.MeshBasicMaterial({ 
        map: new THREE.TextureLoader().load(currentScene.images.bottom),
        side: THREE.BackSide 
      }),
      new THREE.MeshBasicMaterial({ 
        map: new THREE.TextureLoader().load(currentScene.images.front),
        side: THREE.BackSide 
      }),
      new THREE.MeshBasicMaterial({ 
        map: new THREE.TextureLoader().load(currentScene.images.back),
        side: THREE.BackSide 
      }),
    ];

    const skyboxGeo = new THREE.BoxGeometry(100, 100, 100);
    const skybox = new THREE.Mesh(skyboxGeo, materials);
    scene.add(skybox);

    // Animation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const sensitivity = 0.005;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      camera.rotation.y += deltaMove.x * sensitivity;
      camera.rotation.x += deltaMove.y * sensitivity;
      camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [currentScene]);

  return <div ref={containerRef} className="w-full h-full" />;
}