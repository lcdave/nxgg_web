import MyComponent from '../../../../slices/IntroText';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/IntroText'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"intro_text","items":[],"primary":{"title":[{"type":"heading2","text":"Cultivate transparent solutions","spans":[]}],"text":[{"type":"paragraph","text":"Anim aliquip velit incididunt officia veniam laborum veniam cupidatat. Pariatur laborum veniam sit nisi aliqua non laboris aliquip aute mollit magna non nostrud deserunt officia.","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
