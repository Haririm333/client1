export interface ProcessStep {
  number: string;
  title: string;
  headline: string;
  description: string;
  inputs: string[];
  outputs: string[];
  dimensionLabel: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Requirement',
    headline: 'Share your idea, sketch or existing part and the working conditions.',
    description:
      'We start by understanding the problem, spatial limits, loads, and assembly context. Whether you bring a napkin sketch, physical sample, or preliminary CAD file, we define the technical boundaries clearly before starting design work.',
    inputs: ['Concept sketch or physical sample', 'Operating loads & speed targets', 'Mating envelope constraints'],
    outputs: ['Defined design brief', 'Functional requirement scope'],
    dimensionLabel: 'REQ ➔ CON',
  },
  {
    number: '02',
    title: 'Concept',
    headline: 'We propose design options and discuss materials and manufacturing.',
    description:
      'We explore mechanism kinematics, structural layouts, and material options (mild steel, aluminum, engineering polymers, etc.). Manufacturing processes are selected early so every geometric choice is economical to produce.',
    inputs: ['Functional requirement scope', 'Target volume & batch size'],
    outputs: ['Concept layout sketches', 'Preliminary material & process selection'],
    dimensionLabel: 'CON ➔ CAD',
  },
  {
    number: '03',
    title: 'Modelling',
    headline: 'Detailed 3D CAD, and interference checks to validate the design.',
    description:
      'Using parametric 3D CAD, we build full solid models of every part and assembly. We run digital motion studies, collision detection, and interference checks to catch geometric issues digitally before any metal is cut.',
    inputs: ['Approved concept architecture', 'Standard hardware selection'],
    outputs: ['Parametric 3D CAD assemblies', 'Digital interference verification report'],
    dimensionLabel: 'CAD ➔ DWG',
  },
  {
    number: '04',
    title: 'Drawings',
    headline: 'Complete 2D drawings and files ready for fabrication.',
    description:
      'We generate clear, standard-compliant manufacturing drawings with proper Geometric Dimensioning and Tolerancing (GD&T), fit callouts, surface finish symbols, and comprehensive Bills of Materials (BOM) ready for the shop floor.',
    inputs: ['Validated 3D master model', 'Target machining / fabrication processes'],
    outputs: ['PDF production drawing package', '1:1 DXF cut files & BOM'],
    dimensionLabel: 'DWG ➔ PRT',
  },
  {
    number: '05',
    title: 'Print & Support',
    headline: 'Revisions, 3D-printed prototypes and production support.',
    description:
      'We print functional prototypes in PLA, PETG, or ABS to validate form, fit, and ergonomic feel. We remain available for drawing revisions, shop clarifications, and technical support during welding, machining, and final assembly.',
    inputs: ['Validated drawing package', 'Prototype material specification'],
    outputs: ['Functional 3D printed prototype', 'Technical fabrication liaison & support'],
    dimensionLabel: 'RELEASE',
  },
];
