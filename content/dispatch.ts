export interface DispatchIssue {
  issueNumber: string;
  volume: string;
  date: string;
  title: string;
  kicker: string;
  summary: string;
  leadStory: {
    title: string;
    kicker: string;
    leadDropCap: string;
    paragraphs: string[];
  };
  workbench: {
    title: string;
    kicker: string;
    paragraphs: string[];
    checklist: string[];
  };
  ruleOfThumb: {
    title: string;
    rule: string;
    standardReference: string;
    explanation: string;
  };
  classifieds: {
    title: string;
    notice: string;
    actionLabel: string;
    actionUrl: string;
  };
  colophon: {
    publishedBy: string;
    contactEmail: string;
    contactPhone: string;
    notes: string;
  };
}

export const DISPATCH_ISSUES: DispatchIssue[] = [
  {
    issueNumber: '001',
    volume: 'VOL. 1 · NO. 1',
    date: '2026-03-01',
    title: 'Designing for Manufacture: Process Precedes Geometry',
    kicker: 'NOTES FROM THE DESIGN DESK · OWNER REVIEW',
    summary:
      'Why tooling limits determine CAD feature trees, what constitutes a complete GD&T production drawing package, and basic sheetmetal bend relief rules.',
    leadStory: {
      title: 'Designing for Manufacture: Consider the Process Before the Geometry',
      kicker: 'LEAD STORY',
      leadDropCap: 'E',
      paragraphs: [
        'very line drawn in a 3D CAD environment carries an implied manufacturing cost. When designing machine elements, it is tempting to sketch ideal mathematical contours—sharp inside corners, deep narrow pockets, and razor-thin wall sections. In the digital viewport, these look pristine. On the CNC milling machine or press brake, they represent tool chatter, excessive setup time, and premature cutter breakage.',
        'Practical design engineering starts with the tooling path. If a pocket is 40mm deep, an end mill with an appropriate length-to-diameter ratio is required; specifying a corner radius smaller than the cutter radius forces unnecessary EDM burning or tiny tool passes. By sizing inside radii slightly larger than standard tool sizes (for example, specifying an R3.5 corner for an R3 tool), the machine tool can sweep through corners smoothly without dwelling.',
        'The same discipline applies to turned shafts and sheetmetal flanges. When geometry respects the physics of cutting, bending, and workholding, parts are produced faster, hold tighter tolerances, and cost significantly less. Design for manufacture is not a compromise on performance; it is the discipline of achieving functional requirements through economical tooling operations.',
      ],
    },
    workbench: {
      title: 'What a GD&T-Ready Drawing Package Includes',
      kicker: 'FROM THE WORKBENCH',
      paragraphs: [
        'A 3D model represents nominal geometry, but machines do not produce nominal geometry. They produce parts with microscopic dimensional variation, surface roughness, and geometric form errors. A complete 2D manufacturing package communicates exact boundaries of acceptability so shop floors and inspection teams work without confusion.',
        'Based on standard engineering drafting practices, every production-ready drawing package released from our desk includes five core elements:',
      ],
      checklist: [
        'Clear Datums: Functional datum reference frames (A, B, C) established from real mating surfaces and locating registers.',
        'Geometric Tolerances: True position, perpendicularity, parallelism, and runout callouts where coordinate tolerancing is ambiguous.',
        'Fit Designations: Standard ISO hole/shaft fit classifications (e.g., H7/p6 for press fits, H7/g6 for precision slides).',
        'Surface Texture: Arithmetic mean roughness (Ra in micrometers) specified for sealing faces, bearing journals, and sliding guides.',
        'Bill of Materials (BOM): Structured table detailing part numbers, stock material specifications, quantity, and standard off-the-shelf hardware.',
      ],
    },
    ruleOfThumb: {
      title: 'Sheetmetal Bend Relief and Hole Proximity',
      rule: 'Minimum bend relief depth = bend radius (R) + sheet thickness (T). Minimum hole-to-bend distance = 2× sheet thickness (2T) + bend radius (R).',
      standardReference: 'Standard press brake sheetmetal forming practice (DIN 6935 / ASME Y14.8M guidelines)',
      explanation:
        'When sheet metal is bent, material on the inner bend radius undergoes compression while the outer fibers experience tension. Without adequate rectangular or tear relief notches extending past the tangent line, the material tears unpredictably at the flange corners. Similarly, placing pierced holes too close to the bend tangent line causes oval distortion as the metal flows during punch penetration. Maintaining 2T + R spacing ensures circular holes stay round after bending.',
    },
    classifieds: {
      title: 'Studio Availability & Technical Support',
      notice:
        'The MechLab Engineering is currently accepting requirements for mechanical design, parametric 3D CAD modelling, 2D drafting packages with GD&T, and rapid 3D printing in PLA, PETG, and ABS. All designs are handled confidentially with direct engineer-to-engineer communication.',
      actionLabel: 'Get a quote for your project',
      actionUrl: '/quote',
    },
    colophon: {
      publishedBy: 'The MechLab Engineering',
      contactEmail: 'themechlabengineering@gmail.com',
      contactPhone: '+91 86102 41235',
      notes:
        'The MechLab Dispatch is an independent technical publication published for mechanical engineers, designers, and hardware product teams. Unsubscribe at any time.',
    },
  },
];
