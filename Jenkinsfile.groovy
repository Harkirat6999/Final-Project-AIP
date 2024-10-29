pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'Aman', 
                    url: 'https://github.com/akshay510s/Student-Voice.git', 
                    credentialsId: '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' // Replace with your actual credentials ID
            }
        }

        stage('Build') {
            steps {
                // Add your build commands here
                echo 'Building the project...'
            }
        }

        stage('Test') {
            steps {
                // Add your test commands here
                echo 'Testing the project...'
            }
        }

        stage('Deploy') {
            steps {
                // Add your deployment commands here
                echo 'Deploying the project...'
            }
        }
    }
}
