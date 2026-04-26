pipeline {
    agent any

    environment {
        IMAGE_NAME = "healthcare-app"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t healthcare-app .'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl apply -f deployment.yaml'
                bat 'kubectl apply -f service.yaml'
            }
        }

    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}