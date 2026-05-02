// Jenkinsfile for QRCS Frontend (Angular 18)

// Define parameters for user input when the pipeline is triggered
properties([
    parameters([
        gitParameter(name: 'Select Branch', 
                    type: 'PT_BRANCH',
                    branchFilter: 'origin/(.*)',
                    sortMode: 'ASCENDING_SMART',
                    selectedValue: 'DEFAULT',
                    defaultValue: 'origin/dev',
                    quickFilterEnabled: false,
                    listSize: '5',
                    description: 'Select the branch to deploy'),
        booleanParam(name: 'Deploy to Dev', defaultValue: false, description: 'Deploy to Dev environment'),
        booleanParam(name: 'Deploy to Qa', defaultValue: false, description: 'Deploy to QA environment'),
    ]),
    buildDiscarder(logRotator(numToKeepStr: '10'))
])

pipeline {
    // Jenkins will use any available agent on this server
    agent any

    // Environment variables that will be used across stages
    environment {
        // Application specific details
        APP_NAME = "qrcs-client"
        APP_VERSION = "1.0"
        
        // GitHub details for SCM
        GITHUB_CREDENTIAL_ID = 'github-credentials'
        GITHUB_REPO_NAME = 'mottosysqrcsclient'
        GITHUB_ORG_OR_USER = 'Motto-Systems'
        GITHUB_REPO_URL = "https://github.com/${GITHUB_ORG_OR_USER}/${GITHUB_REPO_NAME}.git"

        // Docker and nginx configuration  
        DOCKERFILE_PATH = '.'  // Root of mottosysqrcsclient repository
        
        // Azure Container Registry (ACR) details
        ACR_REGISTRY = "mottocontainerregistry-bqfdcra8fkctbse3.azurecr.io"
        ACR_CREDENTIAL_ID = "azure-acr-credentials"
        
        // Nginx configuration paths for different environments
        NGINX_DEV_PATH = "/var/www/html/mspl20qrcsdev"
        NGINX_QA_PATH = "/var/www/html/mspl20qrcsqa"
        NGINX_SERVER_USER = "linuxadmin"
        NGINX_SERVER_HOST = "192.168.1.2"  // Nginx server for frontend apps (not Kong proxy)
    }

    stages {
        stage('Validate Environment Selection') {
            steps {
                script {
                    echo "Checking environment selection for QRCS Frontend..."

                    // Auto-deploy to DEV if triggered by development branch webhook
                    if (env.BRANCH_NAME == 'development') {
                        env.AUTO_DEPLOY_DEV = 'true'
                        echo "✓ Auto-deployment triggered for develop branch - deploying to DEV"
                    } else {
                        // Manual deployment for other branches
                        if (!params.'Deploy to Dev' && !params.'Deploy to Qa') {
                            error("At least one environment must be selected for deployment. Please select one or more environments.")
                        }
                    }
                    
                    if (params.'Deploy to Dev' || env.AUTO_DEPLOY_DEV == 'true') {
                        echo "✓ DEV environment selected for deployment"
                    }
                    if (params.'Deploy to Qa') {
                        echo "✓ QA environment selected for deployment"
                    }
                }
            }
        }

        stage('Checkout Source Code') {
            steps {
                script {
                    echo "Cloning repository: ${env.GITHUB_REPO_URL} from branch: ${params.'Select Branch'}"
                    git branch: params.'Select Branch',
                        credentialsId: env.GITHUB_CREDENTIAL_ID,
                        url: env.GITHUB_REPO_URL
                    echo "Source code checked out."
                }
            }
        }

        stage('Node.js Setup') {
            steps {
                script {
                    echo "Setting up Node.js environment for QRCS Frontend..."
                    
                    // Debug: Show current directory and structure
                    echo "=== DEBUG: Current workspace structure ==="
                    sh 'pwd'
                    sh 'ls -la'
                    sh 'find . -name "package.json" -type f'
                    sh 'find . -name "Jenkinsfile" -type f'
                    
                    dir(env.DOCKERFILE_PATH) {
                        echo "=== DEBUG: After changing to DOCKERFILE_PATH ==="
                        sh 'pwd'
                        sh 'ls -la'
                        
                        sh '''
                            echo "=== Node.js Environment Check ==="
                            node --version
                            npm --version
                            
                            echo "=== Checking package.json ==="
                            cat package.json | grep -E "(name|version)"
                            
                            echo "=== Installing Node.js dependencies with fallback ==="
                            # Try npm ci first (requires exact package-lock.json match)
                            if ! npm ci --legacy-peer-deps; then
                                echo "WARNING: npm ci failed, likely due to package-lock.json sync issues"
                                echo "Falling back to npm install to regenerate package-lock.json..."
                                
                                # Remove node_modules and package-lock.json if they exist
                                rm -rf node_modules package-lock.json
                                
                                # Install dependencies and generate new package-lock.json
                                npm install --legacy-peer-deps
                                
                                echo "Dependencies installed successfully with npm install fallback"
                            else
                                echo "Dependencies installed successfully with npm ci"
                            fi
                            
                            echo "=== Verifying Angular CLI ==="
                            npx ng version
                        '''
                    }
                    echo "Node.js setup completed."
                }
            }
        }

        stage('Build and Push Docker Images') {
            parallel {
                stage('DEV - Build and Push') {
                    when {
                        anyOf {
                            expression { params.'Deploy to Dev' }
                            expression { env.AUTO_DEPLOY_DEV == 'true' }
                        }
                    }
                    steps {
                        script {
                            def devImageName = "${env.ACR_REGISTRY}/dev/${env.APP_NAME}:${env.APP_VERSION}"
                            
                            echo "Building Docker image for DEV: ${devImageName}"
                            dir(env.DOCKERFILE_PATH) {
                                sh """
                                    docker build -t ${devImageName} \\
                                        --build-arg BUILD_ENV=dev \\
                                        --build-arg BASE_HREF=/mspl20qrcsdev/ \\
                                        --build-arg NG_BUILD_COMMAND="build:dev" \\
                                        .
                                """
                            }
                            
                            echo "Logging into ACR: ${env.ACR_REGISTRY}..."
                            withCredentials([usernamePassword(credentialsId: env.ACR_CREDENTIAL_ID, passwordVariable: 'ACR_PASSWORD', usernameVariable: 'ACR_USERNAME')]) {
                                sh "echo \${ACR_PASSWORD} | docker login ${env.ACR_REGISTRY} -u \${ACR_USERNAME} --password-stdin"
                            }
                            
                            echo "Pushing Docker image for DEV: ${devImageName}"
                            sh "docker push ${devImageName}"
                            echo "DEV Docker image pushed successfully."
                            
                            // Store the image name for deployment stage
                            env.DEV_IMAGE_NAME = devImageName
                        }
                    }
                }
                
                stage('QA - Build and Push') {
                    when {
                        expression { params.'Deploy to Qa' }
                    }
                    steps {
                        script {
                            def qaImageName = "${env.ACR_REGISTRY}/qa/${env.APP_NAME}:${env.APP_VERSION}"
                            
                            echo "Building Docker image for QA: ${qaImageName}"
                            dir(env.DOCKERFILE_PATH) {
                                sh """
                                    docker build -t ${qaImageName} \\
                                        --build-arg BUILD_ENV=qa \\
                                        --build-arg BASE_HREF=/mspl20qrcsqa/ \\
                                        --build-arg NG_BUILD_COMMAND="build:qa" \\
                                        .
                                """
                            }
                            
                            echo "Logging into ACR: ${env.ACR_REGISTRY}..."
                            withCredentials([usernamePassword(credentialsId: env.ACR_CREDENTIAL_ID, passwordVariable: 'ACR_PASSWORD', usernameVariable: 'ACR_USERNAME')]) {
                                sh "echo \${ACR_PASSWORD} | docker login ${env.ACR_REGISTRY} -u \${ACR_USERNAME} --password-stdin"
                            }
                            
                            echo "Pushing Docker image for QA: ${qaImageName}"
                            sh "docker push ${qaImageName}"
                            echo "QA Docker image pushed successfully."
                            
                            // Store the image name for deployment stage
                            env.QA_IMAGE_NAME = qaImageName
                        }
                    }
                }
                 
            }
        }

        stage('Deploy to Nginx') {
            parallel {
                stage('Deploy to DEV') {
                    when {
                        anyOf {
                            expression { params.'Deploy to Dev' }
                            expression { env.AUTO_DEPLOY_DEV == 'true' }
                        }
                    }
                    steps {
                        script {
                            echo "Deploying QRCS Frontend to DEV environment..."
                            
                            // Extract files from Docker image and deploy to nginx
                            sh """
                                echo "Extracting files from Docker image..."
                                docker create --name temp-dev-container ${env.DEV_IMAGE_NAME}
                                docker cp temp-dev-container:/usr/share/nginx/html ./dev-build
                                docker rm temp-dev-container
                                
                                echo "Deploying to nginx server..."
                                ssh -o StrictHostKeyChecking=no ${env.NGINX_SERVER_USER}@${env.NGINX_SERVER_HOST} "sudo mkdir -p ${env.NGINX_DEV_PATH}"
                                scp -o StrictHostKeyChecking=no -r ./dev-build/* ${env.NGINX_SERVER_USER}@${env.NGINX_SERVER_HOST}:~/temp-dev/
                                ssh -o StrictHostKeyChecking=no ${env.NGINX_SERVER_USER}@${env.NGINX_SERVER_HOST} "sudo cp -r ~/temp-dev/* ${env.NGINX_DEV_PATH}/ && sudo rm -rf ~/temp-dev"
                                
                                echo "Setting proper permissions..."
                                ssh -o StrictHostKeyChecking=no ${env.NGINX_SERVER_USER}@${env.NGINX_SERVER_HOST} "sudo chown -R www-data:www-data ${env.NGINX_DEV_PATH} && sudo chmod -R 755 ${env.NGINX_DEV_PATH}"
                                
                                echo "Reloading nginx..."
                                ssh -o StrictHostKeyChecking=no ${env.NGINX_SERVER_USER}@${env.NGINX_SERVER_HOST} "sudo nginx -t && sudo systemctl reload nginx"
                                
                                rm -rf ./dev-build
                            """
                            
                            echo "DEV deployment completed successfully."
                            echo "🌐 DEV QRCS Frontend available at: http://${env.NGINX_SERVER_HOST}:8080/mspl20qrcsdev/"
                            echo "Note: Frontend served directly from nginx server, not through Kong proxy"
                        }
                    }
                }
                
                stage('Deploy to QA') {
                    when {
                        expression { params.'Deploy to Qa' }
                    }
                    steps {
                        script {
                            echo "Deploying QRCS Frontend to QA environment..."
                            
                            // Extract files from Docker image and deploy to nginx
                            sh """
                                echo "Extracting files from Docker image..."
                                docker create --name temp-qa-container ${env.QA_IMAGE_NAME}
                                docker cp temp-qa-container:/usr/share/nginx/html ./qa-build
                                docker rm temp-qa-container
                                
                                echo "Deploying to nginx server..."
                                ssh -o StrictHostKeyChecking=no ${env.NGINX_SERVER_USER}@${env.NGINX_SERVER_HOST} "sudo mkdir -p ${env.NGINX_QA_PATH}"
                                scp -o StrictHostKeyChecking=no -r ./qa-build/* ${env.NGINX_SERVER_USER}@${env.NGINX_SERVER_HOST}:~/temp-qa/
                                ssh -o StrictHostKeyChecking=no ${env.NGINX_SERVER_USER}@${env.NGINX_SERVER_HOST} "sudo cp -r ~/temp-qa/* ${env.NGINX_QA_PATH}/ && sudo rm -rf ~/temp-qa"
                                
                                echo "Setting proper permissions..."
                                ssh -o StrictHostKeyChecking=no ${env.NGINX_SERVER_USER}@${env.NGINX_SERVER_HOST} "sudo chown -R www-data:www-data ${env.NGINX_QA_PATH} && sudo chmod -R 755 ${env.NGINX_QA_PATH}"
                                
                                echo "Reloading nginx..."
                                ssh -o StrictHostKeyChecking=no ${env.NGINX_SERVER_USER}@${env.NGINX_SERVER_HOST} "sudo nginx -t && sudo systemctl reload nginx"
                                
                                rm -rf ./qa-build
                            """
                            
                            echo "QA deployment completed successfully."
                            echo "🌐 QA QRCS Frontend available at: http://${env.NGINX_SERVER_HOST}:8080/mspl20qrcsqa/"
                            echo "Note: Frontend served directly from nginx server, not through Kong proxy"
                        }
                    }
                }
            }
        }

        stage('Post-Deployment Verification') {
            parallel {
                stage('Verify DEV Deployment') {
                    when {
                        expression { params.'Deploy to Dev' }
                    }
                    steps {
                        script {
                            echo "Verifying DEV deployment..."
                            sh """
                                echo "Testing DEV endpoint..."
                                curl -f -s -o /dev/null http://${env.NGINX_SERVER_HOST}:8080/mspl20qrcsdev/ || echo "Warning: DEV endpoint check failed"
                                
                                echo "Checking nginx status..."
                                ssh -o StrictHostKeyChecking=no ${env.NGINX_SERVER_USER}@${env.NGINX_SERVER_HOST} "sudo systemctl status nginx --no-pager"
                            """
                            echo "DEV verification completed."
                        }
                    }
                }
                
                stage('Verify QA Deployment') {
                    when {
                        expression { params.'Deploy to Qa' }
                    }
                    steps {
                        script {
                            echo "Verifying QA deployment..."
                            sh """
                                echo "Testing QA endpoint..."
                                curl -f -s -o /dev/null http://${env.NGINX_SERVER_HOST}:8080/mspl20qrcsqa/ || echo "Warning: QA endpoint check failed"
                                
                                echo "Checking nginx status..."
                                ssh -o StrictHostKeyChecking=no ${env.NGINX_SERVER_USER}@${env.NGINX_SERVER_HOST} "sudo systemctl status nginx --no-pager"
                            """
                            echo "QA verification completed."
                        }
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    echo "Cleaning up temporary files..."
                    
                    // Clean up Docker images to save space
                    if (params.'Deploy to Dev') {
                        sh "docker rmi ${env.DEV_IMAGE_NAME} || echo 'Failed to remove DEV image'"
                    }
                    if (params.'Deploy to Qa') {
                        sh "docker rmi ${env.QA_IMAGE_NAME} || echo 'Failed to remove QA image'"
                    }
                    echo "Cleanup completed."
                }
            }
        }
    }

    post {
        success {
            echo "🎉 QRCS Frontend deployment pipeline completed successfully!"
            script {
                if (params.'Deploy to Dev') {
                    echo "✅ DEV QRCS Frontend deployed: http://${env.NGINX_SERVER_HOST}:8080/mspl20qrcsdev/"
                }
                if (params.'Deploy to Qa') {
                    echo "✅ QA QRCS Frontend deployed: http://${env.NGINX_SERVER_HOST}:8080/mspl20qrcsqa/"
                }
                echo "Note: Frontend apps are served directly from nginx server, backend APIs use Kong proxy"
            }
        }
        failure {
            echo "❌ QRCS Frontend deployment pipeline failed. Please check the logs."
        }
        always {
            echo "QRCS Frontend deployment pipeline execution completed."
        }
    }
}
