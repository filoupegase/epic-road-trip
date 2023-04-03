#!/bin/bash

# Script to setup and deploy the second git repository for the project
# The second git repository is used for the github action

# Run Cypress tests
#echo 'Running Cypress tests 🧪'
#npx cypress run --spec "cypress/integration/**/*"
#
## Check if the tests passed
#if [ $? -ne 0 ]; then
#  echo "Cypress tests failed ❌"
#  exit 1
#fi

echo 'start deploy on Vercel <-----'
git remote remove origin
git remote remove all
git remote add origin git@github.com:EpitechMscProPromo2024/T-WEB-800-PAR_9.git
# Create a new remote called "all" with the URL of the primary repo.
git remote add all git@github.com:EpitechMscProPromo2024/T-WEB-800-PAR_9.git
# Re-register the remote as a push URL.
git remote set-url --add --push all git@github.com:EpitechMscProPromo2024/T-WEB-800-PAR_9.git
# Add a push URL to a remote. This means that "git push" will also push to this git URL.
git remote set-url --add --push all git@github.com:filoupegase/epic-road-trip.git
git remote -v
echo 'push start 🚀'
echo '🚀'
echo '🚀🚀'
echo '🚀🚀🚀'
echo '🚀🚀🚀🚀'
echo '🚀🚀🚀🚀🚀'
echo '🚀🚀🚀🚀🚀🚀'
echo '🚀🚀🚀🚀🚀🚀🚀'
git push all main
echo 'push end 🥘'
