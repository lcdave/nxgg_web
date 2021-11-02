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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"member","items":[{"image":{"dimensions":{"width":318,"height":318},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1596195689404-24d8a8d1c6ea?w=318&h=318&fit=crop"},"name":[{"type":"paragraph","text":"Aliqua labore do amet exercitation. Elit excepteur id culpa nisi ea. Irure consectetur cupidatat non ea dolore est officia ipsum esse ullamco deserunt quis elit est sit.","spans":[]}]},{"image":{"dimensions":{"width":318,"height":318},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=318&h=318&fit=crop"},"name":[{"type":"paragraph","text":"Deserunt quis cillum reprehenderit esse sunt ad est nulla dolore nostrud. Culpa sit labore nulla officia mollit non enim commodo aliqua amet veniam. Ut laborum mollit veniam id eiusmod irure sit dolore do sint consequat.","spans":[]}]},{"image":{"dimensions":{"width":318,"height":318},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=318&h=318&fit=crop"},"name":[{"type":"paragraph","text":"Duis labore nisi commodo voluptate irure dolor mollit incididunt esse eiusmod magna culpa ut cillum aliquip. Deserunt consectetur enim irure exercitation elit in ullamco nostrud aliquip. Ea amet excepteur esse magna excepteur Lorem nisi mollit proident ea occaecat.","spans":[]}]},{"image":{"dimensions":{"width":318,"height":318},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1576662712957-9c79ae1280f8?w=318&h=318&fit=crop"},"name":[{"type":"paragraph","text":"Consectetur eiusmod eu consequat ex ea.","spans":[]}]}],"primary":{"title":[{"type":"heading2","text":"Transition ubiquitous schemas","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
