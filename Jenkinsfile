String sectionHeaderStyle = '''
    color: white;
    background: gray;
    font-family: Roboto, sans-serif !important;
    padding: 3px;
    text-align: center;
'''

String separatorStyle = '''
    border: 0;
    border-bottom: 1px #ccc;
    background: #999;
'''

properties([
    disableConcurrentBuilds(),
    [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '5', numToKeepStr: '10']],
    parameters([
        [
            $class: 'ParameterSeparatorDefinition',
            name: 'BUILDER_HEADER',
            sectionHeader: 'Docker Builder Parameters',
            separatorStyle: separatorStyle,
            sectionHeaderStyle: sectionHeaderStyle
        ],
        booleanParam(defaultValue: false, description: 'Update builder', name: 'makeBuilder'),
        string(
            name: 'builderVersion',
            defaultValue: 'x.x.x',
            description: 'Type the version of the docker container to be created.'
        ),
        [
            $class: 'ParameterSeparatorDefinition',
            name: 'BUILD_HEADER',
            sectionHeader: 'Build Parameters',
            separatorStyle: separatorStyle,
            sectionHeaderStyle: sectionHeaderStyle
        ],
        booleanParam(defaultValue: true, description: 'Build', name: 'build'),
        string(
            name: 'selectedBuilderVersion',
            defaultValue: '1.0.0',
            description: 'Type the version of the docker container to be used in the build stage.'
        ),
        [
            $class: 'ParameterSeparatorDefinition',
            name: 'DEPLOY_HEADER',
            sectionHeader: 'Deploy Parameters',
            separatorStyle: separatorStyle,
            sectionHeaderStyle: sectionHeaderStyle
        ],
        booleanParam(defaultValue: false, description: 'Deploy', name: 'deploy'),
        choice(choices: 'prd\nhml', description: 'Select the deploy environment', name: 'ambiente')
    ])
])

@Library("prodaub") _
node{
    def pipeline    = new com.prodaub.Default()

    def projectName = "itbi"
    def buildername = "itbi-web-builder"
    def dockerService = "itbi-web"
    def dockerRegistryCredentials = "dockerRegistryCredentials"
    def bitbucketCredentials = "jenkins"
    def builderImageVersion  = "${params.selectedBuilderVersion}"
    def emails = "seu-email@empresa.com.br"

    try{
        pipeline.emailNotifcation(emails,"Pipeline iniciado.")
        pipeline.cleanDir()
        pipeline.cloneRepository()
        pipeline.updateBuilderImage(buildername,
                                    dockerRegistryCredentials
                                    )

        pipeline.pullBuilder(buildername,
                                builderImageVersion,
                                dockerRegistryCredentials
                                )

        def shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()

        pipeline.buildAngular(
            buildername,
            builderImageVersion,
            "sh -c 'npm install && npm run build'",
            "sh -c 'echo test'",
            dockerService,
            emails,
        )
        pipeline.deploy(projectName,dockerService,emails)
        pipeline.emailNotifcation(emails,"Pipeline finalizado")
    }catch(e){
        pipeline.emailNotifcation(emails,"Erro no pipeline: ${e}")
    }
}
