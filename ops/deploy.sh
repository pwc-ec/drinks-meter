#!/usr/bin/env bash

K8S_DIR=./manifests
TARGET_DIR=${K8S_DIR}/.generated
mkdir -p ${TARGET_DIR}
for f in ${K8S_DIR}/*.yaml
do
  jinja2 $f ./variables/${CI_ENVIRONMENT_SLUG}.yaml --format=yaml --strict -D REPLICAS=${REPLICAS} -D DOCKER_IMAGE_TAG=${CI_BUILD_REF} -D CI_ENVIRONMENT_SLUG=${CI_ENVIRONMENT_SLUG} -D TRACK=${TRACK} > "${TARGET_DIR}/$(basename ${f})"
done

# generate nginx config
jinja2 ./conf/nginx.conf.tmpl ./variables/${CI_ENVIRONMENT_SLUG}.yaml --format=yaml --strict > ./conf/nginx.conf

kubectl --namespace=${CI_PROJECT_NAME} apply -f ${TARGET_DIR}/10-ns.yaml
kubectl --namespace=${CI_PROJECT_NAME} delete configmap nginx-conf || true
kubectl --namespace=${CI_PROJECT_NAME} create configmap nginx-conf --from-file=conf/nginx.conf
kubectl --namespace=${CI_PROJECT_NAME} apply -f ${TARGET_DIR}
