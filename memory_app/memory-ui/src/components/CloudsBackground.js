import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const CloudsBackground = () => {
  const containerRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Load the cloud texture
    const textureLoader = new THREE.TextureLoader();
    const cloudTexture = textureLoader.load(
      "https://th.bing.com/th/id/R.649e0e22f84342d9c3b9aaae910b962a?rik=vYkjQqQ77iuw9Q&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fcloud-hd-png-clouds-png-hd-1024.png&ehk=eDt5r4LTzwAGNXItjYyQxgI3KO2pqmqcBvYqu3RPrfE%3d&risl=&pid=ImgRaw&r=0"
    );

    // Create and add clouds to the scene
    const cloudGeometry = new THREE.PlaneGeometry(20, 20);
    const cloudMaterial = new THREE.MeshBasicMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.5,
    });

    const clouds = new THREE.Group();
    for (let i = 0; i < 15; i++) {
      const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
      cloud.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, -10);
      clouds.add(cloud);
    }
    scene.add(clouds);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      clouds.children.forEach((cloud) => (cloud.position.x -= 0.01));
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default CloudsBackground;
