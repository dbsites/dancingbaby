# AWS

## Summary

[AWS](https://aws.amazon.com/) is an IaaS (Infrastructure as a Service) provider that gives us access to dozens of professional infrastructure solutions.  

### Sign up for AWS

1. Head over to the AWS console at https://aws.amazon.com/console/ and create a free AWS account.  If you're prompted to choose between professional and personal, go with personal for now.  

    *You will be asked for a credit card* but we will be staying on the **free tier** so you should not be charged as long as you follow these instructions carefully!

1. Sign in to the Console and log in using the email and password you used to create your account.

    By default, your starting region will be Ohio.  You should see this on the upper right navbar once you log in.  Remember that regions are independent.  What you have in one region is not replicated in another region unless you set that up.  

    Click on the region and change it to a region closest to you geographically.  If you ever log in to AWS and don't see the configurations you expect, always check first to see if you're looking at the correct region!

### IAM

You are currently signed in with your root account.  This account should only be used for billing purposes and setting up your admin group.

1. #### Create an admin group

    - Create an group called `admin` and attach the `AdministratorAccess` policy to it.

1. #### Create users

    - Add both partners as users with Programmatic and Console access.

    - Provide a simple password and make sure that both users will need to change their password upon login.

    - Add both users to the `admin` group.

    - Once you've added both users, you will see a 'success' screen where you'll have the opportunity to download a .csv containing the Access Key ID and Secret Access Key for both.  

        **DOWNLOAD THIS FILE!!**  

        This will be the **only** opportunity to get your Secret Access Key. Make sure each partner makes note of their Access Key Id and Secret Access Key.

    - Apply an IAM Password Policy to create rules for IAM user passwords.

1. #### Sign in with your new admin user account

    - Sign out of your account and follow the console sign-in link in the csv to log back in with your admin user and set up your new password.

    - From the Dashboard, you can customize your sign-in link.  If you do, you'll use this new custom name as the Account Id when you log in (before you enter your username and password)

### Elastic Beanstalk

Great, we have an AWS account!  Let's use it.  We'll start by creating a new application with Elastic Beanstalk, which you'll find in the Services menu dropdown.

1. #### Create a new application

    - We're going to deploy the MegaMarkets app, so name your application appropriately

1. #### Create a production environment

    - Note that you'll have to set an environment name.  The default value is something like `Megamarkets-env`.  You'll want to change that to something the easily identifies this as the production environment for the Megamarkets application.

    - We're going to deploy a containerized application, so select Docker as your preconfigured platform.

    - In order to deploy your initial code, you'll need to zip it up into an archive file.  We can use git to do this.

    ```git archive -v -o myMM.zip --format=zip HEAD```

    - Select `Create Environment` and wait for a few minutes while AWS creates an S3 bucket, sets up security groups and spins up your EC2 instance complete with our application running in a docker container.

    - Once this is complete, open the Dashboard for your new environment and follow the URL at the top to see your application running in the cloud.

### RDS

Well that wasn't too bad at all.  We've still got some work to do though.
