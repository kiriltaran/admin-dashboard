#!/bin/sh

VERSION="$CI_COMMIT_SHA"
sentry-cli releases new "$VERSION"
sentry-cli releases -o "$SENTRY_ORG" -p "$SENTRY_PROJECT" files "$VERSION" upload-sourcemaps \
  ./dist/js --url-prefix "~/js"
sentry-cli releases finalize "$VERSION"
