import _ from 'lodash';
import Now from './now';

export default async function(token) {
  const [deployments, aliases] = await Promise.all([
    Now(token).getDeployments(),
    Now(token).getAliases()
  ]);
  const groupedAliases = _.groupBy(aliases, 'deploymentId');
  _.forEach(deployments, (deployment) => {
    if (groupedAliases[deployment.uid]) {
      deployment.aliases = groupedAliases[deployment.uid];
    }
  });
  return deployments;
}
