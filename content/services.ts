export interface ServiceDetail {
  slug: string;
  code: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  deliverables: string[];
  clientRequirements: string[];
  typicalFlow: {
    step: string;
    title: string;
    description: string;
  }[];
  prefilledWhatsApp: string;
  relatedServices: string[];
  relatedWorkSlug?: string;
}

export const SERVICES: ServiceDetail[] = [
  {
    slug: 'mechanical-design-cad',
    code: 'SRV-01',
    title: 'Mechanical Design & 3D CAD Modelling',
    shortTitle: 'Mechanical Design',
    tagline: 'Concept design, mechanisms, machine parts, fixtures and jigs.',
    summary:
      'We design mechanisms, machine parts, tooling, fixtures, and jigs that are practical and economical to manufacture. Using parametric 3D CAD modelling with motion and interference checks, we ensure parts fit and function correctly before fabrication.',
    deliverables: [
      'Parametric 3D CAD models (STEP, native SolidWorks-compatible formats)',
      'Assembly models with motion and interference validation',
      'Exploded assembly views and Bills of Materials (BOM)',
      'Design check reports detailing fit, clearance, and mechanism stroke',
    ],
    clientRequirements: [
      'Concept sketches, functional description, or design specifications',
      'Space envelopes, critical dimensions, and mounting constraints',
      'Operating loads, speeds, and environmental conditions',
      'Preferred materials or off-the-shelf standard hardware',
    ],
    typicalFlow: [
      { step: '01', title: 'Functional Review', description: 'Evaluate motion limits, spatial constraints, and required loads.' },
      { step: '02', title: 'Mechanism Concept', description: 'Propose kinematic configurations and select standard components.' },
      { step: '03', title: 'Parametric 3D CAD', description: 'Build fully parametric parts and verify interference-free assembly.' },
      { step: '04', title: 'Design Verification', description: 'Check clearances, ergonomics, and ease of assembly.' },
    ],
    prefilledWhatsApp: "Hi, I'd like a quote for Mechanical Design and CAD Modelling.",
    relatedServices: ['sheetmetal-design', 'drafting-gdt', '3d-printing'],
    relatedWorkSlug: 'flange-coupling',
  },
  {
    slug: 'sheetmetal-design',
    code: 'SRV-02',
    title: 'Sheetmetal Design',
    shortTitle: 'Sheetmetal Design',
    tagline: 'Enclosures, brackets and panels with bend and flat-pattern details.',
    summary:
      'We design precision sheetmetal parts, custom electronic enclosures, mounting brackets, and structural panels. Every part incorporates correct bend allowances, relief cuts, and flat patterns ready for laser cutting and CNC press brake forming.',
    deliverables: [
      '1:1 scale DXF flat patterns ready for CNC laser or plasma cutting',
      'Formed 3D CAD models with verified bend deductions and K-factors',
      'Fabrication drawings with bend angles, bend directions, and dimensions',
      'Hardware insertion callouts (PEM studs, standoffs, clinch nuts)',
    ],
    clientRequirements: [
      'Internal component dimensions or board CAD layouts (for enclosures)',
      'Target sheet material (mild steel, stainless steel, aluminum)',
      'Target gauge or sheet thickness',
      'Mounting requirements, cutouts, or ventilation needs',
    ],
    typicalFlow: [
      { step: '01', title: 'Layout & Gauge Selection', description: 'Determine internal clearance, gauge, and material temper.' },
      { step: '02', title: 'Formed Sheetmetal CAD', description: 'Model flanges, hems, ribs, and ventilation cutouts.' },
      { step: '03', title: 'Bend Relief & K-Factor', description: 'Apply manufacturing bend allowances to prevent corner tearing.' },
      { step: '04', title: 'DXF Flat Pattern Export', description: 'Generate clean 2D cut profiles and dimensioned bending prints.' },
    ],
    prefilledWhatsApp: "Hi, I'd like a quote for Sheetmetal Design.",
    relatedServices: ['fabrication-support', 'drafting-gdt', 'product-development'],
    relatedWorkSlug: 'l-bracket-gusset',
  },
  {
    slug: 'drafting-gdt',
    code: 'SRV-03',
    title: '2D Drafting & GD&T',
    shortTitle: '2D Drafting & GD&T',
    tagline: 'Production drawings with dimensions, tolerances and fits.',
    summary:
      'Clear, unambiguous manufacturing drawings prevent shop-floor ambiguity and costly rework. We produce standard-compliant 2D production drawings with comprehensive Geometric Dimensioning and Tolerancing (GD&T), fit specifications, surface finishes, and complete Bills of Materials.',
    deliverables: [
      'High-resolution PDF production drawing packages (A4 to A0 sheets)',
      'Editable 2D CAD files (DXF / DWG)',
      'Geometric Dimensioning & Tolerancing (GD&T) datums and feature control frames',
      'Fit specifications (hole/shaft fits) and surface roughness callouts',
      'Structured Bill of Materials (BOM) with material grades and hardware quantities',
    ],
    clientRequirements: [
      '3D CAD models (STEP, IGES, or native part files)',
      'Mating parts and critical assembly interfaces',
      'Target machining processes (turning, milling, grinding, EDM)',
      'Required precision levels or target tolerances',
    ],
    typicalFlow: [
      { step: '01', title: 'Datum Definition', description: 'Establish functional datum reference frames based on mating surfaces.' },
      { step: '02', title: 'Tolerance Allocation', description: 'Apply dimensional tolerances, fits, and geometric controls.' },
      { step: '03', title: 'Finishes & Notes', description: 'Specify surface texture, heat treatments, coatings, and edge breaks.' },
      { step: '04', title: 'Drawing Release', description: 'Final quality review, sheet border title-block sign-off, and export.' },
    ],
    prefilledWhatsApp: "Hi, I'd like a quote for 2D Drafting and GD&T drawings.",
    relatedServices: ['mechanical-design-cad', 'fabrication-support', 'reverse-engineering'],
    relatedWorkSlug: 'stepped-shaft',
  },
  {
    slug: 'reverse-engineering',
    code: 'SRV-04',
    title: 'Reverse Engineering',
    shortTitle: 'Reverse Engineering',
    tagline: 'Recreate models and drawings from existing physical parts.',
    summary:
      'When original drawings or CAD models are missing or obsolete, we recreate fully parametric 3D models and manufacturing-ready drawings from your physical sample parts, broken components, or worn machinery elements.',
    deliverables: [
      'Fully parametric native 3D CAD models reflecting original design intent',
      'Standard neutral exchange files (STEP, IGES)',
      'Complete 2D manufacturing drawings with measured and reconstructed dimensions',
      'Wear compensation and nominal geometry restoration report',
    ],
    clientRequirements: [
      'Physical component delivered to studio or detailed dimensional photos',
      'Known mating components or shaft/housing fit context',
      'Identification of worn or broken sections requiring design restoration',
      'Intended reproduction method (machining, casting, additive manufacturing)',
    ],
    typicalFlow: [
      { step: '01', title: 'Physical Measurement', description: 'Capture dimensions, thread pitches, tapers, and critical features.' },
      { step: '02', title: 'Design Intent Extraction', description: 'Filter out wear, deflection, or damage to determine nominal sizes.' },
      { step: '03', title: 'Parametric Reconstruction', description: 'Build structured feature trees in 3D CAD with standard tool radii.' },
      { step: '04', title: 'Drawing Generation', description: 'Produce manufacturing prints with appropriate tolerances.' },
    ],
    prefilledWhatsApp: "Hi, I'd like a quote for Reverse Engineering from physical parts.",
    relatedServices: ['drafting-gdt', 'mechanical-design-cad', '3d-printing'],
    relatedWorkSlug: 'spur-gear',
  },
  {
    slug: 'product-development',
    code: 'SRV-05',
    title: 'Product Development',
    shortTitle: 'Product Development',
    tagline: 'From concept and prototype to a production-ready design.',
    summary:
      'We guide new hardware ideas across the complete engineering lifecycle: from first sketches and concept feasibility through 3D CAD modelling, prototype verification, and final production documentation ready for manufacturing.',
    deliverables: [
      'Initial concept architecture and feasibility reviews',
      'Complete 3D master CAD assembly of the product',
      'DFM (Design for Manufacture) and DFA (Design for Assembly) evaluation',
      'Physical prototype validation via 3D printing',
      'Production-ready manufacturing drawing package and supplier BOM',
    ],
    clientRequirements: [
      'Product requirement document, sketch, or functional brief',
      'Target cost envelope and production volume expectations',
      'User interaction and packaging envelope constraints',
      'Target manufacturing processes and regulatory requirements',
    ],
    typicalFlow: [
      { step: '01', title: 'Requirement & Feasibility', description: 'Define core functional requirements, envelope, and materials.' },
      { step: '02', title: 'Concept Architecture', description: 'Develop 3D layout options, parting lines, and structural ribbing.' },
      { step: '03', title: 'Prototype & Iterate', description: '3D print functional mockups to test form, fit, and assembly.' },
      { step: '04', title: 'Production Handover', description: 'Deliver final drawings, BOMs, and technical supplier guidance.' },
    ],
    prefilledWhatsApp: "Hi, I'd like a quote for End-to-End Product Development.",
    relatedServices: ['mechanical-design-cad', '3d-printing', 'fabrication-support'],
    relatedWorkSlug: 'bearing-assembly',
  },
  {
    slug: 'fabrication-support',
    code: 'SRV-06',
    title: 'Fabrication Support',
    shortTitle: 'Fabrication Support',
    tagline: 'Drawings, BOM and technical guidance for cutting, bending, welding and machining.',
    summary:
      'We bridge the gap between design engineering and the workshop floor. We deliver comprehensive fabrication packages, weld symbols, cut lists, and direct technical liaison to help your fabrication partners execute cutting, bending, welding, and machining without guesswork.',
    deliverables: [
      'Weldment drawings with standard AWS / ISO weld symbols and weld sizes',
      'Cut lists for structural tubing, beams, channels, and plate stock',
      'Comprehensive Bill of Materials (BOM) including raw stock and hardware',
      'Technical guidance notes for machine shop and fabrication vendors',
    ],
    clientRequirements: [
      'Concept or draft assembly requiring production detailing',
      'Workshop capabilities or preferred manufacturing methods',
      'Material grades specified by engineering standards',
      'Assembly sequence or transport/handling size limitations',
    ],
    typicalFlow: [
      { step: '01', title: 'Process Review', description: 'Determine cutting, bending, and machining sequences with shop limits.' },
      { step: '02', title: 'Weldment Detailing', description: 'Specify joint preparations, chamfers, and weld sizes.' },
      { step: '03', title: 'BOM & Cut List Generation', description: 'Calculate stock lengths and nesting profiles.' },
      { step: '04', title: 'Shop Liaison Support', description: 'Provide clarification and drawing revisions during production.' },
    ],
    prefilledWhatsApp: "Hi, I'd like a quote for Fabrication Support and workshop drawings.",
    relatedServices: ['sheetmetal-design', 'drafting-gdt', 'mechanical-design-cad'],
    relatedWorkSlug: 'gear-plate',
  },
  {
    slug: '3d-printing',
    code: 'SRV-07',
    title: '3D Printing & Rapid Prototyping',
    shortTitle: '3D Printing',
    tagline: 'Custom prototypes and functional parts in PLA, PETG, ABS and more.',
    summary:
      'Validate form, fit, and function quickly before committing to expensive tooling or CNC machining. We produce custom 3D-printed prototypes, functional mechanism tests, and low-volume production parts in durable engineering thermoplastics.',
    deliverables: [
      'Physical 3D printed parts and functional assemblies',
      'Pre-print printability analysis and orientation optimization',
      'Support removal, assembly checks, and fit verification',
      'Iterative geometry revisions based on physical test findings',
    ],
    clientRequirements: [
      '3D CAD file (.STEP, .STL, or .SLDPRT)',
      'Material selection: PLA (visual/form check), PETG (toughness/chemical resistance), ABS (heat/durability)',
      'Infill percentage and structural load requirements',
      'Target prototype quantity and timeline',
    ],
    typicalFlow: [
      { step: '01', title: 'Model Slicing & DFM', description: 'Optimize print orientation for layer strength and surface finish.' },
      { step: '02', title: 'Material Selection', description: 'Choose PLA, PETG, or ABS based on thermal and mechanical needs.' },
      { step: '03', title: 'Additive Fabrication', description: 'Print parts layer-by-layer with controlled temperature and infill.' },
      { step: '04', title: 'Post-Process & Fit Check', description: 'Clean supports, verify thread engagement, and dispatch.' },
    ],
    prefilledWhatsApp: "Hi, I'd like a quote for 3D Printing and Prototyping.",
    relatedServices: ['product-development', 'mechanical-design-cad', 'reverse-engineering'],
    relatedWorkSlug: 'flange-coupling',
  },
];
