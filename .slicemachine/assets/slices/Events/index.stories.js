import MyComponent from '../../../../slices/Events';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Events'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"events","items":[{"title":[{"type":"heading2","text":"Iterate web-enabled synergies","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1600861194802-a2b11076bc51?w=900&h=500&fit=crop"},"text":[{"type":"paragraph","text":"Dolor occaecat qui dolore velit eiusmod laborum fugiat nulla eu incididunt do consectetur pariatur.","spans":[]}],"date":"2012-02-23"},{"title":[{"type":"heading2","text":"E-enable strategic architectures","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&h=500&fit=crop"},"text":[{"type":"paragraph","text":"In aliqua aliquip ex dolor ullamco ullamco nisi do nulla mollit aliqua amet minim aute. Magna in in consequat id eu officia ad enim ullamco non. Quis esse minim aute aliqua exercitation in amet Lorem irure reprehenderit.","spans":[]}],"date":"2014-06-01"},{"title":[{"type":"heading2","text":"Embrace proactive synergies","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=900&h=500&fit=crop"},"text":[{"type":"paragraph","text":"Exercitation aute ad anim officia occaecat aliqua consequat veniam id veniam esse cillum consectetur veniam culpa. Labore est ad ex excepteur id commodo qui esse nulla commodo proident. Minim et enim aliquip id quis occaecat consequat.","spans":[]}],"date":"2012-07-18"},{"title":[{"type":"heading2","text":"Orchestrate extensible niches","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1504198070170-4ca53bb1c1fa?w=900&h=500&fit=crop"},"text":[{"type":"paragraph","text":"Pariatur fugiat elit in velit consectetur. Velit consectetur eu velit consequat eiusmod commodo exercitation officia incididunt nisi incididunt officia eiusmod magna ea. Eu qui in ut magna ad minim Lorem culpa laboris non.","spans":[]}],"date":"2013-04-28"}],"primary":{"title":[{"type":"heading1","text":"Streamline viral e-business","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
