#!/bin/bash

# Script to setup the second git repository for the project
# The second git repository is used for the github action

git remote remove origin
git remote add origin git@github.com:EpitechMscProPromo2024/T-WEB-800-PAR_9.git
git remote add upstream git@github.com:filoupegase/epic-road-trip.git
git remote -v
