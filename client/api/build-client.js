import axios from "axios";

export default ({ req }) => {
  //same req as received in the route handlers
  if (typeof window === "undefined") {
    // we are on the server!
    // requests should be made to 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
    // "kubectl get namespace" to get the namespace for the ingress service
    // "kubectl get services -n ingress-nginx" to get the service in the ingress-nginx namespace
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // we are on the browser!
    // requests can be made with a base url of ''
    return axios.create({ baseUrl: "/" });
  }
};
