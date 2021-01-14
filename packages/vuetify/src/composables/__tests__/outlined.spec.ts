// Utilities
import { useOutlined } from '..'

// Types
import type { OutlinedProps } from '..'

describe('outlined.ts', () => {
  it.each([
    [{ outlined: true }, { border: true, 'border-solid': true }],
    [{ outlined: false }, {}],
    [{ outlined: undefined }, {}],
    [{ outlined: null }, {}],
    [{ outlined: 'primary' }, { border: true, 'border-solid': true, 'border-primary': true }],
  ])('should have proper classes', (props, expected) => {
    const { outlinedClasses } = useOutlined(props as OutlinedProps)

    expect(outlinedClasses.value).toEqual(expected)
  })
})
