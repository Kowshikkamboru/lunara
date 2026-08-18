import * as THREE from 'three';
import fs from 'fs';
import { GLTFLoader } from 'three-stdlib';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Fix for Node.js lacking WebGL/Canvas APIs needed by GLTFLoader in some edge cases
// Actually, GLTFLoader can run in Node with a bit of mocking if we just want to read the structure.
// But it's easier to just dump the GLB JSON chunk!

const glbPath = './public/models/brain.glb';
const buffer = fs.readFileSync(glbPath);

const magic = buffer.toString('utf8', 0, 4);
if (magic !== 'glTF') {
  console.log('Not a valid GLB');
  process.exit(1);
}

const jsonChunkLength = buffer.readUInt32LE(12);
const jsonChunkType = buffer.toString('utf8', 16, 20);

if (jsonChunkType !== 'JSON') {
  console.log('First chunk is not JSON');
  process.exit(1);
}

const jsonBuffer = buffer.slice(20, 20 + jsonChunkLength);
const json = JSON.parse(jsonBuffer.toString('utf8'));

console.log('Nodes (names):');
json.nodes.forEach((n, i) => console.log(`[${i}] ${n.name || 'unnamed'}`));
console.log('\nMeshes (names):');
json.meshes.forEach((m, i) => console.log(`[${i}] ${m.name || 'unnamed'}`));
