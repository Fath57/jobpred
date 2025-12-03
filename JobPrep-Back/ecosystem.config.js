module.exports = {
    apps: [
        {
            name: "jobprep-api",
            script: "yarn start:dev",
            watch: true,
            autorestart: false,
            args: "yarn start:dev",
        },
    ],

    deploy: {
        production: {
            user: "ubuntu",
            host: ["localhost"],
            ref: "origin/production",
            repo: "file:///var/jenkins_home/workspace/DreamJobPrep",
            path: "/var/www/jobprep/production",
            "pre-deploy": "echo '🚀 Starting production deployment...'",
            "post-deploy":
                "NODE_ENV=production && " +
                "cd /var/www/jobprep/production/current && " +
                "docker-compose -f docker-compose.yml -f docker-compose.production.yml --env-file .env.production down && " +
                "docker-compose -f docker-compose.yml -f docker-compose.production.yml --env-file .env.production up -d --build && " +
                "echo '✅ Production deployment completed'",
            "post-setup":
                "cd /var/www/jobprep/production/current && " +
                "echo '📦 Production setup completed. Please add .env.production file manually.' && " +
                "echo '⚠️  Required: Copy your .env.production file to this directory before running deployment'",
        },
        development: {
            user: "ubuntu",
            host: ["localhost"],
            ref: "origin/develop",
            repo: "file:///var/jenkins_home/workspace/DreamJobPrep",
            path: "/var/www/jobprep/development",
            "pre-deploy": "echo '🧪 Starting development deployment...'",
            "post-deploy":
                "NODE_ENV=development && " +
                "cd /var/www/jobprep/development/current && " +
                "docker-compose -f docker-compose.yml -f docker-compose.development.yml --env-file .env.development down && " +
                "docker-compose -f docker-compose.yml -f docker-compose.development.yml --env-file .env.development up -d --build && " +
                "echo '✅ Development deployment completed'",
            "post-setup":
                "cd /var/www/jobprep/development/current && " +
                "echo '📦 Development setup completed. Please add .env.development file manually.' && " +
                "echo '⚠️  Required: Copy your .env.development file to this directory before running deployment'",
        },
    },
};
