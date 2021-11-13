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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"news","items":[{"title":[{"type":"heading2","text":"Morph robust web services","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&h=500&fit=crop"},"date":"2017-01-30","text":[{"type":"paragraph","text":"Enim commodo nostrud excepteur enim cupidatat ut irure elit esse. Voluptate sit in qui commodo ea velit. Pariatur laboris voluptate fugiat eu consequat ad laborum labore id reprehenderit mollit sunt.","spans":[]}]},{"title":[{"type":"heading2","text":"Implement cutting-edge portals","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1560457079-9a6532ccb118?w=900&h=500&fit=crop"},"date":"2019-01-31","text":[{"type":"paragraph","text":"Pariatur consequat qui ad reprehenderit consequat velit consequat proident non incididunt. Minim et enim labore consequat consequat occaecat ad dolor. Eiusmod eiusmod officia ullamco culpa id nisi commodo dolor nostrud ipsum sint non.","spans":[]}]},{"title":[{"type":"heading2","text":"Drive dynamic supply-chains","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1493119508027-2b584f234d6c?w=900&h=500&fit=crop"},"date":"2020-09-28","text":[{"type":"paragraph","text":"Qui et proident exercitation enim. Ad in officia fugiat sint Lorem nisi do ullamco sint. Cillum voluptate proident voluptate in ex et ipsum.","spans":[]}]},{"title":[{"type":"heading2","text":"Reintermediate open-source channels","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1589321578146-4c1ba445cc88?w=900&h=500&fit=crop"},"date":"2019-07-10","text":[{"type":"paragraph","text":"Reprehenderit sunt ex adipisicing cillum irure commodo sint incididunt et magna. Elit velit Lorem incididunt id ex incididunt sit et laborum sit. Laborum velit est sit culpa dolor ipsum est ea in.","spans":[]}]},{"title":[{"type":"heading2","text":"Monetize vertical technologies","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=900&h=500&fit=crop"},"date":"2017-04-19","text":[{"type":"paragraph","text":"Veniam voluptate eu non minim officia est officia enim sunt officia fugiat et tempor. Irure enim fugiat qui dolore esse consequat deserunt mollit mollit adipisicing ea.","spans":[]}]}],"primary":{"title":[{"type":"heading2","text":"Incubate mission-critical ROI","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
