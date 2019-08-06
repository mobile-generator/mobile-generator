#!/bin/sh
if [ "${TRAVIS_BRANCH}" = "feature/CI" ]; then
    cd my-app/ios
    fastlane ios report_test_coverage
fi