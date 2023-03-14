#!/bin/bash

# Script to setup the second git repository for the project
# The second git repository is used for the github action

git remote remove origin
git remote remove all
# Create a new remote called "all" with the URL of the primary repo.
git remote add all git@github.com:EpitechMscProPromo2024/T-WEB-800-PAR_9.git
# Re-register the remote as a push URL.
git remote set-url --add --push all git@github.com:EpitechMscProPromo2024/T-WEB-800-PAR_9.git
# Add a push URL to a remote. This means that "git push" will also push to this git URL.
git remote set-url --add --push all git@github.com:filoupegase/epic-road-trip.git
git remote -v
echo 'push start 🚀'
git push all main
echo 'push end 🥘'
