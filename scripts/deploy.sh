  echo "Processing deploy.sh"
  # Set EB BUCKET as env variable
  EB_BUCKET=elasticbeanstalk-us-west-1-042047674537
  aws configure set default.region us-west-1
  eval $(aws ecr get-login --no-include-email --region us-west-1)
  docker --version
  # Build docker image based on the default Dockerfile
  # NO SPACES between scopes e.g. scopes-1,scopes-2,scopes-3
  docker build -t codesmithllc/csps .
  # Push built image to ECS
  #docker tag codesmithllc/csps:latest 809870753536.dkr.ecr.us-west-2.amazonaws.com/csps:$TRAVIS_COMMIT
  #docker push 809870753536.dkr.ecr.us-west-2.amazonaws.com/csps:$TRAVIS_COMMIT
  # Replace the <VERSION> in Dockerrun file with travis SHA
  # sed -i='' "s/<VERSION>/$TRAVIS_COMMIT/" Dockerrun.aws.json
  # Zip modified Dockerrun with any ebextensions
  #zip -r csps-prod-deploy.zip Dockerrun.aws.json .ebextensions
  zip -r csps-prod-deploy.zip .ebextensions
  # Upload zip file to s3 bucket
  aws s3 cp csps-prod-deploy.zip s3://$EB_BUCKET/csps-prod-deploy.zip
  # Create a new application version with new Dockerrun
  aws elasticbeanstalk create-application-version --application-name codesmith-public-site-react --version-label $TRAVIS_COMMIT --source-bundle S3Bucket=$EB_BUCKET,S3Key=csps-prod-deploy.zip
  # Update environment to use new version number
  aws elasticbeanstalk update-environment --environment-name csps-prod --version-label $TRAVIS_COMMIT