//ignore typescript check for this file
// @ts-nocheck

import { Box, Grid, Trail } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import React, { useRef, useState } from "react"

export const Scene = () => {
  const boxRef1 = useRef()
  const boxRef2 = useRef()
  const boxRef3 = useRef()
  const boxRef4 = useRef()
  const boxRef5 = useRef()
  const boxRef6 = useRef()
  const boxRef7 = useRef()
  const boxRef8 = useRef()
  const boxRef9 = useRef()
  const boxRef10 = useRef()

  const timeRef1 = useRef(0)
  const timeRef2 = useRef(0)
  const timeRef3 = useRef(0)
  const timeRef4 = useRef(0)
  const timeRef5 = useRef(0)
  const timeRef6 = useRef(0)
  const timeRef7 = useRef(0)
  const timeRef8 = useRef(0)
  const timeRef9 = useRef(0)
  const timeRef10 = useRef(0)

  const circles = [
    { refName: boxRef1, refTime: timeRef1, audioSource: "GrandPiano.wav" },
    { refName: boxRef2, refTime: timeRef2 },
    { refName: boxRef3, refTime: timeRef3 },
    { refName: boxRef4, refTime: timeRef4 },
    { refName: boxRef5, refTime: timeRef5 },
    { refName: boxRef6, refTime: timeRef6 },
    { refName: boxRef7, refTime: timeRef7 },
    { refName: boxRef8, refTime: timeRef8 },
    { refName: boxRef9, refTime: timeRef9 },
    { refName: boxRef10, refTime: timeRef10 },
  ]

  const center = { x: 0, y: 0 } // Center of the semi-circle
  // Radius of the semi-circle

  const maxAngle = Math.PI * 2 // Maximum angle

  useFrame((state, delta) => {
    circles.forEach((item, index) => {
      const radius = 5 + index * 4
      const oneFullLoop = Math.PI * 2
      const numberOfLoops = 50 - index
      const velocity = (oneFullLoop * numberOfLoops) / 900

      //  const velocity = 1 - (index * 0.003)
      const elapsedTime = state.clock.elapsedTime

      const distance = Math.PI + elapsedTime * velocity
      const modeDistance = distance % maxAngle
      const adjustedDistance =
        modeDistance >= Math.PI ? modeDistance : maxAngle - modeDistance
      const x = center.y + radius * Math.cos(adjustedDistance)
      const y = center.x + radius * Math.sin(adjustedDistance) * -1

      const soundInterval = Math.PI / velocity
      circles[index].refTime.current += delta

      if (circles[index].refTime.current >= soundInterval) {
        // Call your function and reset the timer
        circles[index].refTime.current = 0
        console.log("collision", index)

        const audio = new Audio("Grand Piano (2).wav")
        audio.play()
      }

      circles[index].refName.current.position.set(x, y, index * 5)
    })
  })

  return (
    <>
      {circles.map((item, index) => {
        return (
          <Trail
            key={index}
            width={20} // Width of the line
            color={"hotpink"} // Color of the line
            length={25} // Length of the line
            decay={0.1} // How fast the line fades away
            local={false} // Wether to use the target's world or local positions
            stride={0} // Min distance between previous and current point
            interval={1} // Number of frames to wait before next calculation
            target={undefined} // Optional target. This object will produce the trail.
            attenuation={(width) => width} // A function to define the width in each point along it.
          >
            {/* If `target` is not defined, Trail will use the first `Object3D` child as the target. */}
            <mesh ref={item.refName}>
              <sphereGeometry />
              <meshBasicMaterial />
            </mesh>

            {/* You can optionally define a custom meshLineMaterial to use. */}
            {/* <meshLineMaterial color={"red"} /> */}
          </Trail>
        )
      })}

      <Grid />
    </>
  )
}
