# Simple Monitoring Setup

## Overview
This library management system includes basic monitoring using Prometheus.

## Components

### Prometheus
- **Port**: 9090
- **Purpose**: Basic metrics collection
- **Configuration**: `prometheus.yml`
- **Target**: Library application (port 8080)

### Grafana (Optional)
- **Port**: 3000
- **Default credentials**: admin/admin
- **Purpose**: Optional metrics visualization

## Available Metrics

### Basic Application Metrics
- `http_requests_total` - Total HTTP requests by method and status code

## Accessing the Monitoring

1. **Prometheus UI**: http://localhost:9090
   - View basic metrics and queries
   - Check application target health

2. **Grafana Dashboard**: http://localhost:3000 (optional)
   - Username: admin, Password: admin
   - Create simple dashboards as needed

3. **Application Metrics**: http://localhost:8080/metrics
   - Raw metrics from the application

4. **Health Check**: http://localhost:8080/health
   - Basic application health status

## Starting the Monitoring

```bash
# Start all services
docker-compose up -d

# Check if everything is running
docker-compose ps
```

## Simple Usage

- Check request counts in Prometheus: `http_requests_total`
- Monitor application health: http://localhost:8080/health
- View all metrics: http://localhost:8080/metrics
