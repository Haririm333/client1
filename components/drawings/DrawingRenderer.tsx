import React from 'react';
import FlangeCouplingDrawing from './FlangeCouplingDrawing';
import SpurGearDrawing from './SpurGearDrawing';
import SteppedShaftDrawing from './SteppedShaftDrawing';
import BearingAssemblyDrawing from './BearingAssemblyDrawing';
import LBracketDrawing from './LBracketDrawing';
import GearPlateDrawing from './GearPlateDrawing';

interface DrawingRendererProps {
  type: string;
  className?: string;
  animate?: boolean;
}

export default function DrawingRenderer({ type, className, animate }: DrawingRendererProps) {
  switch (type) {
    case 'spur-gear':
      return <SpurGearDrawing className={className} animate={animate} />;
    case 'stepped-shaft':
      return <SteppedShaftDrawing className={className} animate={animate} />;
    case 'flange-coupling':
      return <FlangeCouplingDrawing className={className} animate={animate} />;
    case 'bearing-assembly':
      return <BearingAssemblyDrawing className={className} animate={animate} />;
    case 'l-bracket-gusset':
    case 'l-bracket':
      return <LBracketDrawing className={className} animate={animate} />;
    case 'gear-plate':
      return <GearPlateDrawing className={className} animate={animate} />;
    default:
      return <FlangeCouplingDrawing className={className} animate={animate} />;
  }
}
