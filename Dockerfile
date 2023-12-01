# pull official base image
FROM node:latest AS ReactImage 
# set working directory
WORKDIR /app/frontend
# add `/app/node_modules/.bin` to $PATH
ENV PATH /aicrxn/node_modules/.bin:$PATH
# install app dependencies
COPY ./aicrxn/package.json ./
COPY ./aicrxn/package-lock.json ./
# add app
COPY ./aicrxn ./
# Silent clean install of npm
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent


# Build production
RUN npm run build
RUN npm install -g serve

FROM python:3.10
WORKDIR /code
COPY ./backend/requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./backend /code/backend/

COPY --from=ReactImage ./app/frontend/build/. ./aicrxn/build/.
#WORKDIR /code/backend
CMD ["uvicorn", "backend.test:app", "--host", "0.0.0.0", "--port", "8000"]