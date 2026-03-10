import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';

function TexturedCube() {
    const meshRef = useRef();
    
    const textures = useMemo(() => {
        const texts = Array(6).fill(['MUZAINAH FAISAL', 'B23110006129']);
        
        return texts.map((lines) => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#ff69b4');
            gradient.addColorStop(1, '#ffd700');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.2;
            ctx.beginPath();
            ctx.arc(256, 256, 200, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.arc(256, 256, 150, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.globalAlpha = 1;
            ctx.font = 'Bold 50px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = '#000000';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            
            ctx.fillText(lines[0], 256, 200);
            ctx.font = 'Bold 70px Arial';
            ctx.fillText(lines[1], 256, 350);
            
            return new THREE.CanvasTexture(canvas);
        });
    }, []);
    
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.01;
        }
    });

    const materials = textures.map(texture => 
        <meshStandardMaterial map={texture} />
    );
    
    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[3, 3, 3]} />
            {materials}
        </mesh>
    );
}

function Cube() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas camera={{ position: [5, 5, 5] }}>
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} />
                <TexturedCube />
            </Canvas>
        </div>
    );
}

export default Cube;