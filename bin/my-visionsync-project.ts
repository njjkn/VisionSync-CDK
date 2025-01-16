import { App } from 'aws-cdk-lib';
import { PipelineStack } from '../lib/pipeline-stack';

const app = new App();

// Create the pipeline stack which will contain all Beta/Gamma/Prod stages
new PipelineStack(app, 'VisionSyncPipelineStack', {
  env: {
    account: '061051239164', // Root account ID
    region: 'us-west-2',    // Target region
  },
});

// Synthesize
app.synth();
