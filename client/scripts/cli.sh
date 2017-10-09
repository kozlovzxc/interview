#!/usr/bin/bash

if [[ $1 == "help" ]] ||
  [[ $1 == "-h" ]] ||
  [[ -z $1 ]] ||
  [[ -z $2 ]]; then
  echo './cli.sh type args
  - type:
    - components
      - args
        - name'
fi

# set path
BASEDIR=$(pwd);
case "$BASEDIR" in
  *scripts)
    BASEDIR="$(dirname "$(pwd)")";
  ;;
  *client)
  ;;
  *)
    echo "run script from client or scripts folder";
  ;;
esac


# preform actions
case "$1" in
  component)

    COMPONENTDIR="$BASEDIR/src/components/$2"
    COMPONENTNAME="${2##*\/}"
    mkdir -p "$COMPONENTDIR"

    CLASS_NAME="${COMPONENTNAME^}"
    OLDFILEPATH="$BASEDIR/scripts/templates/component/Template.component"
    NEWFILEPATH="$COMPONENTDIR/$COMPONENTNAME.component"
    cp "$OLDFILEPATH.scss" "$NEWFILEPATH.scss"
    cp "$OLDFILEPATH.ts" "$NEWFILEPATH.ts"
    cp "$OLDFILEPATH.vue" "$NEWFILEPATH.vue"
    # TODO: add any template engine
    sed -i "s/{{name}}/$CLASS_NAME/g" "$NEWFILEPATH.vue" "$NEWFILEPATH.ts"
  ;;
  *)
    echo "Not implemented";
  ;;
esac