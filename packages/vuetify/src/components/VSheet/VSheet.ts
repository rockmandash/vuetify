// Styles
import './VSheet.sass'

// Utilities
import { computed, defineComponent, h } from 'vue'
import { convertToUnit } from '@/util/helpers'
import makeProps from '@/util/makeProps'// Utilities
import propsFactory from '@/util/propsFactory'

// Composables
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

const makePositionProps = propsFactory({
  absolute: Boolean,
  bottom: [Boolean, String],
  fixed: Boolean,
  left: [Boolean, String],
  right: [Boolean, String],
  top: [Boolean, String],
})

function usePosition (props: any) {
  const positionStyles = computed(() => {
    const styles: any = {}
    const top = (props.top == null || props.top === true) ? '0' : props.top
    const right = (props.right == null || props.right === true) ? '0' : props.right
    const bottom = (props.bottom == null || props.bottom === true) ? '0' : props.bottom
    const left = (props.left == null || props.left === true) ? '0' : props.left
    const position = props.fixed ? 'fixed' : props.absolute ? 'absolute' : ''

    console.log(top)

    if (top) styles.top = convertToUnit(top)
    if (right) styles.right = convertToUnit(right)
    if (bottom) styles.bottom = convertToUnit(bottom)
    if (left) styles.left = convertToUnit(left)
    if (position) styles.position = position

    return styles
  })

  return { positionStyles }
}

// Composables
const makeOutlineProps = propsFactory({
  outlined: [Boolean, String],
})

function useOutline (props: any) {
  const outlined = props.outlined

  const outlineStyles = computed(() => {
    if (!outlined) return []

    const color = outlined === true ? 'border' : outlined

    return [
      'border-width: thin',
      'border-style: solid',
      `border-color: rgb(var(--v-theme-${color}))`,
    ]
  })

  return { outlineStyles }
}

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

  setup (props, { attrs, slots }) {
    const { borderRadiusClasses } = useBorderRadius(props)
    const { elevationClasses } = useElevation(props)
    const { themeClasses } = useTheme()
    const { dimensionStyles } = useDimension(props)
    const { outlineStyles } = useOutline(props)
    const { positionStyles } = usePosition(props)
    const classes = ['v-sheet']

    return () => (
      h(props.tag, {
        ...attrs,
        class: [
          ...classes,
          themeClasses.value,
          borderRadiusClasses.value,
          elevationClasses.value,
        ],
        style: [
          dimensionStyles.value,
          outlineStyles.value,
          positionStyles.value,
        ],
      }, slots)
    )
  },
})
