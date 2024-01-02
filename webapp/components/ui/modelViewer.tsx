'use client';
import React, { FC, useState, useEffect } from "react";
import { PLYLoader } from "three-stdlib";
import { Canvas } from "@react-three/fiber";
import * as THREE from 'three'
import { Box, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { XRButton, XR, Controllers, Hands } from '@react-three/xr'

interface ModelViewerProps {
    modelUrl :  string;
}

const ModelViewer: FC<ModelViewerProps> = ({modelUrl}) => {
    const [plyObject, setPlyObject] = useState<THREE.Mesh | null>(null);

    useEffect(() => {
        const loader = new PLYLoader();
        loader.load(
            modelUrl,
            function (geometry) {
                console.log(modelUrl)
                geometry.computeVertexNormals();
                const material = new THREE.PointsMaterial({ size: 0.01,  vertexColors: true });
                const mesh = new THREE.Mesh(geometry, material)
                mesh.rotateX(-Math.PI / 2);
                setPlyObject(mesh);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    return (
        <div className="w-full h-full">
            {/*<XRButton mode="AR" />*/}
            <Canvas className="border border-slate-300 rounded-lg">
            <XR>
                <ambientLight />
                <OrbitControls></OrbitControls>
                <pointLight position={[10, 10, 10]} />
                {plyObject && <primitive object={plyObject} position={[0, 0, 0]} />}
            </XR>
            </Canvas>
        </div>
    );
};

export default ModelViewer;
