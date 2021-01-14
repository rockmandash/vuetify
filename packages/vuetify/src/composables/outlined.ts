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

export function useOutlined (props: OutlinedProps) {
  const outlinedClasses = computed(() => {
    const classes: Dictionary<boolean> = {}

    if (!props.outlined) return classes

    classes.border = true
    classes['border-solid'] = true

    if (typeof props.outlined === 'string') {
      classes[`border-${props.outlined}`] = true
    }

    return classes
  })

  return { outlinedClasses }
}
