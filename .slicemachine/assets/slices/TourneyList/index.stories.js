import MyComponent from '../../../../slices/TourneyList';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/TourneyList'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"tourney_list","items":[],"primary":{"title":[{"type":"heading1","text":"Incubate user-centric markets","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
