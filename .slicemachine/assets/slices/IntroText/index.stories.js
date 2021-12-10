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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"intro_text","items":[],"primary":{"title":[{"type":"heading2","text":"Harness world-class eyeballs","spans":[]}],"text":[{"type":"paragraph","text":"In nostrud eu quis laboris culpa velit irure fugiat consectetur. Incididunt sit tempor ullamco cupidatat elit culpa amet aliqua cupidatat excepteur eu est ipsum.","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
