pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                // Clone the repository
                git url: 'https://github.com/akshay510s/Student-Voice.git', branch: 'Aman'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install necessary Python packages
                sh 'pip install -r requirements.txt' // Make sure you have a requirements.txt file
            }
        }

        stage('Run Tests') {
            steps {
                // Run your test suite
                sh 'pytest' // Replace with your test command if different
            }
        }

        stage('Build') {
            steps {
                // Add your build steps here
                echo 'Building the application...'
            }
        }

        stage('Deploy') {
            steps {
                // Add your deployment steps here
                echo 'Deploying the application...'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
