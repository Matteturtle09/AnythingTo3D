'use client';
import React, { FC, useState, useEffect } from "react";
import { PLYLoader } from "three-stdlib";
import { Canvas } from "@react-three/fiber";
import * as THREE from 'three'
import { OrbitControls } from "@react-three/drei";
import { XRButton, XR, Controllers, Hands } from '@react-three/xr'

interface ModelViewerProps { }

const ModelViewer: FC<ModelViewerProps> = () => {
    const [plyObject, setPlyObject] = useState<THREE.Mesh | null>(null);

    useEffect(() => {
        const loader = new PLYLoader();
        loader.load(
            'mesh_1.ply',
            function (geometry) {
                geometry.computeVertexNormals();
                const material = new THREE.PointsMaterial({ size: 0.01, vertexColors: true });
                const mesh = new THREE.Mesh(geometry, material);
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
        <div className="w-full h-screen">
            <XRButton mode="AR" />
            <Canvas>
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
