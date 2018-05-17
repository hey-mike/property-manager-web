# docker run --rm -it --name certbot \
# -v ./certbot/certs/etc/letsencrypt:/etc/letsencrypt \
# -v ./certbot/certs/var/lib/letsencrypt:/var/lib/letsencrypt \
# -v /./certbot/certs/data:/data/letsencrypt \
# certbot/certbot \
# --staging \
# certificates

docker run -it --rm \
      -v certs:/etc/letsencrypt \
      -v certs-data:/data/letsencrypt \
      deliverous/certbot \
      certonly \
      --webroot --webroot-path=/data/letsencrypt \
      -d example.com -d www.example.com
