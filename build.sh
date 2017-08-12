#!/bin/bash

keyserver=${KEYSERVER:-"hkp://sks.ustclug.org"}

if [ -d .git/ ]; then
  git cat-file commit HEAD  | sed '/^gpgsig/,/-----END PGP SIGNATURE-----$/ D' > /tmp/commit
  git cat-file commit HEAD  | sed -n '/^gpgsig/,/-----END PGP SIGNATURE-----$/ P' | sed 's/^gpgsig//; s/^ //' > /tmp/sig

  if [ -e /gpghome/trustdb.gpg ]; then
    gpg --homedir=/gpghome --keyserver="$keyserver" --refresh-keys 
    gpg_out=$(gpg --homedir=/gpghome --verify --status-fd 1 --trust-model direct /tmp/sig /tmp/commit)
    gpg_status=$?
    echo "$gpg_out" > /dev/stderr
    if [ "$gpg_status" -ne 0 ]; then 
      echo "gpg --verify exited with code $gpg_status" >/dev/stderr
      exit 1
    fi
    if echo "$gpg_out" | grep -qs "^\[GNUPG:\] VALIDSIG" &&
       echo "$gpg_out" | grep -qs "^\[GNUPG:\] TRUST_FULLY\$"; then
      echo "Sig check succeed" > /dev/stderr
    else
      echo "Sig check failed" > /dev/stderr
      exit 1
    fi 
    
  else
    echo "No trustdb found, skipping sig check" > /dev/stderr
  fi

else
  echo "No git repo found, skipping sig check" > /dev/stderr
fi

exec jekyll build --future

