// Utilities
import { computed, defineComponent, h } from 'vue'
import { convertToUnit } from '@/util/helpers'
import makeProps from '@/util/makeProps'
import propsFactory from '@/util/propsFactory'

import {
  makeBorderRadiusProps,
  makeDimensionProps,
  makeElevationProps,
  makeTagProps,
  useBorderRadius,
  useDimension,
  useElevation,
  useTheme,
} from '@/composables'

// Types
export interface PositionProps {
  bottom?: boolean | string
  left?: boolean | string
  position?: string
  right?: boolean | string
  top?: boolean | string
}

// Composables
const makePositionProps = propsFactory({
  bottom: [Boolean, String],
  left: [Boolean, String],
  position: String,
  right: [Boolean, String],
  top: [Boolean, String],
})

function usePosition (props: PositionProps) {
  const targets = ['top', 'right', 'bottom', 'left'] as const

  const positionClasses = computed(() => {
    return props.position ? { [`position-${props.position}`]: true } : {}
  })

  const positionStyles = computed(() => {
    const styles: Partial<Record<typeof targets[number], string>> = {}

    for (const target of targets) {
      const prop = props[target]

      if (prop == null || prop === false) continue

      styles[target] = convertToUnit(prop === true ? '0' : String(prop)) ?? '0'
    }

    return styles
  })

  return { positionClasses, positionStyles }
}

const makeOutlineProps = propsFactory({
  outlined: [Boolean, String],
})

export default defineComponent({
  name: 'VSheet',

  props: makeProps({
    ...makeBorderRadiusProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeOutlineProps(),
    ...makePositionProps(),
    ...makeTagProps(),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme()
    const { borderRadiusClasses } = useBorderRadius(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props)
    const { dimensionStyles } = useDimension(props)

    return () => (
      h(props.tag, {
        class: [
          'v-sheet',
          themeClasses.value,
          borderRadiusClasses.value,
          elevationClasses.value,
          positionClasses.value,
        ],
        style: [
          dimensionStyles.value,
          positionStyles.value,
        ],
      }, slots)
    )
  },
})
