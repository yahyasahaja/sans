export const TOKEN_URL = 'sans_dev_token'
export const END_POINT_URL = 'https://api.sans.ngopi.men'
export const getEndPointURL = path => `${END_POINT_URL}${path}`
export const GRAPHQL_END_POINT = getEndPointURL('/graphql')

export default {
  TOKEN_URL,
  END_POINT_URL,
  GRAPHQL_END_POINT,
}