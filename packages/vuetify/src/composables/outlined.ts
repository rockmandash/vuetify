// Utilities
import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
export interface OutlinedProps {
  outlined?: boolean | string
}

// Composables
export const makeOutlinedProps = propsFactory({
  outlined: [Boolean, String],
})

export function useOutlined (props: OutlinedProps, target: string) {
  const outlinedClasses = computed(() => {
    const classes: Dictionary<boolean> = {}

    if (!props.outlined) return classes

    classes[`${target}--outlined`] = true

    if (typeof props.outlined === 'string') {
      classes[`border-${props.outlined}`] = true
    }

    return classes
  })

  return { outlinedClasses }
}
