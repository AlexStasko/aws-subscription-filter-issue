# Repo to reproduce issue with creation of Subscription Filter

## Steps to reproduce

* `git checkout e7c4f87` checkout to commit to reproduce issue
* `cdk deploy StreamStack` deploy stack with Kinesis Stream
* `cdk deploy AppStack` deploy stack with app

## Steps to fix

* `git checkout main` checkout to the latest commit with fix
* `cdk deploy StreamStack` deploy stack with Kinesis Stream
* `cdk deploy AppStack` deploy stack with app

