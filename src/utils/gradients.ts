// Theme-compliant gradients fading to transparent
export const getGradients = (theme: any) => [
  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, transparent 100%)`,
  `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, transparent 100%)`,
  `linear-gradient(135deg, ${theme.palette.info.main} 0%, transparent 100%)`,
  `linear-gradient(135deg, ${theme.palette.success.main} 0%, transparent 100%)`,
  `linear-gradient(135deg, ${theme.palette.primary.light} 0%, transparent 100%)`,
  `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, transparent 100%)`,
  `linear-gradient(135deg, ${theme.palette.info.light} 0%, transparent 100%)`,
  `linear-gradient(135deg, ${theme.palette.success.light} 0%, transparent 100%)`,
  `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, transparent 100%)`,
  `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, transparent 100%)`,
  `linear-gradient(135deg, ${theme.palette.info.dark} 0%, transparent 100%)`,
  `linear-gradient(135deg, ${theme.palette.success.dark} 0%, transparent 100%)`,
  `linear-gradient(135deg, ${theme.palette.warning.main} 0%, transparent 100%)`,
  `linear-gradient(135deg, ${theme.palette.error.main} 0%, transparent 100%)`,
  `linear-gradient(135deg, ${theme.palette.primary.main} 20%, transparent 100%)`,
];
