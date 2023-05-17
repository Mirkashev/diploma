ARG NODE_VERSION=18
FROM node:$NODE_VERSION-alpine

#ENV NODE_CHROMIUM_REVISION=991974
#ENV CHROMIUM_REVISION=991974


#RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
#RUN dpkg -i google-chrome*
#RUN apt-get install -f

ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

RUN set -x  && \
    apk update && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk upgrade && \
    apk add --no-cache  \
      udev \
      harfbuzz \
      "freetype>2.8" \  
      ttf-freefont \
      nss\
      chromium
#      wget \
#      dpkg

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
#COPY package.json .
#COPY yarn.lock .
COPY . .
#COPY tsconfig.build.json .

#RUN npm install --force
RUN yarn install

# might be useful for special modules
#RUN (npm audit fix --force &> /dev/null; exit 0)
#RUN (npm install puppeteer@2.0.0 &> /dev/null; exit 0)

RUN yarn build

CMD yarn start:prod