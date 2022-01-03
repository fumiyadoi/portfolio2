export const Card = () => import('../../components/Card.vue' /* webpackChunkName: "components/card" */).then(c => wrapFunctional(c.default || c))
export const FontSizeButton = () => import('../../components/FontSizeButton.vue' /* webpackChunkName: "components/font-size-button" */).then(c => wrapFunctional(c.default || c))
export const Navbar = () => import('../../components/Navbar.vue' /* webpackChunkName: "components/navbar" */).then(c => wrapFunctional(c.default || c))
export const NavbarContent = () => import('../../components/NavbarContent.vue' /* webpackChunkName: "components/navbar-content" */).then(c => wrapFunctional(c.default || c))
export const NavbarEdit = () => import('../../components/NavbarEdit.vue' /* webpackChunkName: "components/navbar-edit" */).then(c => wrapFunctional(c.default || c))
export const NavbarList = () => import('../../components/NavbarList.vue' /* webpackChunkName: "components/navbar-list" */).then(c => wrapFunctional(c.default || c))
export const NavbarTop = () => import('../../components/NavbarTop.vue' /* webpackChunkName: "components/navbar-top" */).then(c => wrapFunctional(c.default || c))
export const NuxtLogo = () => import('../../components/NuxtLogo.vue' /* webpackChunkName: "components/nuxt-logo" */).then(c => wrapFunctional(c.default || c))
export const Tutorial = () => import('../../components/Tutorial.vue' /* webpackChunkName: "components/tutorial" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}