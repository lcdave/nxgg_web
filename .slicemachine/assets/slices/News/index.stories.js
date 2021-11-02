import MyComponent from '../../../../slices/News';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/News'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"news","items":[{"title":[{"type":"heading3","text":"Maximize user-centric relationships","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=900&h=500&fit=crop"},"date":"2013-09-01","text":[{"type":"paragraph","text":"Consectetur eu proident nostrud dolor laboris aliqua qui. Cillum elit mollit elit laborum consectetur commodo pariatur ut enim enim. Quis laboris qui velit et ea consequat exercitation in.","spans":[]}]},{"title":[{"type":"heading3","text":"Cultivate scalable platforms","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=900&h=500&fit=crop"},"date":"2020-01-30","text":[{"type":"paragraph","text":"Tempor cillum amet occaecat sunt duis ullamco adipisicing ex non labore labore consectetur mollit anim.","spans":[]}]}],"primary":{"title":[{"type":"heading2","text":"Recontextualize seamless metrics","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
