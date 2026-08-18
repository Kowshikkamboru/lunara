# LUNARA

LUNARA is a premium, interactive web application exploring Biological Signal Integrity & Visual-Neural Science. Built for high-end medical/biotech presentations, it features a fully interactive 3D anatomical model of the eye-to-brain neural pathway and a sleek, modern, glassmorphic UI.

## Setup Instructions

This project is built using React, Vite, Tailwind CSS, and Three.js (React Three Fiber). 

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Running Locally

1. **Install Dependencies**
   Navigate to the project root directory and run:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   
3. **View the Application**
   Open your browser and navigate to the local server URL provided in the terminal (typically `http://localhost:3000` or `http://localhost:5173`).

4. **Build for Production** (Optional)
   ```bash
   npm run build
   ```
   The optimized production build will be output to the `dist` folder.

---

## 🎨 Design Approach

The design goal for LUNARA was to create a highly premium, "wow-factor" experience suitable for top-tier biotechnology or medical research presentations.

### UI & Aesthetics
* **Glassmorphism & Lighting**: To give it a sleek, futuristic feel, the UI relies heavily on a deep dark-mode background (`#050a11`) layered with translucent, blurred glassmorphic cards (`backdrop-filter: blur`). This allows the bright, glowing 3D elements to pop off the screen without the interface feeling heavy.
* **Bento Grid Layout**: The features and capabilities sections utilize a modern, asymmetric "Bento Grid" layout to organize complex neuro-scientific information smoothly and make it visually engaging.
* **Color Palette**: We used deep space blacks, cyan/electric blue for tech/signal representation, and soft purple/green accents to establish a strong visual hierarchy for biological tissues.
* **Typography & Micro-animations**: Driven by modern sans-serif fonts (Inter), combined with subtle CSS transitions, hover effects, and glowing borders that respond to user interaction, making the interface feel alive and tactile.

## 🎬 Animation & 3D Approach

The centerpiece of LUNARA is the interactive 3D scene depicting the visual pathway from the eye to the visual cortex. Rather than importing massive `.gltf` files which can hurt performance, the entire scene is built **procedurally**.

### Technology Stack
* **Three.js & React Three Fiber (R3F)**: Used to declaratively render the 3D scene within the React DOM.
* **React Three Drei**: Used for camera controls (`OrbitControls`), HTML overlays (`Html`), and post-processing effects.

### 3D Modeling & Animation Strategy
1. **Procedural Anatomy**: The Eye and Brain are constructed using native Three.js geometries (`sphereGeometry`, `extrudeGeometry`). By mathematically clipping the spheres (e.g., controlling `phiLength`), we created perfect, hollow sagittal cross-sections.
2. **Clean Cross-Sections**: To avoid messy internal geometry blocking the view, structures like the Iris and Ciliary body were modeled as thin, precisely placed boxes right on the cut-plane, mimicking professional medical textbook diagrams.
3. **Dynamic Signals**: The neural signals traveling down the optic nerve use a `CatmullRomCurve3` path. A `useFrame` loop dynamically calculates their positions based on the elapsed clock time, creating that continuous, flowing pulse from the ocular receptor to the visual cortex.
4. **Professional Annotations**: The anatomical labels use precise "dog-leg" lines (horizontal segments that angle down to the target) anchored in 3D space, ensuring they always point accurately while maintaining a clinical, structured grid look.
5. **Post-Processing & Performance**: 
   * A subtle `Bloom` effect is applied to make the neural signals and ambient light rays glow dynamically.
   * To prevent thermal throttling and ensure buttery-smooth 60fps performance across devices, the WebGL Canvas `dpr` (Device Pixel Ratio) is explicitly managed, and heavy DOM elements are lazy-loaded outside the 3D render loop.
