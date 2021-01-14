// Utilities
import { useOutlined } from '..'

// Types
import type { OutlinedProps } from '..'

describe('outlined.ts', () => {
  it.each([
    [{ outlined: true }, { 'v-component--outlined': true }],
    [{ outlined: false }, {}],
    [{ outlined: undefined }, {}],
    [{ outlined: null }, {}],
    [{ outlined: 'primary' }, { 'v-component--outlined': true, 'border-primary': true }],
  ])('should have proper classes', (props, expected) => {
    const { outlinedClasses } = useOutlined(props as OutlinedProps, 'v-component')

    expect(outlinedClasses.value).toEqual(expected)
  })
})
