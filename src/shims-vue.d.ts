declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
// declare module '*.vue' {
//   import { App, defineComponent } from 'vue'
//   const component: ReturnType<typeof defineComponent> & {
//     install(app: App): void
//   }
//   export default component
// }
