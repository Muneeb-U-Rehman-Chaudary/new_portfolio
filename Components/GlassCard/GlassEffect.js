'use client';

import { Box } from '@chakra-ui/react';

export default function GlassCard({ children, ...rest }) {
  return (
    <Box
      position="relative"
      zIndex={2}
      borderRadius="2xl"
      px={{ base: 6, md: 10 }}
      py={{ base: 6, md: 8 }}
      mx="auto"
      bg="linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
      border="1px solid"
      borderColor="rgba(255,255,255,0.12)"
      style={{
        backdropFilter: 'blur(12px) saturate(140%)',
        WebkitBackdropFilter: 'blur(12px) saturate(140%)',
      }}
      boxShadow="0 6px 30px rgba(2,6,23,0.6)"
      overflow="hidden"
      transition="transform .35s cubic-bezier(.2,.9,.2,1), box-shadow .35s"
      sx={{
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-30%',
          left: '-20%',
          width: '160%',
          height: '60%',
          transform: 'rotate(-18deg)',
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0) 100%)',
          filter: 'blur(18px)',
          pointerEvents: 'none',
          opacity: 0.7,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          right: -40,
          bottom: -40,
          width: 120,
          height: 120,
          borderRadius: 'full',
          background:
            'radial-gradient(circle at center, rgba(255,255,255,0.03), rgba(255,255,255,0))',
          pointerEvents: 'none',
        },
        '@supports not ((-webkit-backdrop-filter: blur(12px)) or (backdrop-filter: blur(12px)))': {
          bg: 'rgba(255,255,255,0.04)',
          borderColor: 'rgba(255,255,255,0.08)',
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
