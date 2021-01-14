// Styles
import './VSheet.sass'

// Utilities
import { defineComponent, h } from 'vue'
import makeProps from '@/util/makeProps'

// Composables
import {
  makeBorderRadiusProps,
  makeDimensionProps,
  makeElevationProps,
  makeOutlinedProps,
  makePositionProps,
  makeTagProps,
  useBorderRadius,
  useDimension,
  useElevation,
  useOutlined,
  usePosition,
  useTheme,
} from '@/composables'

export default defineComponent({
  name: 'VSheet',

  props: makeProps({
    ...makeBorderRadiusProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeOutlinedProps(),
    ...makePositionProps(),
    ...makeTagProps(),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme()
    const { borderRadiusClasses } = useBorderRadius(props)
    const { elevationClasses } = useElevation(props)
    const { outlinedClasses } = useOutlined(props, 'v-sheet')
    const { positionClasses, positionStyles } = usePosition(props)
    const { dimensionStyles } = useDimension(props)

    return () => (
      h(props.tag, {
        class: [
          'v-sheet',
          themeClasses.value,
          borderRadiusClasses.value,
          elevationClasses.value,
          outlinedClasses.value,
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
