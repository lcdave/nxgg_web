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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"intro","items":[],"primary":{"title":[{"type":"heading1","text":"Transition virtual technologies","spans":[]}],"description":[{"type":"paragraph","text":"Aute nisi Lorem tempor excepteur non enim. Tempor proident deserunt culpa ullamco nisi dolore excepteur et elit esse dolor aliqua qui nisi irure. Incididunt et est pariatur minim exercitation.","spans":[]}],"buttonLink":{"link_type":"Web","url":"http://twitter.com"},"buttonLabel":"incubate strategic infrastructures"},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
