import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const BOTTLE_COLOR = 0x6e62e8;
const CHART_COLOR = 0xc9a962;

export function useBottleChartScene(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [hovered, setHovered] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
    camera.position.set(0, 0, 6);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const bottleGeo = new THREE.CylinderGeometry(0.2, 0.18, 0.7, 12);
    const bottleMat = new THREE.MeshPhongMaterial({
      color: BOTTLE_COLOR,
      emissive: 0x3333aa,
      shininess: 60,
    });
    const bottle = new THREE.Mesh(bottleGeo, bottleMat);
    scene.add(bottle);

    const barGeos: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const g = new THREE.BoxGeometry(0.15, 0.1 + Math.random() * 0.4, 0.08);
      const bar = new THREE.Mesh(g, new THREE.MeshPhongMaterial({ color: CHART_COLOR }));
      bar.position.set(-0.4 + i * 0.2, -0.2, 0.5);
      bar.scale.y = 0;
      scene.add(bar);
      barGeos.push(bar);
    }

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(3, 3, 5);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0x4466ff, 0.2));

    let frame: number;
    let t = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.02;
      bottle.rotation.y += 0.006;
      if (hovered) {
        bottle.scale.set(0.3, 0.3, 0.3);
        bottle.position.y = -0.4;
        barGeos.forEach((bar, i) => {
          const target = 0.1 + Math.sin(t + i) * 0.2 + 0.2;
          bar.scale.y += (target - bar.scale.y) * 0.05;
          const h = (bar.geometry as THREE.BoxGeometry).parameters.height;
          bar.position.y = -0.2 + (h * bar.scale.y) / 2;
        });
      } else {
        bottle.scale.set(1, 1, 1);
        bottle.position.y = 0;
        barGeos.forEach((b) => (b.scale.y *= 0.95));
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!containerRef.current) return;
      const nw = containerRef.current.clientWidth;
      const nh = containerRef.current.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);
    const div = containerRef.current;
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    div.addEventListener("mouseenter", onEnter);
    div.addEventListener("mouseleave", onLeave);

    cleanupRef.current = () => {
      window.removeEventListener("resize", onResize);
      div.removeEventListener("mouseenter", onEnter);
      div.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
    return cleanupRef.current;
  }, [hovered]);

  return { hovered, setHovered };
}
