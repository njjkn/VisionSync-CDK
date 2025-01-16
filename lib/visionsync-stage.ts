import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StageConfig } from '../constants';
//import { StageConfig, HOSTED_ZONE_ID, DELEGATION_ROLE_ARN, ZONE_NAME } from '../constants';
import { VisionSyncStack } from './visionsync-stack';

interface VisionSyncStageProps extends StageProps {
  stageConfig: StageConfig;
}

export class VisionSyncStage extends Stage {
  constructor(scope: Construct, id: string, props: VisionSyncStageProps) {
    super(scope, id, props);

    const { stageConfig } = props;

    // For each environment in this stage
    for (const envItem of stageConfig.environments) {
      for (const region of envItem.regions) {
        // If null/undefined, default to true
        const isServiceStack = envItem.isServiceStack ?? true;

        const visionSyncStackName = `${stageConfig.name}-VisionSyncStack-${region}`;
        new VisionSyncStack(this, visionSyncStackName, {
          stage: stageConfig.name.toLowerCase(),
          applicationName: 'VisionSyncStack',
          accountId: envItem.accountId,
          region,
          isServiceStack,
          env: {
            account: envItem.accountId,
            region,
          },
        });
      }
    }
  }
}