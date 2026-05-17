# Step 1: Build stage
FROM golang:1.25-alpine AS builder

WORKDIR /app

# Copy Go module files
COPY go.mod ./
RUN go mod download

# Copy source code
COPY . .

# Build the statically linked Go binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o tvk-server main.go

# Step 2: Final lightweight runtime stage
FROM alpine:latest

WORKDIR /root/

RUN apk --no-cache add ca-certificates tzdata

COPY --from=builder /app/tvk-server .

# Expose standard port
EXPOSE 8080

ENV PORT=8080
ENV STORE_PATH=/data/data.json

# Create volume for persistent JSON storage
VOLUME ["/data"]

CMD ["./tvk-server"]
