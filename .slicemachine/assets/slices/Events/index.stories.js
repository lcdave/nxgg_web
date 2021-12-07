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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"events","items":[{"title":[{"type":"heading2","text":"Incentivize leading-edge channels","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?w=900&h=500&fit=crop"},"text":[{"type":"paragraph","text":"Id esse culpa non dolore occaecat adipisicing. Fugiat dolore dolor eu sunt nostrud laborum commodo eiusmod dolore sint.","spans":[]}],"date":"2013-12-08"},{"title":[{"type":"heading2","text":"Recontextualize user-centric synergies","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1504198070170-4ca53bb1c1fa?w=900&h=500&fit=crop"},"text":[{"type":"paragraph","text":"Consectetur pariatur tempor velit officia do pariatur eiusmod quis. Dolor sint proident aliqua in duis voluptate in reprehenderit reprehenderit ut labore laboris. Duis est cupidatat sint duis culpa amet laboris in id irure duis pariatur ea.","spans":[]}],"date":"2018-06-24"},{"title":[{"type":"heading2","text":"Synergize intuitive content","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1589321578146-4c1ba445cc88?w=900&h=500&fit=crop"},"text":[{"type":"paragraph","text":"In exercitation ipsum aute duis quis ut ea fugiat aliqua nostrud ut tempor cupidatat. Et tempor deserunt cupidatat irure qui. Et dolore mollit culpa incididunt eiusmod adipisicing amet enim minim.","spans":[]}],"date":"2012-03-19"}],"primary":{"title":[{"type":"heading2","text":"Synergize ubiquitous e-markets","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'