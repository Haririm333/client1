export interface PortfolioItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  caption: string;
  description: string;
  specifications: {
    label: string;
    value: string;
  }[];
  drawingType: 'spur-gear' | 'stepped-shaft' | 'flange-coupling' | 'bearing-assembly' | 'l-bracket-gusset' | 'gear-plate';
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'DWG-01',
    slug: 'spur-gear',
    name: 'Spur Gear',
    category: 'Power Transmission',
    caption: 'Representative illustration. Custom designs are made to your specifications.',
    description:
      'Module-based involute gear design with bore, keyway, and tooth-strength verification. Optimised for smooth power transmission and precise backlash control in industrial machinery drives.',
    specifications: [
      { label: 'Profile', value: 'Involute 20° Pressure Angle' },
      { label: 'Feature', value: 'Parallel Keyway & Set Screw' },
      { label: 'Tooth Sizing', value: 'Lewis Bending & Contact Check' },
      { label: 'Manufacturing', value: 'Hobbing / Wire EDM' },
    ],
    drawingType: 'spur-gear',
  },
  {
    id: 'DWG-02',
    slug: 'stepped-shaft',
    name: 'Stepped Shaft',
    category: 'Rotating Parts',
    caption: 'Representative illustration. Custom designs are made to your specifications.',
    description:
      'Precision transmission shaft featuring transition shoulders, bearing seat lands, and parallel keyways. Sized for torsional and bending fatigue loads with generous fillet radii to minimise stress concentration.',
    specifications: [
      { label: 'Geometry', value: 'Multi-diameter Stepped Shaft' },
      { label: 'Bearing Seats', value: 'ISO js6 / k5 Precision Lands' },
      { label: 'Reliefs', value: 'Ground Fillet Radii & Undercuts' },
      { label: 'Manufacturing', value: 'CNC Turning & Cylindrical Grinding' },
    ],
    drawingType: 'stepped-shaft',
  },
  {
    id: 'DWG-03',
    slug: 'flange-coupling',
    name: 'Flange Coupling',
    category: 'Connections',
    caption: 'Representative illustration. Custom designs are made to your specifications.',
    description:
      'Rigid bolted flange coupling with Pitch Circle Diameter (PCD), precision reamed bolt patterns, and interlocking spigot alignment. Detailed for balanced high-torque transmission between driving and driven shafts.',
    specifications: [
      { label: 'Coupling Type', value: 'Rigid Spigot-Aligned Flange' },
      { label: 'Fasteners', value: 'High-Tensile Fitted Reamed Bolts' },
      { label: 'Alignment', value: 'Male/Female Recessed Spigot Register' },
      { label: 'Manufacturing', value: 'Lathe Turning & CNC PCD Milling' },
    ],
    drawingType: 'flange-coupling',
  },
  {
    id: 'DWG-04',
    slug: 'bearing-assembly',
    name: 'Bearing Assembly',
    category: 'Supports',
    caption: 'Representative illustration. Custom designs are made to your specifications.',
    description:
      'Machined bearing housing assembly featuring precision bearing bore fits, internal retention circlips, and labyrinth dust seal journals. Designed for long service life under radial and axial loads.',
    specifications: [
      { label: 'Housing Fit', value: 'ISO H7 Bore Tolerance' },
      { label: 'Retention', value: 'Internal Snap Ring & Shoulder' },
      { label: 'Sealing', value: 'Non-contact Labyrinth / Lip Seal' },
      { label: 'Manufacturing', value: 'Boring & CNC Facing' },
    ],
    drawingType: 'bearing-assembly',
  },
  {
    id: 'DWG-05',
    slug: 'l-bracket-gusset',
    name: 'L-Bracket / Gusset',
    category: 'Structures',
    caption: 'Representative illustration. Custom designs are made to your specifications.',
    description:
      'Formed structural bracket with integrated triangulated gusset reinforcement. Engineered to maximise stiffness-to-weight ratio while preventing corner tear-out during press brake forming.',
    specifications: [
      { label: 'Fabrication', value: 'CNC Press Brake Formed Sheet' },
      { label: 'Stiffening', value: 'Formed Triangular Gusset' },
      { label: 'Relief', value: 'Corner Tear-Out Notch Reliefs' },
      { label: 'Mounting', value: 'Slotted Holes for Positional Alignment' },
    ],
    drawingType: 'l-bracket-gusset',
  },
  {
    id: 'DWG-06',
    slug: 'gear-plate',
    name: 'Gear Plate',
    category: 'Weight Reduction',
    caption: 'Representative illustration. Custom designs are made to your specifications.',
    description:
      'Lightened gear mounting plate and mounting chassis featuring CNC spoke cutouts and weight-reduction pockets. Maintains structural rigidity and mounting face flatness while reducing inertial mass.',
    specifications: [
      { label: 'Design', value: 'Spoke-style Cutout Webbing' },
      { label: 'Weight Reduction', value: 'Engineered Pocket Ribs' },
      { label: 'Flatness', value: 'Symmetric Stress Relief Profile' },
      { label: 'Manufacturing', value: 'Laser Cut & CNC Face Milling' },
    ],
    drawingType: 'gear-plate',
  },
];
