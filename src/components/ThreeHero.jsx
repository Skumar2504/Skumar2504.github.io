import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Lightweight Three.js hero scene (vanilla Three to avoid dependency conflicts)
// - Golden torus-knot with soft lighting
// - Subtle camera parallax from mouse
// - Respects prefers-reduced-motion
export default function ThreeHero() {
  const mountRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    scene.background = null

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0.2, 4.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    // Materials & mesh (gold)
    const gold = new THREE.Color('#d4af37')
    const geom = new THREE.TorusKnotGeometry(1, 0.28, 220, 36)
    const mat = new THREE.MeshStandardMaterial({
      color: gold,
      roughness: 0.25,
      metalness: 0.85,
      envMapIntensity: 0.8,
    })
    const mesh = new THREE.Mesh(geom, mat)
    mesh.rotation.x = Math.PI * 0.18
    scene.add(mesh)

    // Lights
    const hemi = new THREE.HemisphereLight(0xffffff, 0x101010, 0.8)
    scene.add(hemi)
    const key = new THREE.PointLight('#f2d479', 16, 12)
    key.position.set(3, 2, 3)
    scene.add(key)
    const rim = new THREE.PointLight('#b38b00', 10, 10)
    rim.position.set(-3, -1, -2)
    scene.add(rim)

    // Motion preferences
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = media.matches
    const onMedia = () => { reduced = media.matches }
    media.addEventListener?.('change', onMedia)

    // Mouse parallax
    let mx = 0, my = 0
    const onMouse = (e) => {
      const r = mount.getBoundingClientRect()
      mx = ((e.clientX - r.left) / r.width - 0.5) * 0.4
      my = ((e.clientY - r.top) / r.height - 0.5) * -0.3
    }
    mount.addEventListener('mousemove', onMouse)

    const clock = new THREE.Clock()
    const tick = () => {
      const t = clock.getElapsedTime()
      const rot = reduced ? 0.05 : 0.18
      mesh.rotation.y = t * rot
      mesh.rotation.z = t * rot * 0.6
      camera.position.x += (mx - camera.position.x) * 0.04
      camera.position.y += (my - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = Math.max(1e-6, w / h)
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(mount)

    return () => {
      cancelAnimationFrame(rafRef.current)
      media.removeEventListener?.('change', onMedia)
      mount.removeEventListener('mousemove', onMouse)
      ro.disconnect()
      geom.dispose(); mat.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="hero-canvas" ref={mountRef} aria-hidden />
}

