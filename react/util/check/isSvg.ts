import { SVGType } from './types';

const SVG = /^(http?s).+\.svg$/;
const isSVG: SVGType = pattern => !!SVG.test(pattern);

export default isSVG;
