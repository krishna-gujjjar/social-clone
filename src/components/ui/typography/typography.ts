import { tv } from 'tailwind-variants';

import type { WithClassNameVariants } from '@/types/common';

export const typography = tv({
  base: 'text-slate-900',
  variants: {
    type: {
      display: 'text-6xl font-[GeneralSansMedium]',
      heading: 'text-4xl font-[GeneralSansBold]',
      title: 'text-3xl font-[GeneralSansSemibold]',
      label: 'text-2xl font-[GeneralSansMedium]',
      paragraph: 'text-xl font-[GeneralSansMedium]',
      tiny: 'text-lg font-[GeneralSansMedium]',
    },
  },
});

export type TypographyProps = WithClassNameVariants<typeof typography>;
