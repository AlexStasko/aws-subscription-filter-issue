import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Stream, StreamMode } from 'aws-cdk-lib/aws-kinesis';
import { CfnOutput } from 'aws-cdk-lib';

export class FirehoseStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const stream = new Stream(this, 'KinesisStream', {
      streamName: 'test-stream',
      streamMode: StreamMode.ON_DEMAND,
    });

    new CfnOutput(this, 'StreamName', {
      exportName: 'test-stream-arn',
      value: stream.streamArn,
    });
  }
}
