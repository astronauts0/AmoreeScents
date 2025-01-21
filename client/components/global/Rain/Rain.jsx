"use client";
import React, { useEffect, useRef, useState } from "react";
import Matter, {
    Engine,
    Render,
    Runner,
    Composite,
    Composites,
    Bodies,
    Body,
    Events,
    Mouse,
} from "matter-js";
import MatterWrap from "matter-wrap";
import MatterAttractors from "matter-attractors";
import Image from "next/image";
import { useWindowSize } from "react-use";

Matter.use(MatterWrap);
Matter.use(MatterAttractors);

function Rain() {
    const scene = useRef();
    const engine = useRef(Engine.create());
    const runner = useRef(Runner.create());
    const { width: cw, height: ch } = useWindowSize();

    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages([
            "./images/svgs/blackWheelIcon.svg",
            "./images/svgs/blackPriceIcon.svg",
            "./images/svgs/blackStarIcon.svg",
            "./images/svgs/blackFlowerIcon.svg",
            "./images/svgs/blackWheelStrokeIcon.svg",
        ]);
    }, []);

    useEffect(() => {
        const render = Render.create({
            element: scene.current,
            engine: engine.current,
            options: {
                width: cw,
                height: ch,
                wireframes: false,
                showAngleIndicator: false,
                hasBounds: true,
            },
        });

        Render.run(render);
        Runner.run(runner.current, engine.current);

        const wallThickness = 5;
        const walls = [
            Bodies.rectangle(cw / 2, ch - 10, cw, wallThickness, {
                isStatic: true,
                render: { visible: false },
            }),
        ];
        Composite.add(engine.current.world, walls);

        const stack = Composites.stack(0, 0, 100, 5, 0, 0, (x, y, column, row) => {
            const imageIndex = (row + column) % images.length;
            const texture = images[imageIndex];

            const body = Bodies.rectangle(x, y, 25, 25, {
            //   render: {
            //     sprite: {
            //       texture: texture,
            //       xScale: 0.22,
            //       yScale: 0.22,
            //     },
            //   },
              restitution: 1,
              plugin: {
                wrap: {
                  min: { x: 0, y: 0 },
                  max: { x: cw, y: ch },
                },
              },
            });

            const gravityForce = {
                x: (cw / 2 - x) * 0.001,
                y: (ch / 2 - y) * 0.001,
            };
            Body.applyForce(body, body.position, gravityForce);

            return body;
        });

        Composite.add(engine.current.world, stack);

        const attractiveBody = Bodies.circle(cw / 2, ch / 4, 90, {
            render: { visible: false },
            isStatic: true,
            plugin: {
                attractors: [
                    (bodyA, bodyB) => {
                        const force = {
                            x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                            y: (bodyA.position.y - bodyB.position.y) * 1e-6,
                        };
                        Body.applyForce(bodyA, bodyA.position, Matter.Vector.neg(force));
                    },
                ],
            },
        });

        Composite.add(engine.current.world, attractiveBody);

        const mouse = Mouse.create(render.canvas);
        Events.on(engine.current, "afterUpdate", () => {
            if (!mouse.position.x) return;
            Body.translate(attractiveBody, {
                x: (mouse.position.x - attractiveBody.position.x) * 0.5,
                y: (mouse.position.y - attractiveBody.position.y) * 0.5,
            });
        });

        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: cw, y: ch },
        });

        return () => {
            Render.stop(render);
            Runner.stop(runner.current);
            Composite.clear(engine.current.world);
            Engine.clear(engine.current);
            render.canvas.remove();
            render.canvas = null;
            render.context = null;
            render.textures = {};
        };
    }, [ cw, ch]); // Dependencies updated to react to window size

    return (
        <>
            <div className="rain_poster absolute z-20 transform rotate-90 -left-5 top-1/4 md:top-1/3">
                <Image
                    width={120}
                    height={120}
                    src="/images/icons/poster.png"
                    alt="poster"
                />
                <p className="text-[10px] text-center w-full font-bold absolute top-[10%] left-1/2 transform -translate-x-1/2 capitalize text_success md:text-xs">
                    <span className="hidden md:block">mouse move</span>
                    <span className="md:hidden block">Grab to finger or check on pc</span>
                </p>
            </div>
            <div className="h-full absolute w-full">
                <div ref={scene} className="rain_canvas_wrapper" />
            </div>
        </>
    );
}

export default Rain;
