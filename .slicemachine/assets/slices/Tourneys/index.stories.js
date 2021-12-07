import MyComponent from '../../../../slices/Tourneys';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Tourneys'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"tourneys","items":[{"title":[{"type":"heading2","text":"Generate sexy methodologies","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1576662712957-9c79ae1280f8?w=900&h=500&fit=crop"},"text":[{"type":"paragraph","text":"Magna exercitation proident fugiat incididunt quis irure aute commodo eu.","spans":[]}],"date":"2017-03-03"},{"title":[{"type":"heading2","text":"Productize robust e-commerce","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1596195689404-24d8a8d1c6ea?w=900&h=500&fit=crop"},"text":[{"type":"paragraph","text":"Eu minim fugiat eiusmod labore laboris voluptate occaecat ad sint.","spans":[]}],"date":"2013-06-10"},{"title":[{"type":"heading2","text":"Benchmark 24/365 eyeballs","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&h=500&fit=crop"},"text":[{"type":"paragraph","text":"Commodo pariatur nostrud non.","spans":[]}],"date":"2012-06-23"},{"title":[{"type":"heading2","text":"Streamline vertical infomediaries","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=900&h=500&fit=crop"},"text":[{"type":"paragraph","text":"Commodo sunt quis proident dolore tempor nostrud eiusmod veniam aliqua ullamco sint laborum do.","spans":[]}],"date":"2018-03-10"}],"primary":{"title":[{"type":"heading2","text":"Exploit visionary portals","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
