pipeline {
    agent any

    environment {
        EC2_IP = "100.52.3.170"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    credentialsId: 'stack-backend',
                    url: 'https://github.com/kaviyarashugayu1997-maker/Backend-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('Backend-app') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                dir('Backend-app') {
                    sh 'npm test'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['sshagent']) {
                    sh """
                    ssh -q -o StrictHostKeyChecking=no ubuntu@${EC2_IP} << 'EOF'
                    set -e

                    mkdir -p /home/ubuntu/apps
                    cd /home/ubuntu/apps

                    if [ ! -d "Backend-app" ]; then
                        git clone https://github.com/kaviyarashugayu1997-maker/Backend-app.git Backend-app
                    fi

                    cd Backend-app
                    git pull origin main

                    docker stop my-backend-container || true
                    docker rm my-backend-container || true

                    docker build -t my-backend-app:latest .
                    docker run -d --name my-backend-container -p 3000:3000 --restart unless-stopped my-backend-app:latest

                    echo "✅ Deployment completed"
EOF
                    """
                }
            }
        }
    }

    post {
        success {
            echo " DEPLOYMENT SUCCESSFUL → http://${EC2_IP}:3000"
        }
        failure 
            echo " DEPLOYMENT FAILED — Check Jenkins logs"
        }
    }
}
