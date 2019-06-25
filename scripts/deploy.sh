echo "Processing deploy.sh"
# Set EB BUCKET as env variable
EB_BUCKET=elasticbeanstalk-us-west-2-295078398723 
# Set ECR REPO as env variable
ECR_REPO=295078398723.dkr.ecr.us-west-2.amazonaws.com/dancing-baby
# Set the default region for aws cli
aws configure set default.region us-west-2
# securely log in to ECR
eval $(aws ecr get-login --no-include-email --region us-west-2)
# Build docker image based on our default Dockerfile
docker build -t dbsites/dancing-baby .
# tag the image with the Travis-CI SHA
docker tag dbsites/dancing-baby:latest $ECR_REPO:$TRAVIS_COMMIT
# Push built image to ECS
docker push $ECR_REPO:$TRAVIS_COMMIT
# Use the linux sed command to replace the text '<VERSION>' in our Dockerrun file with the Travis-CI SHA
sed -i='' "s/<VERSION>/$TRAVIS_COMMIT/" Dockerrun.aws.json
# Zip up our modified Dockerrun with our .ebextensions directory
zip -r db-prod-deploy.zip Dockerrun.aws.json .ebextensions
# verify contents of the zip file
unzip -l db-prod-deploy.zip
# Upload zip file to s3 bucket
aws s3 cp db-prod-deploy.zip s3://$EB_BUCKET/dancing-baby/db-prod-deploy.zip
# Create a new application version with new Dockerrun
aws elasticbeanstalk create-application-version --application-name dancing-baby --version-label $TRAVIS_COMMIT --source-bundle S3Bucket=$EB_BUCKET,S3Key=dancing-baby/db-prod-deploy.zip
# Update environment to use new version number
aws elasticbeanstalk update-environment --environment-name dancing-baby-prod --version-label $TRAVIS_COMMIT