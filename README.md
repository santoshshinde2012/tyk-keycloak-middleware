# tyk-keycloak-middleware

This is the starter for keycloak and tyk middleware using Javascript

## Flow

```
 Client 
    -> TYK 
        -> TYK Middleware(Request for ODC Token) 
            -> Keycloak(OIDC) 
                -> TYK Middleware(Attach Headers) 
                    -> Our Micro Service (REST API)
```                    