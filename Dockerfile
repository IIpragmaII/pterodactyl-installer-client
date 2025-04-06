FROM nginxinc/nginx-unprivileged:1.27-bookworm
COPY dist /usr/share/nginx/html
