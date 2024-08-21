// SpinningObject.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";

function Box() {
  const meshRef = React.useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}

const SpinningObject = () => {
  return (
    <Canvas style={{ width: "50px", height: "50px" }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box />
    </Canvas>
  );
};

export default SpinningObject;
