import Vue from 'vue'
import vSelect from 'vue-select'
import { createPopper } from '@popperjs/core'

// Set the components prop default to return our fresh components
vSelect.props.components.default = () => ({
  Deselect: {
    render: h => h('feather-icon', { props: { size: '14', icon: 'XIcon' } }),
  },
  OpenIndicator: {
    render: h => h('feather-icon', { props: { size: '15', icon: 'ChevronDownIcon' }, class: 'open-indicator' }),
  },
})

const withPopper = (dropdownList, component, { width }) => {
  dropdownList.style.width = width
  const popper = createPopper(component.$refs.toggle, dropdownList, {
    placement: 'top',
  })

  return () => popper.destroy()
}

Vue.component(vSelect)

export default withPopper
