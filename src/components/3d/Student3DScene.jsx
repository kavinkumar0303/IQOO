import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { BookOpen, Code, Database, Brain, Sparkles, GraduationCap, BarChart3, Binary } from 'lucide-react';

export const Student3DScene = ({ className }) => {
  const mountRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 480;
    const height = currentMount.clientHeight || 400;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.15, 5.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0xFFF5DC, 1.25);
    scene.add(ambientLight);

    // Key Light: Warm Golden Orange
    const keyLight = new THREE.DirectionalLight(0xFF7A00, 2.5);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Rim Light: Hot Pink / Magenta
    const rimLight = new THREE.DirectionalLight(0xFF1681, 3.2);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // Fill Light: Soft Yellow/Cyan
    const fillLight = new THREE.PointLight(0xFFD84D, 1.8, 10);
    fillLight.position.set(0, 2, 3);
    scene.add(fillLight);

    // 3. Student Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- Student Model Geometry (Modern Stylized 3D Character) ---
    const studentGroup = new THREE.Group();

    // Material definitions
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xE8A87C,
      roughness: 0.4,
      metalness: 0.1
    });

    const hoodieMat = new THREE.MeshStandardMaterial({
      color: 0x54145F, // Deep stylish purple hoodie
      roughness: 0.6,
      metalness: 0.2
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x24152F, // Dark neat hair
      roughness: 0.3,
    });

    const deskMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      roughness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.85,
      reflectivity: 0.8
    });

    const laptopMat = new THREE.MeshStandardMaterial({
      color: 0x2E1E38,
      metalness: 0.8,
      roughness: 0.2
    });

    const screenMat = new THREE.MeshBasicMaterial({
      color: 0xFF7A00,
    });

    // Body / Torso
    const torsoGeo = new THREE.CylinderGeometry(0.38, 0.45, 0.9, 16);
    const torso = new THREE.Mesh(torsoGeo, hoodieMat);
    torso.position.set(0, 0.45, 0);
    studentGroup.add(torso);

    // Hoodie Collar
    const collarGeo = new THREE.TorusGeometry(0.22, 0.08, 12, 24);
    collarGeo.rotateX(Math.PI / 2);
    const collar = new THREE.Mesh(collarGeo, new THREE.MeshStandardMaterial({ color: 0xFF1681 }));
    collar.position.set(0, 0.9, 0);
    studentGroup.add(collar);

    // Head
    const headGeo = new THREE.SphereGeometry(0.32, 24, 24);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.set(0, 1.25, 0.05);
    studentGroup.add(head);

    // Modern College Hair
    const hairGeo = new THREE.SphereGeometry(0.34, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 1.3, 0.05);
    studentGroup.add(hair);

    // Smart Glasses
    const glassFrameMat = new THREE.MeshStandardMaterial({ color: 0xFFD84D, metalness: 0.9, roughness: 0.1 });
    const leftFrame = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 8, 16), glassFrameMat);
    leftFrame.position.set(-0.11, 1.26, 0.35);
    studentGroup.add(leftFrame);

    const rightFrame = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 8, 16), glassFrameMat);
    rightFrame.position.set(0.11, 1.26, 0.35);
    studentGroup.add(rightFrame);

    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.08), glassFrameMat);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 1.26, 0.36);
    studentGroup.add(bridge);

    // Left & Right Arms reaching toward laptop
    const armGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.65, 12);
    const leftArm = new THREE.Mesh(armGeo, hoodieMat);
    leftArm.position.set(-0.45, 0.45, 0.25);
    leftArm.rotation.set(0.6, 0, -0.35);
    studentGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, hoodieMat);
    rightArm.position.set(0.45, 0.45, 0.25);
    rightArm.rotation.set(0.6, 0, 0.35);
    studentGroup.add(rightArm);

    // Hands
    const handGeo = new THREE.SphereGeometry(0.07, 12, 12);
    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.set(-0.25, 0.2, 0.55);
    studentGroup.add(leftHand);

    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.set(0.25, 0.2, 0.55);
    studentGroup.add(rightHand);

    // Desk
    const deskGeo = new THREE.BoxGeometry(2.2, 0.08, 1.2);
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(0, 0.05, 0.6);
    studentGroup.add(desk);

    // Laptop Base & Screen
    const lapBaseGeo = new THREE.BoxGeometry(0.7, 0.02, 0.45);
    const lapBase = new THREE.Mesh(lapBaseGeo, laptopMat);
    lapBase.position.set(0, 0.11, 0.6);
    studentGroup.add(lapBase);

    const lapScreenGeo = new THREE.BoxGeometry(0.7, 0.45, 0.02);
    const lapScreen = new THREE.Mesh(lapScreenGeo, laptopMat);
    lapScreen.position.set(0, 0.32, 0.4);
    lapScreen.rotation.x = -0.22;
    studentGroup.add(lapScreen);

    // Glowing Laptop Screen Display
    const screenDisplay = new THREE.Mesh(new THREE.PlaneGeometry(0.64, 0.39), screenMat);
    screenDisplay.position.set(0, 0.32, 0.412);
    screenDisplay.rotation.x = -0.22;
    studentGroup.add(screenDisplay);

    // Screen Glow Light (illuminating the student's face)
    const screenLight = new THREE.PointLight(0xFF8A00, 2.8, 2.5);
    screenLight.position.set(0, 0.5, 0.55);
    studentGroup.add(screenLight);

    studentGroup.position.set(0, -0.42, 0);
    mainGroup.add(studentGroup);

    // --- Floating 3D Surrounding Orbit Elements ---

    // 1. 3D Floating Book
    const bookGroup = new THREE.Group();
    const coverMat = new THREE.MeshStandardMaterial({ color: 0xFF1681, roughness: 0.3 });
    const pagesMat = new THREE.MeshStandardMaterial({ color: 0xFFFDF8, roughness: 0.8 });
    const bookCover = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.08, 0.55), coverMat);
    const bookPages = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.06, 0.52), pagesMat);
    bookPages.position.x = 0.02;
    bookGroup.add(bookCover, bookPages);
    bookGroup.position.set(-1.6, 0.9, 0.5);
    bookGroup.rotation.set(0.3, 0.5, -0.2);
    mainGroup.add(bookGroup);

    // 2. Floating 3D Graduation Cap
    const capGroup = new THREE.Group();
    const capMat = new THREE.MeshStandardMaterial({ color: 0x24152F, roughness: 0.4 });
    const tasselMat = new THREE.MeshStandardMaterial({ color: 0xFFD84D, metalness: 0.8 });
    const capTop = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.5), capMat);
    capTop.rotation.y = Math.PI / 4;
    const capBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.15, 16), capMat);
    capBase.position.y = -0.08;
    const tassel = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), tasselMat);
    tassel.position.set(0.2, -0.05, 0.2);
    capGroup.add(capTop, capBase, tassel);
    capGroup.position.set(1.5, 1.3, 0.2);
    capGroup.rotation.set(-0.2, -0.4, 0.15);
    mainGroup.add(capGroup);

    // 3. Floating 3D Holographic AI Orb
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0xFF7A00,
      emissive: 0xFF1681,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
    });
    const floatingOrb = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 24), orbMat);
    floatingOrb.position.set(1.4, -0.2, 0.8);
    mainGroup.add(floatingOrb);

    const orbRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.32, 0.02, 12, 32),
      new THREE.MeshBasicMaterial({ color: 0xFFD84D })
    );
    orbRing.position.copy(floatingOrb.position);
    mainGroup.add(orbRing);

    // 4. Floating 3D Data Cylinder (DBMS)
    const dbGroup = new THREE.Group();
    const dbMat = new THREE.MeshStandardMaterial({ color: 0x20B86B, roughness: 0.2, metalness: 0.5 });
    for (let i = 0; i < 3; i++) {
      const disk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.08, 16), dbMat);
      disk.position.y = i * 0.12;
      dbGroup.add(disk);
    }
    dbGroup.position.set(-1.5, -0.3, 0.7);
    dbGroup.rotation.set(0.2, 0.4, 0.1);
    mainGroup.add(dbGroup);

    // 5. Floating Particles Field
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 45;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 6;
      posArray[i + 1] = (Math.random() - 0.5) * 5 + 0.5;
      posArray[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xFFD84D,
      transparent: true,
      opacity: 0.8,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // Mouse Parallax & Animation Loop
    let targetRotX = 0;
    let targetRotY = 0;
    let clock = new THREE.Clock();

    const handleMouseMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.35;
      targetRotX = -y * 0.2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth parallax interpolation
      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.06;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.06;

      // Student subtle breathing/typing movement
      studentGroup.position.y = -0.42 + Math.sin(elapsedTime * 2) * 0.025;
      head.rotation.y = Math.sin(elapsedTime * 1.5) * 0.08;

      // Floating items orbital animations
      bookGroup.position.y = 0.9 + Math.sin(elapsedTime * 1.8) * 0.08;
      bookGroup.rotation.y = elapsedTime * 0.4;

      capGroup.position.y = 1.3 + Math.sin(elapsedTime * 1.5 + 1) * 0.09;
      capGroup.rotation.y = -elapsedTime * 0.3;

      floatingOrb.position.y = -0.2 + Math.sin(elapsedTime * 2.2 + 2) * 0.07;
      orbRing.position.copy(floatingOrb.position);
      orbRing.rotation.x = elapsedTime * 1.2;
      orbRing.rotation.y = elapsedTime * 0.8;

      dbGroup.position.y = -0.3 + Math.sin(elapsedTime * 1.6 + 3) * 0.06;
      dbGroup.rotation.y = elapsedTime * 0.5;

      // Particle subtle swirl
      particleField.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(currentMount);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className={`relative w-full h-[320px] sm:h-[360px] lg:h-[380px] xl:h-[420px] max-h-[440px] flex items-center justify-center interactive-3d select-none overflow-visible ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Holographic Subject Cards in 2.5D Space */}
      {/* 1. DSA Card (Top Left) */}
      <motion.div
        animate={{
          y: [0, -7, 0],
          x: mousePos.x * -14,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-2 left-1 sm:top-4 sm:left-3 glass-card-warm p-2 sm:p-2.5 rounded-2xl shadow-glow-orange flex items-center gap-2 border border-[#FF7A00]/40 backdrop-blur-md z-10 pointer-events-none"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#FFD84D] flex items-center justify-center text-white shadow-sm shrink-0">
          <Code className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="text-[11px] sm:text-xs font-bold text-[#24152F]">DSA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#20B86B] animate-pulse" />
          </div>
          <p className="text-[10px] sm:text-[11px] font-medium text-[#6B6170] whitespace-nowrap">Arrays & Logic • 85%</p>
        </div>
      </motion.div>

      {/* 2. Java Card (Top Right) */}
      <motion.div
        animate={{
          y: [0, 8, 0],
          x: mousePos.x * 14,
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-4 right-1 sm:top-6 sm:right-3 glass-card-pink p-2 sm:p-2.5 rounded-2xl shadow-glow-pink flex items-center gap-2 border border-[#FF1681]/40 backdrop-blur-md z-10 pointer-events-none"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-[#FF1681] to-[#FF7A00] flex items-center justify-center text-white shadow-sm shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="text-[11px] sm:text-xs font-bold text-[#24152F]">Java OOP</span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-[#FF1681]">Live</span>
          </div>
          <p className="text-[10px] sm:text-[11px] font-medium text-[#6B6170] whitespace-nowrap">Inheritance & Super</p>
        </div>
      </motion.div>

      {/* 3. Mathematics Card (Bottom Left) */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          x: mousePos.x * -10,
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-8 left-1 sm:bottom-10 sm:left-3 glass-card p-2 sm:p-2.5 rounded-2xl shadow-glow-magenta flex items-center gap-2 border border-[#E9008C]/30 backdrop-blur-md z-10 pointer-events-none"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-[#E9008C] to-[#8E168F] flex items-center justify-center text-white shadow-sm shrink-0">
          <Binary className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] sm:text-xs font-bold text-[#24152F]">Mathematics</span>
          <p className="text-[10px] sm:text-[11px] font-medium text-[#6B6170] whitespace-nowrap">∫ x² dx Integration</p>
        </div>
      </motion.div>

      {/* 4. AI Understanding & DBMS Card (Bottom Right) */}
      <motion.div
        animate={{
          y: [0, 7, 0],
          x: mousePos.x * 16,
        }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute bottom-6 right-1 sm:bottom-8 sm:right-3 glass-card-warm p-2 sm:p-2.5 rounded-2xl shadow-glow-yellow flex items-center gap-2 border border-[#FFD84D]/60 backdrop-blur-md z-10 pointer-events-none"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-[#FFC928] to-[#FF7A00] flex items-center justify-center text-[#24152F] shadow-sm font-bold text-xs shrink-0">
          82%
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Brain className="w-3.5 h-3.5 text-[#FF7A00] shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold text-[#24152F]">AI Understanding</span>
          </div>
          <p className="text-[10px] sm:text-[11px] font-medium text-[#20B86B] font-semibold whitespace-nowrap">High Retention 🔥</p>
        </div>
      </motion.div>

      {/* Mouse Interaction Hint Pill */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full glass-pill text-[10px] sm:text-[11px] font-medium text-[#6B6170] flex items-center gap-1.5 border border-white/80 shadow-sm whitespace-nowrap z-10 pointer-events-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-ping" />
        Move mouse to interact in 3D
      </motion.div>
    </div>
  );
};
