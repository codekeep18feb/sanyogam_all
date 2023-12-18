# Build the backend image
cd sanygam_be_v1
docker build -t sanygam-be .

# Build the frontend image
cd ../fe
docker build -t sanygam-fe .
<!-- docker run -p 8000:8000 sanygam-be -->
<!-- docker run -p 3000:3000 sanygam-fe -->
docker-compose up

