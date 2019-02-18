# CI/CD with Travis-CI

## Summary

Travis-CI is a hosted, distributed continuous integration and deployment service used to build, test, and deploy software projects hosted at GitHub.  

## Challenges

### Part 1 - Sign up for Travis-CI

If you don't have a Travis account already, head over to the [Travis-CI](https://travis-ci.com/) website and sign up with your Github account.

1. Activate Github Apps Integration.  This will allow you access your Github repos from Travis-CI.  You'll be forwarded over to Github where ou can choose to provide access to all repos, or only specific ones.  For now just select unit-13-DevOps.

1. Back over in Travis-CI, open the `Settings` for unit-13-DevOps
    - Note that webhooks are set up for pushes and pull requests by default.  (It will always run on merges as well.)
    - Also note that there is a place here to set up environment variables.  These will be useful later when we need to set up AWS access for deployment.

### Part 2 - Configure the repo for Travis

Travis-CI relies on `.travis.yml` in your repo for instructions on what it should do to run tests and deploy your code.

1. Create .travis.yml in your repo's top level directory.
    - stuff