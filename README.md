# APD

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

To build with docker:
```bash
docker run --rm -u $(id -u) \
	--entrypoint sh \
	-v "$PWD":/app \
	trion/ng-cli:15.2.10 \
	-c 'npm ci; ng build'
```

### Deploy to development CloudFront distribution
Prerequisites:
* [Generate personal Access Key][1] in AWS WebUI.
* Store both access key & secret access key

Create AWS CLI profile, using access key data:
```bash
aws configure --profile apdinfo-dev
```

Then push it to CloudFront & invalidate the cache:
```bash
export AWS_PROFILE=apdinfo-dev

aws s3 sync dist/apd s3://apdinfo-frontend --delete

CLOUDFRONT_DISTRO_ID=$(aws cloudfront list-distributions \
	--query "DistributionList.Items[?Aliases.Items[0]=='dev.apdinfo.org'].Id" \
	--output text)

aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DISTRO_ID \
  --paths "/*" \
  --no-cli-pager
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

[1]: https://us-east-1.console.aws.amazon.com/iam/home?region=eu-central-1#/security_credentials/access-key-wizard