# syntax = docker/dockerfile:1.2

# Stage 1: Build frontend
FROM node:18 AS frontend-build
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build backend and combine static files
FROM python:3.11-slim AS backend
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependencies
COPY backend/requirements.txt /app/
RUN echo "Building backend..." && pip install -r requirements.txt

# Copy the backend code
COPY backend/ /app/

# Copy the frontend build from the first stage to the backend's static directory
COPY --from=frontend-build /frontend/dist /app/loa-moon/static/frontend/

# Collect static files (with access to secrets)
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat /etc/secrets/.env && python manage.py collectstatic --noinput

# Expose the port the app runs on
EXPOSE 8000

# Command to run the Django app with Gunicorn
CMD ["uvicorn", "loa-moon.asgi:app", "--host", "0.0.0.0", "--port", "8000"]
