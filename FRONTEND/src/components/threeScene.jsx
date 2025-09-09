// Header.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';


const ThreeScene = () => {
  const sceneRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      
    };
  }, []);

  return (
    <header className="w-full h-screen flex items-center justify-center">
      <div className="text-center">
        <img src="logo-white.png" alt="CareVision AI" className="w-24 h-24 mb-4" />
        <h1 className="text-4xl font-bold">CareVision AI</h1>
      </div>
      <div ref={sceneRef} className="absolute top-0 left-0 right-0 bottom-0" />
    </header>
  );
};

export default ThreeScene;
