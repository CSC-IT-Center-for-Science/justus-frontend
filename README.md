# JUSTUS frontend

## Requirements

First install npm (for ex. `yum install npm`)

Tested with npm version 4.0.3 (and on CentOS 7 with straight yum npm version 1.3.6).

Run:
```
npm install

# Available build environments: production, qa, dev
# E.g. build for production:
npm run build -- --production 
```

The finished build will be in `/dist`

## Development

To build and keep listening for changes in dev run:
```
npm run dev
```

The app will be built into ./build and dev-http-server listening at http://localhost:3000

See FILES.md for some more specifics.
