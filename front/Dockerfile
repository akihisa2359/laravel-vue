FROM node:16.14-buster

# Fix vulnerabilities
RUN apt-get update -y \
    && apt-get install -y unattended-upgrades\
    && unattended-upgrade -d \
    # && npm install -g @vue/cli \
    ;

# Set working directory
WORKDIR /app

# Move source to app
# COPY dist/ /app/dist

# Start app
# CMD [ "node", "/app/dist/server" ]
