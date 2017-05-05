import Now from 'now-client-isomorphic';

export default function(token) {
  return new Now(token);
}