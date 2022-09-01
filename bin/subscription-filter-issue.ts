#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FirehoseStack } from '../lib/stream-stack';
import { AppStack } from '../lib/app-stack';

const app = new cdk.App();
new FirehoseStack(app, 'StreamStack', {});
new AppStack(app, 'AppStack', {});

