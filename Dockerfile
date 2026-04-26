# ─────────────────────────────────────────────
# MediCare HMS — Fixed Dockerfile
# ─────────────────────────────────────────────

FROM node:20-alpine

# Create working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy entire project
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start app (IMPORTANT FIX)
CMD ["node", "app/App.js"]