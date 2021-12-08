import MyComponent from '../../../../slices/Tourney';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Tourney'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"tourney","items":[],"primary":{"title":[{"type":"heading1","text":"Optimize best-of-breed e-commerce","spans":[]}],"description":[{"type":"paragraph","text":"Do eiusmod occaecat Lorem voluptate eu est adipisicing. Eu culpa deserunt occaecat minim commodo deserunt id duis cupidatat commodo mollit pariatur excepteur ex amet. Esse minim qui magna occaecat esse laborum deserunt consectetur.","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
