// pipeline-stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
  CodeBuildStep
} from 'aws-cdk-lib/pipelines';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { STAGES } from '../constants';
import { VisionSyncStage } from './visionsync-stage';
import { BuildEnvironmentVariableType } from 'aws-cdk-lib/aws-codebuild';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // 1. Retrieve your GitHub token from Secrets Manager
    const githubTokenSecretName = 'visionSyncRepoAccessToken';
    const githubSecretValue = cdk.SecretValue.secretsManager(githubTokenSecretName, {
      jsonField: 'visionSyncRepoAccessToken',
    });

    // 2. Define GitHub repo details
    const githubRepoOwner = 'njjkn';
    const githubRepoName = 'VisionSync-CDK';
    const githubBranch = 'main';

    // 3. Create a pipeline referencing your GitHub repository
    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'VisionSync',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub(`${githubRepoOwner}/${githubRepoName}`, githubBranch, {
          authentication: githubSecretValue,
        }),
        commands: [
          // Runs once to build & test
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
      crossAccountKeys: true,
    });



    // 4. Add a stage for each environment in STAGES array
    for (const stageConfig of STAGES) {
        const stageName = stageConfig.name;
  
        pipeline.addStage(
          new VisionSyncStage(this, `${stageName}-Stage`, {
            stageConfig,
          }),
        );
    }
  }
}