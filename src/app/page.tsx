"use client"

import Image from "next/image"
import { Inter } from "next/font/google"
import { Canvas, useFrame } from "@react-three/fiber"
import { Box } from "@react-three/drei"
import { OrbitControls } from "@react-three/drei/core"
import { Scene } from "./components/Scene"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Canvas>
        <ambientLight />
        <OrbitControls />
        <pointLight position={[10, 10, 10]} />
        <Scene />
      </Canvas>
    </div>
  )
}
