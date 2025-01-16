import { Stack, StackProps, CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as logs from 'aws-cdk-lib/aws-logs';

export interface VisionSyncStackProps extends StackProps {
  readonly stage: string;
  readonly applicationName: string;
  readonly accountId: string;
  readonly region: string;
  readonly isServiceStack: boolean;
}

export class VisionSyncStack extends Stack {
  private readonly prefix: string;

  constructor(scope: Construct, id: string, props: VisionSyncStackProps) {
    super(scope, id, props);

    this.prefix = props.stage;

    const testS3Bucket = new s3.Bucket(this, 'ClipUploadBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const logGroup = new logs.LogGroup(this, 'VisionSyncLogGroup', {
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}