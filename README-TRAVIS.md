# CI/CD with Travis-CI

## Summary

Travis-CI is a hosted, distributed continuous integration and deployment service used to build, test, and deploy software projects hosted at GitHub.  

## Challenges

### Part 1 - Sign up for Travis-CI

1. If you don't have a Travis account already, head over to the [Travis-CI](https://travis-ci.com/) website and sign up with your Github account.

    - Activate Github Apps Integration.  This will allow you access your Github repos from Travis-CI.  You'll be forwarded over to Github where ou can choose to provide access to all repos, or only specific ones.  For now just select unit-13-DevOps.
    - Back over in Travis-CI, open the `Settings` for unit-13-DevOps
    - Note that webhooks are set up for pushes and pull requests by default.  (It will always run on merges as well.)
    - Also note that there is a place here to set up environment variables.  These will be useful later when we need to set up AWS access for deployment.
    


1. Sign in to the Console and log in using the email and password you used to create your account.

    By default, your starting region will be Ohio.  You should see this on the upper right navbar once you log in.  Remember that regions are independent.  What you have in one region is not replicated in another region unless you set that up.  

    Click on the region and change it to a region closest to you geographically.  If you ever log in to AWS and don't see the configurations you expect, always check first to see if you're looking at the correct region!
