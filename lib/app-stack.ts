import { Stack, StackProps, Fn, RemovalPolicy, Resource } from "aws-cdk-lib";
import { Construct } from "constructs";
import { KinesisDestination } from "aws-cdk-lib/aws-logs-destinations";
import { Stream } from "aws-cdk-lib/aws-kinesis";
import { FilterPattern, LogGroup, SubscriptionFilterProps, CfnSubscriptionFilter } from "aws-cdk-lib/aws-logs";

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const logGroup = new LogGroup(this, 'LogGroup', {
      logGroupName: 'test-log-group',
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new FixedSubscriptionFilter(this, 'Filter', {
      logGroup,
      destination: new KinesisDestination(
        Stream.fromStreamArn(this, 'Stream', Fn.importValue('test-stream-arn'))),
      filterPattern: FilterPattern.allEvents(),
    });
  }
}
/**
  * This class is copy of {@link SubscriptionFilter}
  * with fix added in the end of constructor
  */
class FixedSubscriptionFilter extends Resource {
  constructor(scope: Construct, id: string, props: SubscriptionFilterProps) {
    super(scope, id);

    const destProps = props.destination.bind(this, props.logGroup);

    const filter = new CfnSubscriptionFilter(this, 'Resource', {
      logGroupName: props.logGroup.logGroupName,
      destinationArn: destProps.arn,
      roleArn: destProps.role && destProps.role.roleArn,
      filterPattern: props.filterPattern.logPatternString,
    });

    // Add dependency on policy
    if (destProps.role) {
      // Find policy attached to role
      const policy = destProps.role.node.tryFindChild('DefaultPolicy');
      if (policy) {
        // filter should depend on policy
        filter.node.addDependency(policy);
      } else {
        throw new Error('there is no policy');
      }
    }
  }
}

