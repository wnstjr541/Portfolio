import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import cssImg from "../../assets/img/css.png";
import jsImg from "../../assets/img/js.png";
import htmlImg from "../../assets/img/html.png";
import jqueryImg from "../../assets/img/jquery.png";
import scssImg from "../../assets/img/scss.png";
import reactImg from "../../assets/img/reactImg.png";

const CreateScene = () => {
  const [textures, setTextures] = useState([]);

  const mesh1 = useRef();
  const mesh2 = useRef();
  const mesh3 = useRef();
  const mesh4 = useRef();
  const mesh5 = useRef();
  const mesh6 = useRef();

  useFrame(() => {
    if (mesh1?.current && mesh2?.current) {
      mesh1.current.rotation.x += 0.005;
      mesh1.current.rotation.y += 0.005;
      mesh2.current.rotation.x += 0.005;
      mesh2.current.rotation.y += 0.005;
      mesh3.current.rotation.x += 0.005;
      mesh3.current.rotation.y += 0.005;
      mesh4.current.rotation.x += 0.005;
      mesh4.current.rotation.y += 0.005;
      mesh5.current.rotation.x += 0.005;
      mesh5.current.rotation.y += 0.005;
      mesh6.current.rotation.x += 0.005;
      mesh6.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    // 텍스처 로딩
    const textureLoader = new THREE.TextureLoader();
    const loadTextures = async () => {
      const cssTexture = await new Promise((resolve) =>
        textureLoader.load(cssImg, resolve)
      );
      const jsTexture = await new Promise((resolve) =>
        textureLoader.load(jsImg, resolve)
      );
      const htmlTexture = await new Promise((resolve) =>
        textureLoader.load(htmlImg, resolve)
      );
      const jqueryTexture = await new Promise((resolve) =>
        textureLoader.load(jqueryImg, resolve)
      );
      const scssTexture = await new Promise((resolve) =>
        textureLoader.load(scssImg, resolve)
      );
      const reactTexture = await new Promise((resolve) =>
        textureLoader.load(reactImg, resolve)
      );
      setTextures([
        cssTexture,
        jsTexture,
        htmlTexture,
        jqueryTexture,
        scssTexture,
        reactTexture,
      ]);
    };

    loadTextures();
  }, []);

  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls />
      {textures.length > 0 && (
        <mesh ref={mesh1} position={[-3, -1, 0]}>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
          <meshStandardMaterial map={textures[0]} />
        </mesh>
      )}
      {textures.length > 1 && (
        <mesh ref={mesh2} position={[2, -1, 0]}>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
          <meshStandardMaterial map={textures[1]} />
        </mesh>
      )}
      {textures.length > 2 && (
        <mesh ref={mesh3} position={[-0.5, 0.5, 1]}>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
          <meshStandardMaterial map={textures[2]} />
        </mesh>
      )}
      {textures.length > 3 && (
        <mesh ref={mesh4} position={[3, 1, 0]}>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
          <meshStandardMaterial map={textures[3]} />
        </mesh>
      )}
      {textures.length > 4 && (
        <mesh ref={mesh5} position={[-3, 2, 0]}>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
          <meshStandardMaterial
            map={textures[4]}
            color={"#ffffff"}
            toneMapped={false}
          />
        </mesh>
      )}
      {textures.length > 5 && (
        <mesh ref={mesh6} position={[1.5, 2, 0]}>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
          <meshStandardMaterial map={textures[5]} />
        </mesh>
      )}
    </>
  );
};

export default CreateScene;
