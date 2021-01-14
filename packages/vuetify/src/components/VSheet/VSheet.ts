// Styles
import './VSheet.sass'

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
  absolute?: boolean
  bottom?: boolean | string
  fixed?: boolean
  left?: boolean | string
  right?: boolean | string
  top?: boolean | string
}

// Composables
const makePositionProps = propsFactory({
  absolute: Boolean,
  bottom: [Boolean, String],
  fixed: Boolean,
  left: [Boolean, String],
  right: [Boolean, String],
  top: [Boolean, String],
})

function usePosition (props: PositionProps) {
  const positionStyles = computed(() => {
    const targets = ['top', 'right', 'bottom', 'left'] as const
    const styles: Partial<Record<typeof targets[number] | 'position', string>> = {}
    const pos = props.fixed ? 'fixed' : props.absolute ? 'absolute' : undefined

    if (pos) styles.position = pos

    for (const target of targets) {
      const prop = props[target]

      if (prop == null || prop === false) continue

      styles[target] = convertToUnit(prop === true ? '0' : String(prop)) ?? '0'
    }

    return styles
  })

  return { positionStyles }
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
    const { borderRadiusClasses } = useBorderRadius(props)
    const { elevationClasses } = useElevation(props)
    const { themeClasses } = useTheme()
    const { dimensionStyles } = useDimension(props)
    const { positionStyles } = usePosition(props)

    return () => (
      h(props.tag, {
        class: [
          'v-sheet',
          themeClasses.value,
          borderRadiusClasses.value,
          elevationClasses.value,
        ],
        style: [
          dimensionStyles.value,
          positionStyles.value,
        ],
      }, slots)
    )
  },
})
