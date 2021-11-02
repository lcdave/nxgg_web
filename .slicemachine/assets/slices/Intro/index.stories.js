import MyComponent from '../../../../slices/Intro';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Intro'
}


export const _DefaultSlice = () => ({
  components: {
    MyComponent,
    SliceZone
  },
  methods: {
    resolve() {
      return MyComponent
    }
  },
  data() {
    return {
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"intro","items":[],"primary":{"title":[{"type":"heading1","text":"Extend mission-critical platforms","spans":[]}],"description":[{"type":"paragraph","text":"Occaecat ut aliqua elit id ad sunt commodo.","spans":[]}],"buttonLink":{"link_type":"Web","url":"https://prismic.io"},"buttonLabel":"deliver user-centric paradigms"},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
