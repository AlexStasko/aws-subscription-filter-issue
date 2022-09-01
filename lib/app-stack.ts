import { Stack, StackProps, Fn, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";
import { KinesisDestination } from "aws-cdk-lib/aws-logs-destinations";
import { Stream } from "aws-cdk-lib/aws-kinesis";
import { FilterPattern, LogGroup } from "aws-cdk-lib/aws-logs";

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const logGroup = new LogGroup(this, 'LogGroup', {
      logGroupName: 'test-log-group',
      removalPolicy: RemovalPolicy.DESTROY,
    });

    logGroup.addSubscriptionFilter('Filter', {
      destination: new KinesisDestination(Stream.fromStreamArn(this, 'Stream', Fn.importValue('test-stream-arn'))),
      filterPattern: FilterPattern.allEvents(),
    });
  }
}
