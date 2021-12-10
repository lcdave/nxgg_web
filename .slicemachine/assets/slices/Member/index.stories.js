import MyComponent from '../../../../slices/Member';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Member'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"member","items":[{"image":{"dimensions":{"width":318,"height":318},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=318&h=318&fit=crop"},"name":[{"type":"paragraph","text":"Laboris nisi cupidatat dolore ex minim cillum excepteur dolor ex nostrud sint ea ex.","spans":[]}]},{"image":{"dimensions":{"width":318,"height":318},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1587905069134-008460d7a636?w=318&h=318&fit=crop"},"name":[{"type":"paragraph","text":"Magna aliquip adipisicing non ullamco esse labore aliqua ullamco. Dolore laborum quis anim fugiat ullamco nisi Lorem officia consectetur. Exercitation dolore commodo est commodo incididunt labore labore non irure.","spans":[]}]},{"image":{"dimensions":{"width":318,"height":318},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1531771686035-25f47595c87a?w=318&h=318&fit=crop"},"name":[{"type":"paragraph","text":"Do laboris cillum commodo.","spans":[]}]},{"image":{"dimensions":{"width":318,"height":318},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?w=318&h=318&fit=crop"},"name":[{"type":"paragraph","text":"Ullamco aliquip eiusmod ex culpa et ad laborum.","spans":[]}]},{"image":{"dimensions":{"width":318,"height":318},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=318&h=318&fit=crop"},"name":[{"type":"paragraph","text":"Aliqua tempor id dolore est sint fugiat ipsum sunt labore aliqua sint. Mollit laboris ad consequat velit elit. Ullamco labore velit ipsum reprehenderit voluptate nostrud nulla cupidatat enim cupidatat est consectetur.","spans":[]}]}],"primary":{"title":[{"type":"heading2","text":"Matrix one-to-one action-items","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
