import LocationModel from './location.model'

export default interface UserinfoModel extends LocationModel {
  username: string
  userpwd: string
}
