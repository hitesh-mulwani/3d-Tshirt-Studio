import { color } from "framer-motion";
import { proxy } from "valtio";
const state= proxy({
    intro: true,
    color: '#4A4A4A',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './gradient.png',
});
export default state;