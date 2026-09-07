import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export const DashboardSmartBook = ({ className }) => {
  const mountRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 320;
    const height = currentMount.clientHeight || 260;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 3.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // 2. Lighting System (LearnIQ Signature Palette)
    const ambientLight = new THREE.AmbientLight(0xFFF5DC, 1.35);
    scene.add(ambientLight);

    // Key Light: Warm Golden Orange
    const keyLight = new THREE.DirectionalLight(0xFF7A00, 2.6);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Rim Light: Hot Pink / Magenta
    const rimLight = new THREE.DirectionalLight(0xFF1681, 3.2);
    rimLight.position.set(-3, 3, -2.5);
    scene.add(rimLight);

    // Top Soft Sunburst Glow Fill
    const fillLight = new THREE.PointLight(0xFFD84D, 2.0, 8);
    fillLight.position.set(0, 2.2, 2.5);
    scene.add(fillLight);

    // Center Page Under-Glow Light
    const pageGlow = new THREE.PointLight(0xFF7A00, 1.8, 4);
    pageGlow.position.set(0, 0.6, 0.2);
    scene.add(pageGlow);

    // 3. Main Book Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const bookGroup = new THREE.Group();
    rootGroup.add(bookGroup);

    // --- Helper function: Generate high-res Canvas textures for Left and Right Pages ---
    const createPageTexture = (side) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 680;
      const ctx = canvas.getContext('2d');

      // Cream smooth background
      const bgGrad = ctx.createLinearGradient(0, 0, 512, 680);
      bgGrad.addColorStop(0, '#FFFFFF');
      bgGrad.addColorStop(1, '#FFF7E6');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 512, 680);

      // Delicate page margin frame
      ctx.strokeStyle = side === 'left' ? 'rgba(255, 122, 0, 0.25)' : 'rgba(255, 22, 129, 0.25)';
      ctx.lineWidth = 4;
      ctx.strokeRect(24, 24, 464, 632);

      // Inner subtle border
      ctx.strokeStyle = 'rgba(36, 21, 47, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(32, 32, 448, 616);

      if (side === 'left') {
        // === LEFT PAGE: DSA, Arrays & 85% Mastery ===
        // Top Pill Badge
        ctx.fillStyle = 'rgba(255, 122, 0, 0.15)';
        ctx.beginPath();
        ctx.roundRect(48, 48, 140, 36, 18);
        ctx.fill();
        ctx.fillStyle = '#FF7A00';
        ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('⚡ DSA Core', 64, 72);

        // Subject Title
        ctx.fillStyle = '#24152F';
        ctx.font = '900 38px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('DSA', 48, 130);

        // Subtitle
        ctx.fillStyle = '#6B6170';
        ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Arrays & Logic', 48, 164);

        // Visual Data Array Blocks UI
        ctx.fillStyle = '#FFF5DC';
        ctx.strokeStyle = '#FF7A00';
        ctx.lineWidth = 2.5;
        const blockVals = ['12', '45', '78', '99'];
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.roundRect(48 + i * 98, 195, 86, 68, 12);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#24152F';
          ctx.font = 'bold 24px "JetBrains Mono", monospace';
          ctx.fillText(blockVals[i], 74 + i * 98, 238);
          ctx.fillStyle = '#FF7A00';
          ctx.font = '13px "JetBrains Mono", monospace';
          ctx.fillText(`idx:${i}`, 72 + i * 98, 256);
          ctx.fillStyle = '#FFF5DC';
        }

        // Mastery Bar Card
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = 'rgba(255, 122, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(48, 290, 416, 110, 16);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#24152F';
        ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Learning Mastery', 68, 326);

        ctx.fillStyle = '#FF7A00';
        ctx.font = '900 24px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('85%', 396, 326);

        // Progress Fill
        ctx.fillStyle = '#FFF0D4';
        ctx.beginPath();
        ctx.roundRect(68, 345, 376, 20, 10);
        ctx.fill();

        const barGrad = ctx.createLinearGradient(68, 0, 380, 0);
        barGrad.addColorStop(0, '#FF1681');
        barGrad.addColorStop(1, '#FF7A00');
        ctx.fillStyle = barGrad;
        ctx.beginPath();
        ctx.roundRect(68, 345, 376 * 0.85, 20, 10);
        ctx.fill();

        // Conceptual Lines
        ctx.fillStyle = 'rgba(107, 97, 112, 0.35)';
        for (let j = 0; j < 4; j++) {
          ctx.beginPath();
          ctx.roundRect(48, 435 + j * 32, 416 - (j % 2 === 0 ? 40 : 90), 8, 4);
          ctx.fill();
        }

        // Bottom Brand Micro Tag
        ctx.fillStyle = '#FF7A00';
        ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('LearnIQ • Smart Education', 48, 620);

      } else {
        // === RIGHT PAGE: Java, OOP, AI ✦ 82% ===
        // Top Pill Badge
        ctx.fillStyle = 'rgba(255, 22, 129, 0.15)';
        ctx.beginPath();
        ctx.roundRect(48, 48, 145, 36, 18);
        ctx.fill();
        ctx.fillStyle = '#FF1681';
        ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('✦ AI Analysis', 64, 72);

        // Subject Title
        ctx.fillStyle = '#24152F';
        ctx.font = '900 38px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Java', 48, 130);

        // Subtitle
        ctx.fillStyle = '#6B6170';
        ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('OOP & Classes', 48, 164);

        // Code Syntax Preview Box
        ctx.fillStyle = '#1D1226';
        ctx.beginPath();
        ctx.roundRect(48, 195, 416, 92, 14);
        ctx.fill();

        ctx.fillStyle = '#FFD84D';
        ctx.font = 'bold 17px "JetBrains Mono", monospace';
        ctx.fillText('class Student extends Learner {', 64, 230);
        ctx.fillStyle = '#20B86B';
        ctx.font = '16px "JetBrains Mono", monospace';
        ctx.fillText('  void retainKnowledge() { 82% }', 64, 258);
        ctx.fillStyle = '#FF1681';
        ctx.fillText('}', 64, 276);

        // AI Retention Badge Card
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = 'rgba(255, 22, 129, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(48, 305, 416, 95, 16);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#24152F';
        ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Retention Index', 68, 342);

        ctx.fillStyle = '#20B86B';
        ctx.font = '900 22px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('82% High 🔥', 310, 342);

        ctx.fillStyle = '#6B6170';
        ctx.font = '14px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Daily spaced repetition active', 68, 375);

        // Abstract Micro Lines
        ctx.fillStyle = 'rgba(107, 97, 112, 0.35)';
        for (let k = 0; k < 4; k++) {
          ctx.beginPath();
          ctx.roundRect(48, 435 + k * 32, 416 - (k % 2 === 1 ? 60 : 30), 8, 4);
          ctx.fill();
        }

        // Bottom Indicator
        ctx.fillStyle = '#FF1681';
        ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Next-Gen AI Companion • 2026', 48, 620);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 4;
      return texture;
    };

    const leftTexture = createPageTexture('left');
    const rightTexture = createPageTexture('right');

    // 4. Geometry & Materials Construction
    // Materials
    const coverMaterial = new THREE.MeshStandardMaterial({
      color: 0x24152F, // Deep Navy/Dark Purple
      roughness: 0.35,
      metalness: 0.25,
    });

    const coverGoldRim = new THREE.MeshStandardMaterial({
      color: 0xFF7A00,
      metalness: 0.8,
      roughness: 0.2,
    });

    const pageBlockMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFF9EE,
      roughness: 0.85,
    });

    const leftPageMat = new THREE.MeshStandardMaterial({
      map: leftTexture,
      roughness: 0.4,
    });

    const rightPageMat = new THREE.MeshStandardMaterial({
      map: rightTexture,
      roughness: 0.4,
    });

    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF1681,
      roughness: 0.3,
      metalness: 0.1,
    });

    // --- Hard Cover Base (Left & Right Wing) ---
    const coverWidth = 1.35;
    const coverHeight = 1.85;
    const coverThickness = 0.05;
    const openAngle = 0.14; // ~8 degrees slope

    // Left Cover Slab
    const leftCover = new THREE.Mesh(
      new THREE.BoxGeometry(coverWidth, coverThickness, coverHeight),
      coverMaterial
    );
    leftCover.position.set(-coverWidth / 2 - 0.04, 0, 0);
    leftCover.rotation.z = -openAngle;
    bookGroup.add(leftCover);

    // Right Cover Slab
    const rightCover = new THREE.Mesh(
      new THREE.BoxGeometry(coverWidth, coverThickness, coverHeight),
      coverMaterial
    );
    rightCover.position.set(coverWidth / 2 + 0.04, 0, 0);
    rightCover.rotation.z = openAngle;
    bookGroup.add(rightCover);

    // Spine Hinge
    const spineHinge = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, coverHeight, 16),
      coverMaterial
    );
    spineHinge.rotation.x = Math.PI / 2;
    spineHinge.position.set(0, -0.04, 0);
    bookGroup.add(spineHinge);

    // Golden Accent Trim on Spine
    const spineTrim = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, coverHeight + 0.04, 16),
      coverGoldRim
    );
    spineTrim.rotation.x = Math.PI / 2;
    spineTrim.position.set(0, 0.04, 0);
    bookGroup.add(spineTrim);

    // --- Pages Stack Blocks ---
    const pageWidth = 1.25;
    const pageHeight = 1.74;
    const pageStackThickness = 0.14;

    // Left Page Stack
    const leftStack = new THREE.Mesh(
      new THREE.BoxGeometry(pageWidth, pageStackThickness, pageHeight),
      pageBlockMaterial
    );
    leftStack.position.set(-pageWidth / 2 - 0.05, 0.09, 0);
    leftStack.rotation.z = -openAngle;
    bookGroup.add(leftStack);

    // Right Page Stack
    const rightStack = new THREE.Mesh(
      new THREE.BoxGeometry(pageWidth, pageStackThickness, pageHeight),
      pageBlockMaterial
    );
    rightStack.position.set(pageWidth / 2 + 0.05, 0.09, 0);
    rightStack.rotation.z = openAngle;
    bookGroup.add(rightStack);

    // --- Top Open Interactive Display Pages (Rendered with Smart UI Textures) ---
    const leftTopPage = new THREE.Mesh(
      new THREE.PlaneGeometry(pageWidth - 0.04, pageHeight - 0.04),
      leftPageMat
    );
    leftTopPage.rotation.x = -Math.PI / 2;
    leftTopPage.rotation.y = -openAngle;
    leftTopPage.position.set(-pageWidth / 2 - 0.05, 0.17, 0);
    bookGroup.add(leftTopPage);

    const rightTopPage = new THREE.Mesh(
      new THREE.PlaneGeometry(pageWidth - 0.04, pageHeight - 0.04),
      rightPageMat
    );
    rightTopPage.rotation.x = -Math.PI / 2;
    rightTopPage.rotation.y = openAngle;
    rightTopPage.position.set(pageWidth / 2 + 0.05, 0.17, 0);
    bookGroup.add(rightTopPage);

    // --- Center Glowing Ribbon / Bookmark ---
    const ribbonCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.22, -pageHeight / 2 - 0.1),
      new THREE.Vector3(0, 0.18, 0),
      new THREE.Vector3(0.08, 0.14, pageHeight / 2 + 0.1),
      new THREE.Vector3(0.12, 0.04, pageHeight / 2 + 0.35)
    ]);
    const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 24, 0.025, 8, false);
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMaterial);
    bookGroup.add(ribbon);

    // Golden Ribbon Tip
    const ribbonTip = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.02, 0.09),
      coverGoldRim
    );
    ribbonTip.position.set(0.12, 0.03, pageHeight / 2 + 0.36);
    bookGroup.add(ribbonTip);

    // --- Floating 3D Holographic AI Orbs & Sparks around Book ---
    const orbGroup = new THREE.Group();
    bookGroup.add(orbGroup);

    // 1. Center Glowing Orb
    const centerOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 20, 20),
      new THREE.MeshStandardMaterial({
        color: 0xFF7A00,
        emissive: 0xFF1681,
        emissiveIntensity: 0.9,
        roughness: 0.1,
        metalness: 0.9
      })
    );
    centerOrb.position.set(0, 0.55, -0.1);
    orbGroup.add(centerOrb);

    const orbGlowRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.2, 0.015, 12, 32),
      new THREE.MeshBasicMaterial({ color: 0xFFD84D })
    );
    orbGlowRing.position.copy(centerOrb.position);
    orbGroup.add(orbGlowRing);

    // 2. Tiny Floating Sparkles & Micro Orbs
    const spark1 = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.07),
      new THREE.MeshStandardMaterial({ color: 0xFFD84D, emissive: 0xFF7A00, emissiveIntensity: 0.8 })
    );
    spark1.position.set(-1.1, 0.7, 0.4);
    orbGroup.add(spark1);

    const spark2 = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.06),
      new THREE.MeshStandardMaterial({ color: 0xFF1681, emissive: 0xFF1681, emissiveIntensity: 0.8 })
    );
    spark2.position.set(1.15, 0.6, -0.3);
    orbGroup.add(spark2);

    // Floating Swirling Dust Particle Field
    const particleCount = 30;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 3.2;
      particlePositions[p + 1] = Math.random() * 1.8 + 0.1;
      particlePositions[p + 2] = (Math.random() - 0.5) * 2.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xFFD84D,
      transparent: true,
      opacity: 0.75,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    bookGroup.add(particleField);

    // --- Soft Floating Shadow Beneath Book ---
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    const shadowGrad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 64);
    shadowGrad.addColorStop(0, 'rgba(36, 21, 47, 0.35)');
    shadowGrad.addColorStop(0.5, 'rgba(255, 122, 0, 0.15)');
    shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = shadowGrad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 2.2),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false
      })
    );
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -0.65, 0);
    rootGroup.add(shadowMesh);

    // Initial Pitch & Placement
    bookGroup.rotation.x = 0.55; // Gently tilted toward viewer
    bookGroup.position.set(0, -0.15, 0);

    // 5. Mouse Interaction & Animation Physics
    let targetRotY = 0;
    let targetRotX = 0.55;
    let clock = new THREE.Clock();
    let animId;

    const handleMouseMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.22;
      targetRotX = 0.55 - y * 0.14;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse parallax interpolation
      bookGroup.rotation.y += (targetRotY - bookGroup.rotation.y) * 0.05;
      bookGroup.rotation.x += (targetRotX - bookGroup.rotation.x) * 0.05;

      // Gentle floating up and down
      const floatOffset = Math.sin(t * 1.8) * 0.08;
      bookGroup.position.y = -0.15 + floatOffset;

      // Slow subtle sway rotation
      rootGroup.rotation.y = Math.sin(t * 0.9) * 0.06;

      // Shadow dynamic scaling with float height
      shadowMesh.scale.set(
        1 - floatOffset * 0.6,
        1 - floatOffset * 0.6,
        1
      );

      // Center orb & ring orbital motion
      centerOrb.position.y = 0.55 + Math.sin(t * 2.4) * 0.06;
      orbGlowRing.position.copy(centerOrb.position);
      orbGlowRing.rotation.x = t * 1.2;
      orbGlowRing.rotation.y = t * 0.9;

      // Sparkles floating rotation
      spark1.position.y = 0.7 + Math.sin(t * 2.0 + 1) * 0.07;
      spark1.rotation.y = t * 1.5;
      spark2.position.y = 0.6 + Math.sin(t * 2.2 + 2) * 0.06;
      spark2.rotation.x = t * 1.2;

      // Particles slow swirl
      particleField.rotation.y = t * 0.06;

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
      cancelAnimationFrame(animId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-[280px] sm:w-[320px] lg:w-[340px] h-[230px] sm:h-[250px] lg:h-[270px] flex items-center justify-center select-none ${className || ''}`}>
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Learning Badges around 3D Book */}
      {/* 1. Top Right: DSA • Arrays */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-1 right-2 px-2.5 py-1 rounded-full bg-white/95 shadow-glow-orange border border-[#FF7A00]/40 text-[10px] font-bold text-[#24152F] z-10 pointer-events-none backdrop-blur-sm"
      >
        DSA • Arrays ⚡
      </motion.div>

      {/* 2. Top Left: Java • OOP */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute top-10 -left-2 px-2.5 py-1 rounded-full bg-white/95 shadow-glow-pink border border-[#FF1681]/40 text-[10px] font-bold text-[#FF1681] z-10 pointer-events-none backdrop-blur-sm"
      >
        Java • OOP ☕
      </motion.div>

      {/* 3. Bottom Right: AI: Good */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute bottom-8 -right-1 px-2.5 py-1 rounded-full bg-white/95 shadow-glow-yellow border border-[#FFD84D] text-[10px] font-bold text-[#24152F] flex items-center gap-1 z-10 pointer-events-none backdrop-blur-sm"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#20B86B]" />
        AI: Good
      </motion.div>

      {/* 4. Bottom Left: 5 Day Streak */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute bottom-4 left-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFD84D] text-white shadow-md text-[10px] font-bold z-10 pointer-events-none"
      >
        5 Day Streak 🔥
      </motion.div>
    </div>
  );
};

// Backwards compatibility alias
export const DashboardMiniStudent = DashboardSmartBook;

